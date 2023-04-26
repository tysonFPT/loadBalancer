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
    //page = await browser.newPage();    
    await vrt.start();
});

test.afterAll(async ({ page, vrt }) => {
    await vrt.stop();
    console.log("Time: " + stopwatch.getTime()/1000 + " seconds");
    var new_Date = new Date();
    var strDateTime = new_Date.toLocaleString();
    var data = strDateTime + " Time: " + stopwatch.getTime()/1000 + " seconds\r\n";
   /*  function syncWriteFile(filename: string, data: string) {
        writeFileSync(filename, "Time: " + stopwatch.getTime()/1000 + " seconds", {
          flag: 'a+',
        });
    } */
    //writeFileSync(filename, data);
    appendFile(filename, data, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    // File.writeTextFile()
});

test.beforeEach(async ({ page, vrt }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    stopwatch.start();
    await loginPage.login(usernameStopWatch, password, hostnameGrid);
    await welcomePage.switchToDmsGrid();

    await welcomePage.openOnWelcomeTab();
    await page.pause();  
    //await welcomePage.closeTabs();
    console.log("before each End");
});
test.afterEach(async ({ page, vrt }) => {
    //const welcomePage = new WelcomePage(page);
    //await welcomePage.closeTabs();
    const log_offPage = new LogoffPage(page);
    await log_offPage.logoff();
    await page.waitForTimeout(2345);
    await page.close();    
    console.log("after each End");
}); 


test("KM Munchen", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    const searchContractsPage = new SearchContractsPage(page);
    const nextPage = new NextPage(page);
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnGRID();
    //await page.pause();
    expect(welcomePage.checkArrow()).toBeTruthy();
    //const btnSearch = this.page.getByRole('region', { name: 'Snippet Search in Contracts' }).getByRole('button', { name: 'Search' })
    // first row :    locator('td:nth-child(9)').first()
    
    //await page.pause();
    //expect(searchContractsPage.contractName()).toBeTruthy();
    await page.waitForTimeout(2345);
    console.log("KM Munchen before vrt");
    await vrt.trackPage(page, "KM Munchen", { diffTollerancePercent: 0.9999 });
    //await nextPage.openContextMenu(element)
    
});

/* test.skip("Self Service", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnSelfService();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "Self Service");
    console.log(stopwatch.getTime());
});

test.skip("Corporate Office", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnCorporateOffice();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await vrt.trackPage(page, "Corporate Office");
    console.log(stopwatch.getTime());
});
 */
