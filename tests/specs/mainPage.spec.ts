import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
import { LoginPage } from "../pages/loginPage";
import { WelcomePage } from "../pages/welcomePage";
import { config, dmsUrl, username, password } from "../config/constants";

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

test.beforeAll(async ({ vrt }) => {
    //page = await browser.newPage();    
    await vrt.start();
});

test.afterAll(async ({ page, vrt }) => {
    await page.close();
    await vrt.stop();
});

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    await loginPage.login(username, password, dmsUrl)
    await welcomePage.closeTabs();
});

test.afterEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.closeTabs();
});

test("Welcome page", async ({ page, vrt }) => {
   //const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);    
    expect(welcomePage.checkArrow()).toBeTruthy();
    await expect(page.getByRole('button', { name: 'Fold in the side menu' })).toBeVisible();
    await vrt.trackPage(page, "Welcome Main Page");
});