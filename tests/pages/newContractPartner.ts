import { expect, Page, test as base } from "@playwright/test";
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