import { expect, Page, test as base } from "@playwright/test";
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