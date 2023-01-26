import { expect, Page, test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker, Config } from "@visual-regression-tracker/agent-playwright";

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
const contractName = "Test Regresssion";
const contractPartner = "Test ContractPartner01";

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

test.only("New Contract", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    expect(welcomePage.checkArrow()).toBeTruthy();
    await welcomePage.clickOnNewContract();
    expect(welcomePage.checkArrow()).toBeTruthy();
    //await page.pause();
    //await vrt.trackPage(page, "Create New Contract");
    const newContract = new NewContract(page);
    await newContract.enterNewContract(contractName);
    await vrt.trackPage(page, "New Contract Details");
    //await page.pause();
    await newContract.goToBranchOffice();
    //await page.pause();
    await vrt.trackPage(page, "Branch Office");
    //await page.pause();
    await newContract.goToContactDetails();
    //await page.pause();
    await vrt.trackPage(page, "New Contact Details");
    await newContract.goToDocuments(contractName);
    //await page.pause();
    //await vrt.trackPage(page, "New Documents");
    await vrt.trackPage(page, "New Documents", {diffTollerancePercent:0.5});
});

test("New Contract Partner", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    expect(welcomePage.checkArrow()).toBeTruthy();
    await welcomePage.clickOnNewContrPartner();
    expect(welcomePage.checkArrow()).toBeTruthy();
    //await page.pause();
    const newContractPartner = new NewContractPartner(page);
    await newContractPartner.enterNewContractPartner(contractPartner);
    await vrt.trackPage(page, "New Contract Company Details");
    //await page.pause();
    await newContractPartner.goToBranchOffice();
   //await page.pause();
    await vrt.trackPage(page, "New Contract Branch Office");
    await newContractPartner.goToContactDetails();
    //await page.pause();
    await vrt.trackPage(page, "New Contract Contact Details");
    await newContractPartner.goToTax();
    //await page.pause();
    await vrt.trackPage(page, "New Contract Tax Certificates");
    await newContractPartner.goToDocuments(contractPartner);
    //await page.pause();
    await vrt.trackPage(page, "New Contract Documents");
    //await newContractPartner.clickCancel();
});

test("New Corporate Office Contract", async ({ page, vrt }) => {
    const welcomePage = new WelcomePage(page);
    expect(welcomePage.checkArrow()).toBeTruthy();
    await welcomePage.clickOnNewCorpoOfficeContract();
    expect(welcomePage.checkArrow()).toBeTruthy();
    await page.pause();
    //await vrt.trackPage(page, "Create New Contract");
    const newCorpOfficeContract = new NewCorpOfficeContract(page);
    await newCorpOfficeContract.enterNewCorpOfficeContract("Test ContractPartner01");
    await vrt.trackPage(page, "New Corporate Office Contract");
    //await page.pause();
    await newCorpOfficeContract.clickCancel();
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

    async clickOnNewCorpoOfficeContract() {
        const newCorpoOfficeContractBtn = this.page.getByRole('link', { name: ' New Corporate Office Contract' });
        await newCorpoOfficeContractBtn.waitFor({ state: "visible" });
        await newCorpoOfficeContractBtn.click();
        await this.page.frameLocator('internal:attr=[title="nscale Web - Create new Corporate Office Contract"i]').getByRole('heading', { name: 'Create new Corporate Office Contract' }).waitFor();
    }

    async clickOnNewContrPartner() {
        const newContractPartnerBtn = this.page.getByRole('link', { name: ' New Contract Partner' });
        await newContractPartnerBtn.waitFor({ state: "visible" });
        await newContractPartnerBtn.click();
        await this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByRole('heading', { name: 'Create new Contract Partner' }).waitFor();
    }
    async clickOnNewContract() {
        const newContractBtn = this.page.getByRole('link', { name: ' New Contract' }).nth(1);
        await newContractBtn.waitFor({ state: "visible" });
        await newContractBtn.click();
        await this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByRole('heading', { name: 'Create new Contract' }).waitFor();
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

export class NewContract {
    //contract: string
    constructor(public page: Page) {
        this.page = page;
        //this.contract = contractName;        
    }

    async enterNewContract(contract: string) {
        await this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByRole('heading', { name: 'Create new Contract' }).waitFor();
        const contractName = this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByLabel('Contract Name');
        const okBtn = this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByRole('button', { name: 'Ok' });
        await contractName.fill(contract);
        await okBtn.click();
        const newContractTab = this.page.getByRole('tab', { name: `${contract}` }).getByTitle(`${contract}`);
        await newContractTab.waitFor({ state: "visible" });
        await newContractTab.click();
    }

    async goToBranchOffice() {
        const branchOfficeTab = this.page.getByRole('link', { name: 'Branch Office' });
        await branchOfficeTab.waitFor();
        await branchOfficeTab.click();
        await this.page.waitForSelector('//h2[contains(text(), "Branch Offices")]');
    }

    async goToContactDetails() {
        const contactDetailsTab = this.page.getByRole('link', { name: 'Contact Details' });
        await contactDetailsTab.waitFor();
        await contactDetailsTab.click();
        await this.page.waitForSelector('//button[@id="NewEntryButton_0"]');
    }

    async goToDocuments(contract: string) {
        //this.contract = this.contract;
        const documentsTab = this.page.getByRole('link', { name: 'Documents' });
        await documentsTab.waitFor();
        await documentsTab.click();
        //await this.page.pause();
        const docHeading = this.page.getByRole('region', { name: 'Snippet Listview' }).getByRole('heading', { name: `${contract}` });
        await docHeading.waitFor({ state: "visible" });
        //await this.page.waitForSelector(`//h3[@title=${contract}]`);
    }

    async clickCancel() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            await this.page.getByRole('link', { name: 'Cancel' }).click()
        ])
    }
}

