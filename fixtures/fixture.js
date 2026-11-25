const { test: baseTest } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AccountPage } = require('../pages/AccountPage');
const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  }
});

module.exports = { test, expect: baseTest.expect };