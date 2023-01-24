import { Page, test as base } from "@playwright/test";
export class LogoffPage {
    constructor(public page: Page) {
        this.page = page
    }
    async logoff() {
        await this.page.getByRole('button', { name: 'Open profile menu' }).click();
        await this.page.getByRole('menuitem', { name: 'Log off' }).click();
        await this.page.getByRole('button', { name: 'Log on again' }).click();        
    }
  
    async clickOK() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            await this.page.locator('.login-button').click()
        ])
    }
}