export class NewContractPartner {
    constructor(public page: Page) {
        this.page = page
    }

    async enterNewContractPartner(contractPartner: string) {
        await this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByRole('heading', { name: 'Create new Contract Partner' }).waitFor();
        const contractPartnerName = this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByLabel('Contract Partner Name');
        const okBtn = this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByRole('button', { name: 'Ok' });
        await contractPartnerName.fill(contractPartner);
        await okBtn.click();
        const newContractPartnerTab = this.page.getByRole('tab', { name: `${contractPartner}` }).getByTitle(`${contractPartner}`);
        await newContractPartnerTab.waitFor({ state: "visible" });
        await newContractPartnerTab.click();
        await this.page.waitForSelector("//h3[text()='Energy Markets Quick Actions']");        
    }

    async goToBranchOffice() {
        const branchOfficeTab = this.page.getByRole('link', { name: 'Branch Office' });
        await branchOfficeTab.waitFor();
        await branchOfficeTab.click();        
    }

    async goToContactDetails() {
        const contactDetailsTab = this.page.getByRole('link', { name: 'Contact Details' });
        await contactDetailsTab.waitFor();
        await contactDetailsTab.click();
        await this.page.waitForSelector('//button[@id="NewEntryButton_0"]');
    }

    async goToTax() {
        const taxTab = this.page.getByRole('link', { name: 'Tax' });
        await taxTab.waitFor();
        await taxTab.click();
        await this.page.waitForSelector('//a[contains(text(),"+")]');
    }

    async goToDocuments(contract: string) {
        //this.contract = this.contract;
        const documentsTab = this.page.getByRole('link', { name: 'Documents' });
        await documentsTab.waitFor();
        await documentsTab.click();
        await this.page.pause();
        const docHeading = this.page.getByRole('region', { name: 'Snippet Listview' }).getByRole('heading', { name: `${contract}` });
        await docHeading.waitFor({ state: "visible" });
        //await this.page.waitForSelector(`//h3[@title=${contract}]`);
    }

    async clickCancel() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            await this.page.getByRole('link', { name: 'Cancel' }).click()
        ])
    }
}

export class NewCorpOfficeContract {
    constructor(public page: Page) {
        this.page = page
    }

    async enterNewCorpOfficeContract(docName: string) {
        await this.page.frameLocator('internal:attr=[title="nscale Web - Create new Corporate Office Contract"i]').getByRole('heading', { name: 'Create new Corporate Office Contract' }).waitFor();
        const corpDocName = this.page.frameLocator('internal:attr=[title="nscale Web - Create new Corporate Office Contract"i]').getByLabel('Corporate Document Name');
        const okBtn = this.page.frameLocator('internal:attr=[title="nscale Web - Create new Corporate Office Contract"i]').getByRole('button', { name: 'Ok' });
        await corpDocName.fill(docName);
        await okBtn.click();
        const newContractDocumentTab = this.page.getByRole('tab', { name: `${docName}` }).getByTitle(`${docName}`).getByText(`${docName}`);
        await newContractDocumentTab.waitFor({ state: "visible" });
        await newContractDocumentTab.click();
    }

    async clickCancel() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            await this.page.getByRole('link', { name: 'Cancel' }).click()
        ])
    }
}
/* export class ContractPartners {

    constructor(public page: Page) {
    }

    await vrt.trackPage(page, "Contract Partners");
} */