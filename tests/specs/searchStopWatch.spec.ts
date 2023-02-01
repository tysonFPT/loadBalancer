import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
import { Stopwatch } from "ts-stopwatch";
import { LoginPage } from "../pages/loginPage";
//import { LogoffPage } from "../pages/log_offPage";
import { WelcomePage } from "../pages/welcomePage";
import { config, username, password, dmsUrl } from "../config/constants";

type TestFixtures = {
    vrt: PlaywrightVisualRegressionTracker;
};

const test = base.extend<{}, TestFixtures>({
    vrt: [
        async ({ browserName }, use) => {
            await use(new PlaywrightVisualRegressionTracker(browserName, config));
        },
        { scope: "worker" },
    ],
});
const stopwatch = new Stopwatch();

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
    stopwatch.start();
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
    console.log(stopwatch.getTime());
});

test("Search Contracts", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnContracts();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "Search Contracts");
    console.log(stopwatch.getTime());
});

test("Self Service", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnSelfService();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "Self Service");
    console.log(stopwatch.getTime());
});

test("Corporate Office", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnCorporateOffice();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "Corporate Office");
    console.log(stopwatch.getTime());
});

