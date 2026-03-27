import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class AmazonHomePage extends BasePage {
  async searchForItem(itemName: string) {
    await this.fillByPlaceholder('Search Amazon', itemName);
    await this.clickElement('input[type="submit"]');
  }

  async verifySearchResults() {
    await expect(this.page).toHaveURL(/s/);
  }
}
