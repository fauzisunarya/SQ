//Berikut ini ada standariasi Boilerplate Code yang akan digunakan 
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../data/dev/dataDev.json')));
const dataDev = devTestData.LOGINPASSWORDINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../data/qa/dataQa.json')));
const dataQa = qaTestData.LOGINPASSWORDINVALID

test('test', async ({ page,browserName }) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TS-UI-LOGIN-002');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi. setDescription(`
      Test Step :
      1. Visit ke url wakanda
      2. Login dengan username benar dan pass salah
      3. Menampilkan pesan Pengguna atau kata sandi tidak cocok `)
  ReportingApi.addAttributes([
      {
          key: 'browser',
          value: browserName,
      }
      ]);
  let testData = dataDev;
  if(process.env.ENV == 'qa'){
      testData = dataQa;
  }
  await page.goto(process.env.WEB_URL);
  await page.locator('[data-test="username"]').fill(testData.username);
  await page.locator('[data-test="password"]').fill(testData.password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');
});
