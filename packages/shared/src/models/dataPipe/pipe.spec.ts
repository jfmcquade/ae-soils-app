import { DataPipe } from "./pipe";
import type { IDataPipeOperation } from "./types";

const testData = {
  names: [
    {
      id: "id_1",
      first_name: "Ada",
      last_name: "Lovelace",
    },
    {
      id: "id_2",
      first_name: "Blaise",
      last_name: "Pascal",
    },
  ],
};

describe("Data Pipe", () => {
  it("Process multiple operations", () => {
    const operations: IDataPipeOperation[] = [
      {
        input_source: "names",
        operation: "filter",
        args_list: ["first_name.startsWith('A')"],
      },
      {
        operation: "append_columns",
        args_list: ["full_name: @row.first_name @row.last_name"],
      },
    ];
    const pipe = new DataPipe(operations, testData);
    pipe.run();
  });
  it("Store named outputs", () => {
    const operations: IDataPipeOperation[] = [
      {
        input_source: "names",
        operation: "filter",
        args_list: [],
        output_target: "output_a",
      },
      {
        input_source: "names",
        operation: "filter",
        args_list: [],
        output_target: "temp_b | local_only",
      },
      {
        input_source: "temp_b",
        operation: "filter",
        args_list: [],
        output_target: "output_b",
      },
      {
        input_source: "temp_b",
        operation: "filter",
        args_list: [],
        output_target: "output_c",
      },
    ];
    const pipe = new DataPipe(operations, testData);
    pipe.run();
    expect(Object.keys(pipe.outputTargets)).toEqual(["output_a", "output_b", "output_c"]);
  });
  // Error Handling and QC
  it("Checks if required inputs available", () => {
    const operations: IDataPipeOperation[] = [
      { input_source: "names", operation: "filter", args_list: [] },
      { input_source: "nationalities", operation: "filter", args_list: [] },
    ];
    const pipe = new DataPipe(operations, testData);
    expect(() => pipe.run()).toThrowError("Input sources missing for data pipe: nationalities");
  });
  it("Throw on invalid operation", () => {
    const invalidOp = { operation: "invalid_op" };
    expect(() => new DataPipe([invalidOp as any]).run()).toThrowError(
      `No pipeline operator exists: ${invalidOp.operation}`
    );
  });
});
