import { expect, Page, test as base } from "@playwright/test";
export class NextPage {
    element: any;
    optProperties: any;
    //firstRow: any;
    option: string;
    mode: string;
    constructor(public page: Page) {
        //this.page = page;
        this.element = page.locator('h1', { hasText: 'Installation' });
        //this.optProperties = page.getByRole('menuitem', { name: 'Properties' }).getByText('Properties');
        //this.firstRow = page.locator('td:nth-child(4)').first(); //alebo  locator('.nscale-icon-empty-mask').first() alebo  locator('td:nth-child(3)').first()
    }

    async maskDefaultSearch() {
        const inpName = this.page.locator("//div/label[text()='Name']/following-sibling::input");
        const inpVerCreation = this.page.locator("//div/label[text()='Version creation']/following-sibling::div//input"); // 2 inputs
        const inpVerCreationFrom = this.page.getByRole('textbox', { name: 'Version creation - From' });
        const inpVerCreationTo = this.page.getByRole('textbox', { name: 'Version creation - From' });

        const region = this.page.locator('//input[@class="select2-search__field"]');
        const station = this.page.getByLabel('Station');
        const objektlasse = this.page.getByLabel('Objektklasse');
        const register = this.page.getByLabel('Register');
        const Equimentnummer = this.page.getByLabel('Equimentnummer');
        await this.page.pause();
        await inpName.waitFor({ state: "visible" });
        await expect(inpName).toBeVisible();

    }



    async selectOptionInContextMenu(option, mode) {
        console.log(' mode = ' + mode);
        var firstRow:any;
        if (mode == "default") {
            firstRow = this.page.locator('//div[@class="nscale-icon-collection_s-mask maskIcon"]').first();
            console.log(' default search ');
        } else {
            firstRow = this.page.locator('//div/div[@class="nscale-icon-collectionnonav_s-mask maskIcon"]').first();
            console.log(' navigation search ');
        }
        await this.page.pause();
        //const firstRow = this.page.locator('td:nth-child(4)').first(); //alebo  locator('.nscale-icon-empty-mask').first() alebo  locator('td:nth-child(3)').first()
        //const firstRow = this.page.locator('//div[@class="nscale-icon-collection_s-mask maskIcon"]').first();
        const optProperties = this.page.getByRole('menuitem', { name: 'Properties' }).getByText('Properties');
        await this.page.pause();
        await firstRow.waitFor({ state: "visible" });
        await firstRow.click({ button: 'right' });
        await optProperties.waitFor({ state: "visible" });
        await this.page.getByRole('menuitem', { name: `${option}` }).getByText(`${option}`).click();
        await this.page.pause();
        await this.page.waitForLoadState();
        //await this.page.locator(('//div[@class="nw-snippetboard-tabear sideBySide"]//span[contains(text(),(`${option}`)]').waitFor({ state: "visible" });
        //return arrow;
    }

    async maskNavigationSearch() {
        const region = this.page.getByRole('textbox', { name: 'Region' }).first();
        const station = this.page.getByLabel('Station');
        const objektlasse = this.page.getByLabel('Objektklasse');
        const register = this.page.getByLabel('Register');
        const Equimentnummer = this.page.getByLabel('Equimentnummer');
        //await this.page.pause();
        await region.waitFor({ state: "visible" });
        await expect(region).toBeVisible();        
        //await this.page.pause();
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
        await optionWelcome.waitFor({ state: "visible" });
        await optionWelcome.click();
        //const welcomeTab = this.page.locator('tab_welcome1_EEM');
        //const welcomeTab =this.page.getByRole('tab', { name: 'Willkommen' }).getByTitle('Willkommen').getByText('Willkommen');
        const welcomeTab = this.page.locator("(//span[text()='Willkommen'])[2]");
        await welcomeTab.waitFor({ state: "visible" });
        //await welcomeTab.click();
    }

    /*    async openContextMenu(element, optProperties) {
           
           await element.waitFor({ state: "visible" });
           await element.click({ button: 'right' });
           await optProperties.waitFor({ state: "visible" });
           await optProperties.click();
           await this.page.locator("(//span[@data-update-zone='^']//span)[contains(text(), 'Properties')]").waitFor({ state: "visible" });
           //return arrow;
       } */


} 