import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
import { LoginPage } from "../pages/loginPage";
import { LogoffPage } from "../pages/log_offPage";
import { WelcomePage } from "../pages/welcomePage";
import { config, username, password, dmsUrl } from "../config/constants";

type TestFixtures = {
    vrt: PlaywrightVisualRegressionTracker;
};
/* const config: Config = {
    apiUrl: "http://localhost:4200",
    project: "DMS EON",
    apiKey: "EMZDX0TEMHMB7GH9PPMTZBZ3M7HB",
    branchName: "master",
    projectId: "c16ee8e3-d963-4395-9245-75ebb162040c",
    enableSoftAssert: true,
}; */
//const dmsUrl = "https://dms-sales-qa.eon.com/nscale_web/nw/login/noImmediateLogin/";
const test = base.extend<{}, TestFixtures>({
    vrt: [
        async ({ browserName }, use) => {
            await use(new PlaywrightVisualRegressionTracker(browserName, config));
        },
        { scope: "worker" },
    ],
});
//const username = "M86152@TDMS";
//const password = "November.2022";

test.beforeAll(async ({ vrt }) => {
    //page = await browser.newPage();    
    await vrt.start();
});

test.afterAll(async ({ page, vrt }) => {
    await page.close();
    await vrt.stop();
});

test.beforeEach(async ({ page, vrt }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    await loginPage.login(username, password, dmsUrl)
    await welcomePage.closeTabs();
});

test.afterEach(async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.closeTabs();
});


test("Contract Partners", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    expect(welcomePage.checkArrow()).toBeTruthy(); 
    await page.pause();  
    await welcomePage.clickOnContractPartners();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "Contract Partners");
});

test("Search Contracts", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnContracts();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "Search Contracts");
});

test("Self Service", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnSelfService();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "Self Service");
});

test("Corporate Office", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnCorporateOffice();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "Corporate Office");
});

