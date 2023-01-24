import { expect, Page, test as base } from "@playwright/test";
export default class NewContract {

    constructor(public page: Page) {

    }

    async createNewContract() {
        const newName = this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByLabel('Contract Name');
        await newName.fill('Test Regression');       
        await this.page.frameLocator('internal:attr=[title="nscale Web - Create new Contract"i]').getByRole('button', { name: 'Ok'}).click();
    }

   
}