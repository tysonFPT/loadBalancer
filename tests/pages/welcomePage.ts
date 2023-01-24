import { expect, Page, test as base } from "@playwright/test";
export class WelcomePage {

    constructor(public page: Page) {
    }

    async checkArrow() {
        const arrow = this.page.getByRole('button', { name: 'Fold in the side menu' })
        await arrow.waitFor({ state: "visible" });
        return arrow;
    }

    async clickOnWelcomeTab() {
        const welcomeTab = this.page.locator('tab_welcome1_EEM');
        await welcomeTab.waitFor({ state: "visible" });
        await welcomeTab.click();
    }

    async closeTabs() {
        const tabs = this.page.locator(".nw-snippetboard-tablist-tabear");
        let count = await tabs.count();
        while (count > 1) {
            await this.page.getByRole('tab').getByRole('link', { name: 'Close' }).nth(count - 1).click();
            count--;
        }
    }
    async clickOnNewContract() {
        const newContractBtn = this.page.getByRole('link', { name: ' New Contract' }).nth(1);
        await newContractBtn.waitFor({ state: "visible" });
        await newContractBtn.click();
    }
}