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
        await this.page.waitForTimeout(4567);
        await btnSearch.waitFor();
        await btnSearch.click();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(4567);
        await firstRow.waitFor({ state: "visible" });
        await firstRow.click();
        await firstRow.dblclick();
        const heading = this.page.getByRole('heading', { name: 'Energy Markets Quick Actions' });
        await heading.waitFor({ state: "visible" });
    }

    async contractName() {
        await this.page.waitForTimeout(2345);
        //const contractName = this.page.locator('#contractNameField');
        const contractName = this.page.getByText('Contract Name*');
        //await contractName.waitFor({ timeout: 88000, state: "visible" });
        //contractName.waitFor({ state: "visible" });
        return contractName;
    }

   /*  async clickCancel() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            await this.page.getByRole('link', { name: 'Cancel' }).click()
        ])
    } */
}