import { test, expect } from './fixtures';
import { searchTerms, getUserByRole, type SearchTerm } from '../utils/testData';

// ---------------------------------------------------------------------------
// Pattern 1: test.each with an inline data table
// Good for small, hardcoded sets that belong next to the test
// ---------------------------------------------------------------------------
test.describe('Inline data table @regression', () => {
  const inlineTerms = [
    { term: 'laptop stand', minResults: 1 },
    { term: 'monitor arm',  minResults: 1 },
    { term: 'webcam',       minResults: 1 },
  ];

  for (const { term, minResults } of inlineTerms) {
    test(`search "${term}" returns at least ${minResults} result(s) @smoke`, async ({ amazonHome, page }) => {
      await amazonHome.searchForItem(term);
      await amazonHome.verifySearchResults();
      const results = page.locator('[data-component-type="s-search-result"]');
      await expect(results.first()).toBeVisible();
    });
  }
});

// ---------------------------------------------------------------------------
// Pattern 2: test.each driven by an external JSON file
// Keeps test data separate from test logic — easy to update without touching code
// ---------------------------------------------------------------------------
test.describe('External JSON data @regression', () => {
  for (const { term, tag } of searchTerms as SearchTerm[]) {
    test(`[${tag}] search "${term}" lands on results page @smoke`, async ({ amazonHome }) => {
      await amazonHome.searchForItem(term);
      await amazonHome.verifySearchResults();
    });
  }
});

// ---------------------------------------------------------------------------
// Pattern 3: role-based data lookup
// Pulls a specific user record from test-data/users.json by role
// ---------------------------------------------------------------------------
test.describe('Role-based user data', () => {
  test('standard user data is available', async ({ page }) => {
    const user = getUserByRole('standard');
    expect(user.email).toBeTruthy();
    expect(user.role).toBe('standard');
    // In a real suite you would use these credentials to log in:
    // await loginPage.login(user.email, user.password);
  });

  test('prime user data is available', async ({ page }) => {
    const user = getUserByRole('prime');
    expect(user.email).toBeTruthy();
    expect(user.role).toBe('prime');
  });
});
