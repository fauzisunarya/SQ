import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

// const testPathIndex = process.argv.findIndex(arg => arg === 'test') + 1;
// const testPath = testPathIndex > 0 && process.argv[testPathIndex] ? process.argv[testPathIndex] : null;
// const launchName = testPath ? path.basename(testPath, path.extname(testPath)) : "Semua Modul";

// const RPconfig = {
//   apiKey: process.env.API_KEY,
//   endpoint: 'http://localhost:9090/api/v1',
//   project: "ada",
//   launch: launchName,
// };

export default defineConfig({
  globalSetup: "config/globalSetup.js",
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: undefined,
  reporter: 'html',
  use: {
    storageState: "user.json",
    video: "on",
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    //   grepInvert: /@flow/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    //   grepInvert: /@flow/,
    },
  ],
});
