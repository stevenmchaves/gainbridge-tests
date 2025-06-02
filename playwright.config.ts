import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './',
  timeout: 30000,
  reporter: 'html',
  use: {
    testIdAttribute: 'data-item-id',
    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  }
});