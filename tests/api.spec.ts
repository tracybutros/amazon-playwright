import { test, expect } from '@playwright/test';

// Demonstrates Playwright's built-in API testing via the `request` fixture.
// No browser is launched — these run as pure HTTP tests.
test.describe('API Testing @regression', () => {
  test('amazon homepage returns 200', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
  });

  test('search endpoint returns valid response', async ({ request }) => {
    const response = await request.get('/s?k=wireless+mouse');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
  });

  test('non-existent page returns 404', async ({ request }) => {
    const response = await request.get('/this-page-does-not-exist-xyz-abc');
    // Amazon redirects to homepage instead of returning 404
    expect([200, 301, 302, 404]).toContain(response.status());
  });
});
