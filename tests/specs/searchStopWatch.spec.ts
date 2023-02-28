import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
import { Stopwatch } from "ts-stopwatch";
import { LoginPage } from "../pages/loginPage";
//import { LogoffPage } from "../pages/log_offPage";
import { WelcomePage } from "../pages/welcomePage";
import { SearchContractsPage } from "../pages/searchContractsPage";
import { SearchContractPartnersPage } from "../pages/searchContractPartnersPage";
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
    console.log("Time: " + stopwatch.getTime()/1000 + " seconds");
   // File.writeTextFile()
});

test.beforeEach(async ({ page, vrt }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    stopwatch.start();
    await loginPage.login(username, password, dmsUrl);
    await welcomePage.openOnWelcomeTab();
    //await page.pause();  
    //await welcomePage.closeTabs();
});

test.afterEach(async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    //await welcomePage.closeTabs();
});


test.only("Contract Partners", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page); 
    const searchContrPartnPage = new SearchContractPartnersPage(page);  
    expect(welcomePage.checkArrow()).toBeTruthy(); 
    //await page.pause();  
    await welcomePage.clickOnContractPartners();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await searchContrPartnPage.firstRowSearchResults();
    expect(searchContrPartnPage.contractPartnerName()).toBeTruthy();
    console.log("Bye bye!");
    await vrt.trackPage(page, "Contract Partners");
    console.log(stopwatch.getTime());
});

test("Search Contracts", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);   
    const searchContractsPage = new SearchContractsPage(page);
    expect(welcomePage.checkArrow()).toBeTruthy();   
    await welcomePage.clickOnContracts();
    expect(welcomePage.checkArrow()).toBeTruthy();
    //const btnSearch = this.page.getByRole('region', { name: 'Snippet Search in Contracts' }).getByRole('button', { name: 'Search' })
    // first row :    locator('td:nth-child(9)').first()
    await searchContractsPage.firstRowSearchResults();
    //await page.pause();
    expect(searchContractsPage.contractName()).toBeTruthy();
    console.log("Good bye !!!");
    await vrt.trackPage(page, "Search Contract Partners page");
    
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

