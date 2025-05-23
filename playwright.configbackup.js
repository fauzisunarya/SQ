// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
// Menggunakan tuple agar Playwright mengenali tipe data yang valid
const browsers = /** @type {const} */ (['chromium', 'firefox', 'webkit']); 
const folders = ['customer/positif','customer/negatif'];


/**
 * @see https://playwright.dev/docs/test-configuration
 */

const RPconfig = {
  apiKey: 'sakdasdj12312894',
  endpoint: 'http://localhost:9090/api/v1',
  project: "superadmin_personal",
  launch: "cobasajadulu",
  includeTestSteps: true
};

export default defineConfig({
  projects: folders.flatMap(folder =>
    browsers.map(browser => ({
      name: `${folder} - ${browser}`,
      testDir: `./tests/${folder}`,
      use: { browserName: browser }, // Pastikan browserName hanya menerima nilai valid
    }))
  ),
  globalSetup: 'config/globalSetup.js',
  // testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['@reportportal/agent-js-playwright', RPconfig]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    storageState: 'user.json',
    video: 'on',
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },



  /* Configure projects for major browsers */
  // projects: [
    // {
    //   name: 'Folder A',
    //   testDir: './tests/customer/negatif', // Jalankan semua tes dalam folderA
    // },
    // {
    //   name: 'Folder B',
    //   testDir: './tests/customer/positif', // Jalankan semua tes dalam folderB
    // },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

