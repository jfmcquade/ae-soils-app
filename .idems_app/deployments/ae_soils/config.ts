import { IDeploymentConfig } from "data-models";
import { getDefaultAppConstants } from "data-models/constants";

const app_constants = getDefaultAppConstants();

const config: IDeploymentConfig = {
  name: "ae_soils",
  app_constants,
  google_drive: {
    sheets_folder_id: "1L-9KCMDB-ndNcj8Jp10mBX6ENkC9EcY6",
    assets_folder_id: "1JrorEwpf4ItFvkVF5KqWhlBnN_5I4LVl",
  },
};

config.app_constants.APP_SIDEMENU_DEFAULTS.title = "AE/Soils App";
config.app_constants.APP_HEADER_DEFAULTS.title = "AE/Soils App";
config.app_constants.NOTIFICATION_DEFAULTS.title = "New message from AE/Soils App";
config.app_constants.NOTIFICATION_DEFAULTS.text = "You have a new message from AE/Soils App";

export default config;
