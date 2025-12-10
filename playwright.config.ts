import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: 'https://gorest.co.in/public/v2/graphql',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.GO_REST_API_TOKEN || ''}`,
      'Content-Type': 'application/json'
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  }
});
