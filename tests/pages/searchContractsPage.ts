import { expect, Page, test as base } from "@playwright/test";
export class SearchContractsPage {
    //contract: string
    constructor(public page: Page) {
        this.page = page;
        //this.contract = contractName;        
    }

    async firstRowSearchResults() {
        const btnSearch = this.page.getByRole('region', { name: 'Snippet Search in Contracts' }).getByRole('button', { name: 'Search' });
        const firstRow = this.page.locator('td:nth-child(9)').first();
        await btnSearch.click();
        await firstRow.waitFor({ state: "visible" });
        await firstRow.dblclick();
    }

    async contractName() {
        const contractName = this.page.locator('#contractNameField');
        contractName.waitFor({ state: "visible" });
        return contractName;
    }



    async clickCancel() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            await this.page.getByRole('link', { name: 'Cancel' }).click()
        ])
    }
}