import { Page } from '@playwright/test';

export class CommonActions {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Click on an element by selector
  async clickElement(selector: string) {
    await this.page.click(selector);
  }

  // Click on an element by role
  async clickByRole(role: string, name?: string | RegExp) {
    await this.page.getByRole(role as any, { name }).click();
  }

  // Fill input field by placeholder
  async fillByPlaceholder(placeholder: string, text: string) {
    await this.page.getByPlaceholder(placeholder).fill(text);
  }

  // Fill input field by label
  async fillByLabel(label: string, text: string) {
    await this.page.getByLabel(label).fill(text);
  }

  // Fill input field by selector
  async fillBySelector(selector: string, text: string) {
    await this.page.locator(selector).fill(text);
  }

  // Hover over an element
  async hoverOverElement(selector: string) {
    await this.page.locator(selector).hover();
  }

  // Hover over an element by role
  async hoverByRole(role: string, name?: string | RegExp) {
    await this.page.getByRole(role as any, { name }).hover();
  }

  // Get text from an element
  async getElementText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }

  // Check if element is visible
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  // Wait for element to be visible
  async waitForElement(selector: string, timeout: number = 5000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  // Double-click on an element
  async doubleClickElement(selector: string) {
    await this.page.locator(selector).dblclick();
  }

  // Right-click on an element
  async rightClickElement(selector: string) {
    await this.page.locator(selector).click({ button: 'right' });
  }

  // Select option from dropdown by value
  async selectDropdownOption(selector: string, value: string) {
    await this.page.locator(selector).selectOption(value);
  }

  // Select option from dropdown by label
  async selectDropdownOptionByLabel(selector: string, label: string) {
    await this.page.locator(selector).selectOption({ label });
  }

  // Maximize page (scroll to top and set viewport)
  async maximizePage() {
    await this.page.goto('about:blank');
    await this.page.evaluate(() => window.moveTo(0, 0));
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  // Scroll to element
  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  // Scroll to top of page
  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  // Scroll to bottom of page
  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  // Get all text from multiple elements
  async getAllElementsText(selector: string): Promise<string[]> {
    return await this.page.locator(selector).allTextContents();
  }

  // Wait for navigation after action
  async waitForNavigation(action: () => Promise<void>) {
    await Promise.all([this.page.waitForNavigation(), action()]);
  }

  // Check if element exists
  async elementExists(selector: string): Promise<boolean> {
    return (await this.page.locator(selector).count()) > 0;
  }

  // Take screenshot
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
