import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
import { Stopwatch } from "ts-stopwatch";
import { LoginPage } from "../pages/loginPage";
import { LogoffPage } from "../pages/log_offPage";
import { WelcomePage } from "../pages/welcomePage";
import { SearchContractsPage } from "../pages/searchContractsPage";
import { SearchContractPartnersPage } from "../pages/searchContractPartnersPage";
import { NextPage } from "../pages/nextPage";
import { config, usernameStopWatch, password, hostnameGrid } from "../config/constants";
import { __dirname, filename } from "../config/constants";

import fs from 'fs';
import { readFileSync, writeFileSync, appendFile } from 'fs';
import { join } from 'path';

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
var data = "";
test.beforeAll(async ({ vrt }) => {
    await vrt.start();
});

test.afterAll(async ({ page, vrt }) => {
    await vrt.stop();
    console.log("Time: " + stopwatch.getTime() / 1000 + " seconds");
    var new_Date = new Date();
    var strDateTime = new_Date.toLocaleString();
    var data = strDateTime + " Time: " + stopwatch.getTime() / 1000 + " seconds\r\n";
    appendFile(filename, data, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });

});

test.beforeEach(async ({ page, vrt }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    stopwatch.start();
    await loginPage.login(usernameStopWatch, password, hostnameGrid);
    await welcomePage.switchToDmsGrid();
    //await welcomePage.closeTabs();
    console.log("before each End");
});
test.afterEach(async ({ page, vrt }) => {   
    //await welcomePage.closeTabs();
    const log_offPage = new LogoffPage(page);
    await log_offPage.logoff();
    await page.waitForTimeout(2345);
    await page.close();
    console.log("after each End");
});

test("IndexMask", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    const nextPage = new NextPage(page);    
    expect(welcomePage.checkArrow()).toBeTruthy();
    //await page.pause();
    await welcomePage.openRepository();
    await page.waitForLoadState();
    await page.waitForTimeout(1234);
    await nextPage.selectOptionInContextMenu("Properties", "default");    // select option Search in context menu
    await page.waitForLoadState();
    await page.waitForTimeout(1234);
    await nextPage.indexMask();
    console.log("IndexMask before vrt");
    await vrt.trackPage(page, "IndexMask", { diffTollerancePercent: 0.9999 });    
});

test("Navigation Search", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    const nextPage = new NextPage(page);
    //await page.pause();
    expect(welcomePage.checkArrow()).toBeTruthy();    
    await welcomePage.openRepository();
    await page.waitForLoadState();
    await page.waitForTimeout(1234);
    await nextPage.selectOptionInContextMenu("Search", "navigation");    // select option Search in context menu
    await page.waitForLoadState();
    await page.waitForTimeout(1234);
    await nextPage.maskNavigationSearch();
    console.log("Navigation Search before vrt");
    await vrt.trackPage(page, "Navigation Search", { diffTollerancePercent: 0.9999 });
    //await nextPage.openContextMenu(element)
});

test("Default Search", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    const nextPage = new NextPage(page);
    //await page.pause();
    expect(welcomePage.checkArrow()).toBeTruthy();    
    await welcomePage.openRepository();
    await page.waitForLoadState();
    await page.waitForTimeout(1234);
    await nextPage.selectOptionInContextMenu("Search", "default");    // select option Search in context menu
    await page.waitForLoadState();
    await page.waitForTimeout(1234);
    await nextPage.maskDefaultSearch();
    console.log("Default Search before vrt");
    await vrt.trackPage(page, "Default Search", { diffTollerancePercent: 0.9999 });    
});


test("Trace Tree View", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    const searchContractsPage = new SearchContractsPage(page);
    const nextPage = new NextPage(page);
    await welcomePage.openOnWelcomeTab();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await welcomePage.clickOnGRID();
    //await page.pause();
    expect(welcomePage.checkArrow()).toBeTruthy();    
    // first row :    locator('td:nth-child(9)').first()

    //await page.pause();   
    await page.waitForTimeout(2345);
    console.log("Trace Tree View");
    await vrt.trackPage(page, "Trace Tree View", { diffTollerancePercent: 0.9999 });
    //await nextPage.openContextMenu(element)
});
