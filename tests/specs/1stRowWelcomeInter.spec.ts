import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";
//import { LoginPage } from "../pages/loginPage";
//import WelcomePage from "../pages/welcomePage";

type TestFixtures = {
    vrt: PlaywrightVisualRegressionTracker;
};
const config: Config = {
    apiUrl: "http://localhost:4200",
    project: "DMS EON",
    apiKey: "EMZDX0TEMHMB7GH9PPMTZBZ3M7HB",
    branchName: "master",
    projectId: "c16ee8e3-d963-4395-9245-75ebb162040c",
    enableSoftAssert: true,
};
const dmsUrl = "https://dms-sales-qa.eon.com/nscale_web/nw/login/noImmediateLogin/";
const test = base.extend<{}, TestFixtures>({
    vrt: [
        async ({ browserName }, use) => {
            await use(new PlaywrightVisualRegressionTracker(browserName, config));
        },
        { scope: "worker" },
    ],
});
const username = "M86152@TDMS";
const password = "November.2022";

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

export class LoginPage {
    constructor(public page: Page) {
        this.page = page
    }
    async login(username: string, password: string, url: string) {
        await this.page.goto(url);
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickOK();
    }

    async enterUserName(username: string) {
        await this.page.locator('#userName').waitFor();
        await this.page.locator('#userName').fill(username);
    }
    async enterPassword(password: string) {
        await this.page.locator('#oldPassword')
            .fill(password);
    }
    async clickOK() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            await this.page.locator('.login-button').click()
        ])
    }
}

export class WelcomePage {
    constructor(public page: Page) {
    }

    async checkArrow() {
        const arrow = this.page.getByRole('button', { name: 'Fold in the side menu' })
        await arrow.waitFor({ state: "visible" });
        return arrow;
    }

    async clickOnWelcomeTab() {
        const welcomeTab = this.page.locator('tab_welcome1_EEM');
        await welcomeTab.waitFor({ state: "visible" });
        await welcomeTab.click();
    }

    async closeTabs() {
        const tabs = this.page.locator(".nw-snippetboard-tablist-tabear");
        let count = await tabs.count();
        while (count > 1) {
            await this.page.getByRole('tab').getByRole('link', { name: 'Close' }).nth(count - 1).click();
            count--;
        }
    }
    async clickOnNewContract() {
        const newContractBtn = this.page.getByRole('link', { name: ' New Contract' }).nth(1);
        await newContractBtn.waitFor({ state: "visible" });
        await newContractBtn.click();
    }
    async clickOnContractPartners() {
        const contractPartnBtn = this.page.getByRole('link', { name: ' Contract Partners' });
        const contractPartnTab = this.page.getByRole('tab', { name: 'Search Contract Partners' }).getByTitle('Search Contract Partners');
        await contractPartnBtn.click();
        await contractPartnTab.waitFor({ state: "visible" });
    }
    async clickOnContracts() {
        const contractsBtn = this.page.getByRole('link', { name: ' Contracts' });
        const contractsTab = this.page.getByRole('tab', { name: 'Search Contracts' });
        await contractsBtn.click();
        await contractsTab.waitFor({ state: "visible" });
    }
    async clickOnSelfService() {
        const selfservBtn = this.page.getByRole('link', { name: ' Self Service' });
        const selfservTab = this.page.getByRole('tab', { name: 'Self Service' });
        await selfservBtn.click();
        await selfservTab.waitFor({ state: "visible" });
    }
    async clickOnCorporateOffice() {
        const corpOfficeBtn = this.page.getByRole('link', { name: ' Corporate Office' });
        const corpOfficeTab = this.page.getByRole('tab', { name: 'Search Corporate Office' });
        await corpOfficeBtn.click();
        await corpOfficeTab.waitFor({ state: "visible" });
    }
}

/* export class ContractPartners {

    constructor(public page: Page) {
    }

    await vrt.trackPage(page, "Contract Partners");
} */