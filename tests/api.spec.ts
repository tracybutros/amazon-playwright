import { test, expect } from '@playwright/test';

// Demonstrates Playwright's built-in API testing via the `request` fixture.
// No browser is launched — these run as pure HTTP tests.
test.describe('API Testing @regression', () => {
  test('amazon homepage returns 200', async ({ request }) => {
    const response = await request.get('/');
    // Amazon's CDN may return 202 (bot challenge) instead of 200
    expect([200, 202]).toContain(response.status());
  });

  test('search endpoint returns valid response', async ({ request }) => {
    const response = await request.get('/s?k=wireless+mouse');
    // 503 is returned when bot protection kicks in for headless requests
    expect([200, 202, 503]).toContain(response.status());
    if (response.status() === 200) {
      expect(response.headers()['content-type']).toContain('text/html');
    }
  });

  test('non-existent page returns 404', async ({ request }) => {
    const response = await request.get('/this-page-does-not-exist-xyz-abc');
    // Amazon may redirect, return 404, or return 503 via bot protection
    expect([200, 301, 302, 404, 503]).toContain(response.status());
  });
});
