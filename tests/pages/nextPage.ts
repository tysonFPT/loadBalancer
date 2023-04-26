import { expect, Page, test as base } from "@playwright/test";
export class NextPage {
    element: any;
    optProperties: any;
    constructor(public page: Page) {
        //this.page = page;
        this.element = page.locator('h1', { hasText: 'Installation' });
        this.optProperties = page.getByRole('menuitem', { name: 'Properties' }).getByText('Properties');

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
        const optionWelcome = this.page.getByRole('option', { name: 'Willkommen' }).locator('div');
        await optionWelcome.waitFor({state:"visible"});
        await optionWelcome.click();
        //const welcomeTab = this.page.locator('tab_welcome1_EEM');
        //const welcomeTab =this.page.getByRole('tab', { name: 'Willkommen' }).getByTitle('Willkommen').getByText('Willkommen');
        const welcomeTab = this.page.locator("(//span[text()='Willkommen'])[2]");
        await welcomeTab.waitFor({ state: "visible" });
        //await welcomeTab.click();
    }

    async openContextMenu(element, optProperties) {
        
        await element.waitFor({ state: "visible" });
        await element.click({ button: 'right' });
        await optProperties.waitFor({ state: "visible" });
        await optProperties.click();
        await this.page.locator("(//span[@data-update-zone='^']//span)[contains(text(), 'Properties')]").waitFor({ state: "visible" });
        //return arrow;
    }

   
} 