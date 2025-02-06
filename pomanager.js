import LoginPage from "./loginPage";
import SearchCustomerPage from "./searchCustomerPage";

export default class Pomanager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page)
        this.searchCustomerPage = new SearchCustomerPage(this.page)
    }

    getLoginPage(){
        return this.loginPage;
    }

    getSearchCustomerPage(){
        return this.searchCustomerPage;
    }
}
