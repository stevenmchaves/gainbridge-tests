import { test as base } from '@playwright/test';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [async ({ page }, use) => {
    // This code runs before every test.
    await page.goto('https://gb-saa-test.vercel.app/#');
    await use();
  }, { auto: true }],  // automatically starts for every test.
});