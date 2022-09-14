import { FlowTypes } from "data-models";
type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};
export const SHEETS_CONTENT_LIST: ISheetContents = {
  data_list: {},
  global: {},
  template: {
    home_screen: {
      flow_type: "template",
      flow_name: "home_screen",
      _xlsxPath: "core_templates_navigation.xlsx",
    },
  },
  tour: {},
  data_pipe: {},
};
