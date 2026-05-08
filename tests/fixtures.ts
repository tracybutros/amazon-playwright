import { test as base } from '@playwright/test';
import { AmazonHomePage } from '../pages/amazonHomePage';

type MyFixtures = {
  amazonHome: AmazonHomePage;
};

export const test = base.extend<MyFixtures>({
  amazonHome: async ({ page }, use) => {
    const amazonHome = new AmazonHomePage(page);
    await amazonHome.navigate('/');
    await use(amazonHome);
  },
});

export { expect } from '@playwright/test';
