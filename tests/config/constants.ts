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
export const usernameStopWatch = "TEST_AUTOMATION_USER1@nscale";
export const usernameLB1 = "TEST_AUTOMATION_USER2@nscale";
export const usernameLB2 = "TEST_AUTOMATION_USER3@nscale";
export const usernameLB3 = "TEST_AUTOMATION_USER4@nscale";
export const password = "test";
export const contractName = "Test Regresssion";
export const contractPartner = "Test ContractPartner01";

export const hostnameSales = "https://dms-sales-qa.intranet.eon.com/nscale_web/nw/login";
export const hostnameGrid = "https://dms-grid-qa.intranet.eon.com/nscale_web/nw/login";
export const ipAdressWeb1 = "https://10.14.1.122:8453/nscale_web/nw/login";    //  url=dms-grid-qa-web-C1
export const ipAdressWeb2 = "https://10.14.1.123:8453/nscale_web/nw/login";         // url=dms-grid-qa-web-D1

export const filename = "./results/times.txt";
export const __dirname = "";
