import { test} from '@playwright/test';
import Pomanager from "../../../pages/pomanager"
const devTestData = JSON.parse(JSON.stringify(require('../../../data/dev/dataDev.json')));
const dataDev = devTestData.searchValuesFilterTableListCustomerPositif;
const qaTestData = JSON.parse(JSON.stringify(require('../../../data/qa/dataQa.json')));
const dataQa = qaTestData.searchValuesFilterTableListCustomerPositif
import { ReportingApi } from '@reportportal/agent-js-playwright';


test('Menampilkan list customer filter by nomor layanan dengan data valid', async ({browserName,page},testInfo)=>{
    ReportingApi.setTestCaseId('TS-UI-INDRI-LISTCUSTOMER-010');
    ReportingApi. setDescription(`
        Test Step :
        1. Visit ke wakanda
        2. Login dengan kredensial valid
        3. Pilih menu Search Customer
        4. Pada dropdown filter, pilih tipe value ID
        5. Input ID 1 pada kolom kata kunci
        6. Klik button icon Search
        7. Klik button icon Refresh`)
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
    const pomanager = new Pomanager(page);
    const searchcustomerpage = pomanager.getSearchCustomerPage();
    await searchcustomerpage.gotoUrl(process.env.WEB_URL)
    await searchcustomerpage.listCustomer("7",testData.noLayanan)
    await searchcustomerpage.listCustomerExpectedOption7();
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
})
