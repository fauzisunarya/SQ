import {expect } from '@playwright/test';

export default class LoginPage{
    /**
     * @param {import('@playwright/test').Page} page
    */
   constructor(page){
    this.page = page;
    this.usernameField = page.getByRole('textbox', { name: 'User code or email' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
   }

   async gotoUrl(url){
    await this.page.goto(url);
   }

   async login(username,password){
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
    await this.loginBtn.click();
   }

   async loginExpectSucces(){
      await expect(this.page.getByRole('navigation')).toContainText('Dashboard');
   }

   async loginExpectFailed(){
      await expect(this.page.getByRole('alert')).toContainText('Username and password mismatch.');
   }

   async loginExpectUsernameInvalid(){
      await expect(this.page.getByRole('alert')).toContainText('Please input a valid username.');
   }
}
