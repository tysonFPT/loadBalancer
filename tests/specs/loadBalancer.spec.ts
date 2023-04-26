import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
import { LoginPage } from "../pages/loginPage";
import { LogoffPage } from "../pages/log_offPage";
import { WelcomePage } from "../pages/welcomePage";
import { config, usernameLB1, usernameLB2, usernameLB3, password } from "../config/constants";
import { hostnameGrid, ipAdressWeb1, ipAdressWeb2 } from "../config/constants";

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const csvFilePath = path.resolve(__dirname, '../config/paths.csv');
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

test("LoadBalancer -dms-grid-qa.intranet", async ({ page, vrt }) => {
    console.log("dms-grid-qa.intranet");
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    await loginPage.login(usernameLB1, password, hostnameGrid);
    expect(welcomePage.checkArrow()).toBeTruthy();
    await expect(page.getByRole('button', { name: 'Fold in the side menu' })).toBeVisible();
    //await page.pause();
    await vrt.trackPage(page, "LoadBalancer -dms-grid-qa.intranet", { diffTollerancePercent: 0.9999 });
    //await vrt.trackPage(page, "LoadBalancer test", {diffTollerancePercent:0.9999});
});

test("LoadBalancer -ipAdressWeb1", async ({ page, vrt }) => {
    console.log("dms-grid-qa.intranet");
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    await loginPage.login(usernameLB2, password, ipAdressWeb1);
    expect(welcomePage.checkArrow()).toBeTruthy();
    await expect(page.getByRole('button', { name: 'Fold in the side menu' })).toBeVisible();
    //await page.pause();
    await vrt.trackPage(page, "LoadBalancer -ipAdressWeb1", { diffTollerancePercent: 0.9999 });
    //await vrt.trackPage(page, "LoadBalancer test", {diffTollerancePercent:0.9999});
});

test("LoadBalancer -ipAdressWeb2", async ({ page, vrt }) => {
    console.log("dms-grid-qa.intranet");
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    await loginPage.login(usernameLB3, password, ipAdressWeb2);
    expect(welcomePage.checkArrow()).toBeTruthy();
    await expect(page.getByRole('button', { name: 'Fold in the side menu' })).toBeVisible();
    //await page.pause();
    await vrt.trackPage(page, "LoadBalancer -ipAdressWeb2", { diffTollerancePercent: 0.9999 });
    //await vrt.trackPage(page, "LoadBalancer test", {diffTollerancePercent:0.9999});
});

/* for (const record of records) {
    test(`Test: ${record.test_case}`, async ({ page, vrt }) => {
      console.log(record.test_case, record.url);
      const loginPage = new LoginPage(page);
      const welcomePage = new WelcomePage(page);
      await loginPage.login(username, password, record.url);
      expect(welcomePage.checkArrow()).toBeTruthy();
      await expect(page.getByRole('button', { name: 'Fold in the side menu' })).toBeVisible();
      //await page.pause();
      await vrt.trackPage(page, `${ record.test_case }`, {diffTollerancePercent:0.9999});
      //await vrt.trackPage(page, "LoadBalancer test", {diffTollerancePercent:0.9999});
    });
  } */

