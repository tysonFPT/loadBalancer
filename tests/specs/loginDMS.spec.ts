import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
import { LoginPage } from "../pages/loginPage";
import { WelcomePage } from "../pages/welcomePage";
import { config } from "../config/constants";
import { dmsUrl } from "../config/constants";
import { username } from "../config/constants";
import { password } from "../config/constants";

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

test("Login to dms", async ({ page, vrt }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    //await page.goto(dmsUrl);
    /* await loginPage.enterUserName(username);
    await loginPage.enterPassword(password);
    await loginPage.clickOK(); */
    await loginPage.login(username, password, dmsUrl)
    expect(welcomePage.checkArrow()).toBeTruthy();
    await expect(page.getByRole('button', { name: 'Fold in the side menu' })).toBeVisible();

});