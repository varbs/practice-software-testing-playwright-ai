const { expect } = require('@playwright/test');

const { BasePage } = require('./BasePage');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = page.getByTestId('page-title');
  }

  async verifyAccountPageIsVisible(){
    await expect(this.page).toHaveURL('/account');
    await expect(this.pageTitle).toBeVisible();
  }
}

module.exports = { AccountPage };