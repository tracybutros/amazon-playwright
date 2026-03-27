import { test } from '@playwright/test';
import { AmazonHomePage } from '../pages/amazonHomePage';

test('search item on amazon', async ({ page }) => {
  const amazonHome = new AmazonHomePage(page);
  await amazonHome.navigate('/');
  await amazonHome.searchForItem('wireless mouse');
  await amazonHome.verifySearchResults();
});