import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
import { Stopwatch } from "ts-stopwatch";
import { LoginPage } from "../../pages/loginPage";
import { LogoffPage } from "../../pages/log_offPage";
import { WelcomePage } from "../../pages/welcomePage";
import { config, username, password, dmsUrl } from "../../config/constants";

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
    await vrt.stop();
    const log_offPage = new LogoffPage(page);
    await log_offPage.logoff();
    await page.close();
});

test.beforeEach(async ({ page, vrt }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    stopwatch.start();
    await loginPage.login(username, password, dmsUrl)
    //await welcomePage.closeTabs();
});

test.afterEach(async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    //await welcomePage.closeTabs();
});


test("The last session", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    //expect(welcomePage.checkArrow()).toBeTruthy(); 
    //await page.pause();  
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "The last session");
    console.log("Time: " + stopwatch.getTime()/1000 + " seconds");
});




