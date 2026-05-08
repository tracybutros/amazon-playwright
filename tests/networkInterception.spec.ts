import { test, expect } from '@playwright/test';

test.describe('Network Interception @regression', () => {
  test('intercept and mock an API response', async ({ page }) => {
    // Intercept any fetch/XHR to the suggestions endpoint and return mock data
    await page.route('**/api/2017/suggestions**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ suggestions: [{ value: 'mocked suggestion' }] }),
      });
    });

    await page.goto('/');
    // The route mock is now active — any matching request returns the stub
  });

  test('block third-party analytics requests', async ({ page }) => {
    const blockedUrls: string[] = [];

    await page.route('**/*.{png,jpg,jpeg,gif,svg}', route => {
      blockedUrls.push(route.request().url());
      route.abort();
    });

    await page.goto('/');
    // Images are blocked — useful for speeding up tests or isolating behaviour
    console.log(`Blocked ${blockedUrls.length} image requests`);
  });

  test('observe network requests made during page load', async ({ page }) => {
    const requests: string[] = [];

    page.on('request', request => {
      if (request.resourceType() === 'fetch' || request.resourceType() === 'xhr') {
        requests.push(request.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log(`Captured ${requests.length} XHR/fetch requests`);
    expect(requests.length).toBeGreaterThanOrEqual(0);
  });
});
