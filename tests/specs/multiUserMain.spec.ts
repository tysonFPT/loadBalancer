import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
import { LoginPage } from "../pages/loginPage";
import { LogoffPage } from "../pages/log_offPage";
import { WelcomePage } from "../pages/welcomePage";
import { config, dmsUrl } from "../config/constants";

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const csvFilePath = path.resolve(__dirname, '../config/users.csv');
const records = parse(fs.readFileSync(csvFilePath), {
    columns: true,
    skip_empty_lines: true
  });

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

test.afterEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    const logoffPage = new LogoffPage(page);
    await welcomePage.closeTabs();
    await logoffPage.logoff();
});

for (const record of records) {
    test(`fooo: ${record.test_case}`, async ({ page, vrt }) => {
      console.log(record.test_case, record.username, record.password);
      const loginPage = new LoginPage(page);
      const welcomePage = new WelcomePage(page);
      await loginPage.login(record.username, record.password, dmsUrl);
      expect(welcomePage.checkArrow()).toBeTruthy();
      await expect(page.getByRole('button', { name: 'Fold in the side menu' })).toBeVisible();
      //await page.pause();
      await vrt.trackPage(page, `${ record.test_case }`);
    });
  }



/* test("Welcome page", async ({ page, vrt }) => {
   //const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);    
    expect(welcomePage.checkArrow()).toBeTruthy();
    await expect(page.getByRole('button', { name: 'Fold in the side menu' })).toBeVisible();
    await vrt.trackPage(page, "Welcome Main Page");
}); */