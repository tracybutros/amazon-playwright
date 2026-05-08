import { test, expect } from './fixtures';
import { searchTerms } from '../utils/testData';

test.describe('Amazon Search @regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');
  });

  // Uses the first two entries from test-data/searchTerms.json
  const [mouse, keyboard] = searchTerms;

  test(`search for "${mouse.term}" returns results @smoke`, async ({ amazonHome }) => {
    await amazonHome.searchForItem(mouse.term);
    await amazonHome.verifySearchResults();
  });

  test(`search for "${keyboard.term}" returns results @smoke`, async ({ amazonHome }) => {
    await amazonHome.searchForItem(keyboard.term);
    await amazonHome.verifySearchResults();
  });

  test('search results page has product listings', async ({ amazonHome, page }) => {
    await amazonHome.searchForItem('headphones');
    await amazonHome.verifySearchResults();
    const results = page.locator('[data-component-type="s-search-result"]');
    await expect(results.first()).toBeVisible();
  });
});
