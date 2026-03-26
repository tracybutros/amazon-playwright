import { test, expect } from '@playwright/test';

test('search item on amazon', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Search Amazon').fill('wireless mouse');
  await page.click('input[type="submit"]');

  await expect(page).toHaveURL(/s/);
});