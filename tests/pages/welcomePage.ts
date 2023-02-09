import { expect, Page, test as base } from "@playwright/test";
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
        //const tabs = this.page.locator(".nw-snippetboard-tablist-tabear");
        const tabs = this.page.locator("//ul[@role='tablist']//li");
        let count = await tabs.count();
        console.log("count= " + count);
        //await this.page.pause();
        while (count > 1) {
            //await this.page.getByRole('tab').getByRole('link', { name: 'Close' }).nth(count - 1).click();
            //await this.page.locator("//nscale-icon[@alt='Close']")[count-1].click();
            //await this.page.locator(`(//nscale-icon[@class="iconSmall iconHover"]//div)[${count} - 1]`).click();
            //await this.page.locator(`(//div[@class="nscale-icon-close_x-mask maskIcon"])[${count}]`).click();
            await this.page.locator(`(//li[@data-update-zone="tablistZone"])[${count}]//a[@title="Close"]//nscale-icon`).click();
            //await this.page.pause();
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