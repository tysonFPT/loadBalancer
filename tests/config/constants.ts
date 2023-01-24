import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";

export const config: Config = {
    apiUrl: "http://localhost:4200",
    project: "DMS EON",
    apiKey: "EMZDX0TEMHMB7GH9PPMTZBZ3M7HB",
    branchName: "master",
    projectId: "c16ee8e3-d963-4395-9245-75ebb162040c",
    enableSoftAssert: true,
};

export const dmsUrl = "https://dms-sales-qa.eon.com/nscale_web/nw/login/noImmediateLogin/";
export const username = "M86152@TDMS";
export const password = "November.2022";
