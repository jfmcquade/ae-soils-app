import { FlowTypes } from "data-models";

/**
 * If we decide to apply any generic conversions system-wide we can do them
 * here. For now it simply acts as a typing placeholder
 */
export abstract class AbstractParser {
  public run(flow: FlowTypes.FlowTypeWithData): any {
    return flow;
  }
  public postProcessFlows(flows: FlowTypes.FlowTypeWithData[]) {
    return flows;
  }
}