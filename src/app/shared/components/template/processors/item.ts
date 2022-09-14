// TODO - shared package name conflicts with local shared
import { AppStringEvaluator } from "packages/shared";
import { FlowTypes } from "../models";
import { objectToArray } from "../utils";

export class ItemProcessor {
  constructor(private dataList: any, private parameterList?: any) {}

  public process(templateRows: any) {
    const data = objectToArray(this.dataList);
    const pipedData = this.pipeData(data, this.parameterList);
    const itemRows = this.generateLoopItemRows(templateRows, pipedData);
    return itemRows;
  }

  public pipeData(data: any[], parameter_list: any) {
    if (parameter_list) {
      const operations = Object.entries<any>(parameter_list).map(([name, arg]) => ({
        name,
        arg,
      }));
      return new ItemDataPipe().process(data, operations);
    }
    return data;
  }

  /**
   * Takes a row and list of items to iterate over, creating a new entry for each item with
   * the same row values but a unique evaluation context for populating dynamic variables from the item
   * @param items - list of items to iterate over
   */
  private generateLoopItemRows(templateRows: FlowTypes.TemplateRow[], items: any[]) {
    const loopItemRows: FlowTypes.TemplateRow[] = [];
    for (const [index, item] of Object.entries(items)) {
      item._index = index;
      const evalContext = { itemContext: item };
      for (const r of templateRows) {
        const itemRow = this.setRecursiveRowEvalContext(r, evalContext);
        loopItemRows.push(itemRow);
      }
    }
    return loopItemRows;
  }
  /** Update the evaluation context of a row and recursively any nested rows */
  private setRecursiveRowEvalContext(
    row: FlowTypes.TemplateRow,
    evalContext: FlowTypes.TemplateRow["_evalContext"]
  ) {
    // Workaround destructure for memory allocation issues (applying click action of last item only)
    const { rows, ...rest } = JSON.parse(JSON.stringify(row));
    const rowWithEvalContext: FlowTypes.TemplateRow = { ...rest, _evalContext: evalContext };
    // handle child rows independently to avoid accidental property leaks
    if (row.rows) {
      rowWithEvalContext.rows = [];
      for (const r of row.rows) {
        const recursivelyEvaluated = this.setRecursiveRowEvalContext(r, evalContext);
        rowWithEvalContext.rows.push(recursivelyEvaluated);
      }
    }
    return rowWithEvalContext;
  }
}

/**
 *
 */
class ItemDataPipe {
  public process(data: any[], operations: { name: string; arg?: string }[]) {
    for (const { name, arg } of operations) {
      const operator = this.operations[name];
      if (operator) {
        data = operator(data, arg);
      } else {
        console.error("No item pipeline operation found", name);
      }
    }
    return data;
  }

  private operations = {
    sort: (items: any[] = [], sortField: string) => {
      if (!sortField) return items;
      return items.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
    },
    filter: (items: any[] = [], expression: string) => {
      if (!expression) return;
      return items.filter((item) => {
        const evaluator = new AppStringEvaluator();
        evaluator.setExecutionContext({ item });
        const evaluated = evaluator.evaluate(expression);
        return evaluated;
      });
    },
    reverse: (items: any[] = []) => items.reverse(),
    limit: (items: any[] = [], value: string) => {
      if (!value) return items;
      return items.slice(0, Number(value));
    },
  };
}
