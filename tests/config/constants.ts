import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";

export const config: Config = {
    apiUrl: "http://127.0.0.1:4200",
    project: "Default project",
    apiKey: "DJQJT9VNP14KNANYT234XAAQ5ECW",
    branchName: "master",
    projectId: "9a1a9dd3-312a-47da-87dd-b4f150a5a342",
    enableSoftAssert: true,
};

//export const dmsUrl = "https://dms-sales-qa.eon.com/nscale_web/nw/login/noImmediateLogin/";
export const dmsUrl = "https://dms-sales-qa.intranet.eon.com/nscale_web/nw/login/noImmediateLogin";
export const username = "TEST_AUTOMATION_USER2@nscale";
export const password = "test";
export const contractName = "Test Regresssion";
export const contractPartner = "Test ContractPartner01";

