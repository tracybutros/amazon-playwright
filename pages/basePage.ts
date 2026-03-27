import { Page } from '@playwright/test';
import { CommonActions } from '../utils/helpers';

export class BasePage extends CommonActions {
  constructor(page: Page) {
    super(page);
  }

  async navigate(path: string = '/') {
    await this.page.goto(path);
  }
}
