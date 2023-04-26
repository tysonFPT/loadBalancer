import { expect, Page, test as base } from "@playwright/test";
export class WelcomePage {
    constructor(public page: Page) {
    }

    async clickOnGRID() {
        //const tabAnwendungen = this.page.locator('//*[@id="layoutlink_DMSWestnetz_welcome_overview__layoutselector_welcome1_DMSWestnetz_DMSWestnetz_welcome_regelwerke__0"]');
        const tabAnwendungen = this.page.locator("//a[contains(text(),'Ihre Anwendungen')]");
        const btnBAG = this.page.locator('//div[contains(text(),"BAG")]');
        const tdKomArchiv = this.page.locator("//td[contains(text(),'Kommunalarchiv')]");
        const tdEingang = this.page.locator("//td[text()='Eingang']");
        const tdKMMünchen = this.page.locator("//td[text()='KM München']");
        const headKMMünchen = this.page.$("//h3[@title='KM München']")
        
        //await this.page.pause();
        await tabAnwendungen.click();
        await this.page.waitForLoadState();
        await btnBAG.click();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(2345);
        await tdKomArchiv.waitFor({ state: "visible" });
        await tdKomArchiv.click();
        await tdKomArchiv.dblclick();
        await this.page.waitForLoadState();
        await tdEingang.waitFor({ state: "visible" });
        await this.page.waitForTimeout(1234);
        await tdEingang.click();
        await tdEingang.dblclick();
        await tdKMMünchen.waitFor({ state: "visible" });
        await tdKMMünchen.click();
        await tdKMMünchen.dblclick();

        
        await this.page.waitForLoadState();

        await btnBAG.waitFor({ state: "visible" });
    }

    async switchToDmsGrid() {
        const iconButton = this.page.locator("//button[@class='icon-button']");
        await iconButton.click();
        await this.page.waitForLoadState();
        await this.page.pause();
        const arrowDropDown = this.page.locator("//nscale-icon[@class='dropdown-side-icon iconSmall iconHover']");
        const devaultDmsGrid = this.page.locator("//div[@id='docArea-displayname'][contains(text(),'DMS@GRID')]");
        console.log("devaultDmsGrid = " + devaultDmsGrid);
        //await devaultDmsGrid.waitFor({ state: "visible" });
        //const optionDmsGrid = this.page.locator("//div[@id='docArea-displayname'][contains(text(),'DMS@GRID')]");
        const optionDmsGrid = this.page.getByRole('menuitem', { name: 'DMS@GRID' });
        //const arrow = this.page.getByRole('button', { name: 'Fold in the side menu' })
        const visible = await devaultDmsGrid.isVisible();
        console.log("visible = " + visible);
        if (!visible) {
            
            await arrowDropDown.click();
            await optionDmsGrid.waitFor({ state: "visible" });
            await this.page.waitForTimeout(1234);
            await optionDmsGrid.click();
            await this.page.waitForLoadState();
        } else {
            await this.page.locator('.nw-recentboards-overlay').click();
        }
        await this.page.pause();
        
    }

    async openOnWelcomeTab() {
        const general = this.page.getByRole('option', { name: 'General' }).locator('div');
        //await this.page.pause();
        await general.hover();
        const optionWelcome = this.page.getByRole('option', { name: 'Welcome' }).locator('div');
        //const optionWelcome = this.page.locator("//span[@class='nw-snippetboard-tabearlabels']//span[1]");
        await optionWelcome.waitFor({state:"visible"});
        await optionWelcome.click();
        //const welcomeTab = this.page.locator('tab_welcome1_EEM');
        //const welcomeTab =this.page.getByRole('tab', { name: 'Willkommen' }).getByTitle('Willkommen').getByText('Willkommen');
        const welcomeTab = this.page.getByRole('tab', { name: 'Welcome' }).getByTitle('Welcome');
        await welcomeTab.waitFor({ state: "visible" });
        //await welcomeTab.click();
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
        //await this.page.pause();
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
        //await contractPartnTab.waitFor({ state: "visible" });
    }
    async clickOnContracts() {
        const contractsBtn = this.page.getByRole('link', { name: ' Contracts' });
        //await this.page.pause();
        const contractsTab = this.page.getByRole('tab', { name: 'Search Contracts' });
        await contractsBtn.click();
        //await contractsTab.waitFor({ state: "visible" });
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