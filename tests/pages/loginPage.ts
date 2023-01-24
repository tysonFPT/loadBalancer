import { expect, Page, test as base } from "@playwright/test";
export class LoginPage {
    constructor(public page: Page) {
        this.page = page
    }
    async login(username: string, password: string, url: string) {
        await this.page.goto(url);
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickOK();
    }

    async enterUserName(username: string) {
        await this.page.locator('#userName').waitFor();
        await this.page.locator('#userName').fill(username);
    }
    async enterPassword(password: string) {
        await this.page.locator('#oldPassword')
            .fill(password);
    }
    async clickOK() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            await this.page.locator('.login-button').click()
        ])
    }
}