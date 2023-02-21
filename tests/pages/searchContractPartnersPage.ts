import { expect, Page, test as base } from "@playwright/test";
export class SearchContractPartnersPage {
    //contract: string
    constructor(public page: Page) {
        this.page = page;
        //this.contract = contractName;        
    }

    async firstRowSearchResults() {
        const btnSearch = this.page.getByRole('region', { name: 'Snippet Search in Contract Partners' }).getByRole('button', { name: 'Search' });
        const firstRow = this.page.locator('td:nth-child(9)').first();
        await btnSearch.click();
        await firstRow.waitFor({ state: "visible" });
        await firstRow.click();
        await firstRow.dblclick();
    }

    async contractPartnerName() {
        const contractPartnerName = this.page.getByLabel('Contract Partner Name*');
        await contractPartnerName.waitFor({ state: "visible" });
        return contractPartnerName;
    }

    async clickCancel() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            await this.page.getByRole('link', { name: 'Cancel' }).click()
        ])
    }
}