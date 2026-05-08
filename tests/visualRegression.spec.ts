import { test, expect } from '@playwright/test';

test.describe('Visual Regression @regression', () => {
  test('homepage matches snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Masks dynamic content so the snapshot stays stable across runs
    await expect(page).toHaveScreenshot('homepage.png', {
      mask: [page.locator('#nav-cart-count'), page.locator('#nav-tools-spray')],
      maxDiffPixelRatio: 0.05,
    });
  });

  test('search results page matches snapshot', async ({ page }) => {
    await page.goto('/s?k=wireless+mouse');
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveScreenshot('search-results.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
