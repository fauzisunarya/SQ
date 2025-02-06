const { chromium, expect } = require('@playwright/test');

module.exports = async config => {

  const {storageState} = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(process.env.WEB_URL);
  await page.getByRole('textbox', { name: 'User code or email' }).fill(process.env.USERNAME1);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('navigation')).toContainText('Dashboard');
  await page.context().storageState({ path: storageState });
  await browser.close();
};

const dotenv = require('dotenv');
async function globalSetup() {
    try {
        if (process.env.ENV) {
            dotenv.config({
                path: `.env.${process.env.ENV}`,
                override: true
            });
        }
    } catch (error) {
        console.error("Error in loading environment variables", error)
    }
}
export default globalSetup;
