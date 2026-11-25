const { test, expect } = require('../fixtures/fixture');
const { invalidLoginScenarios } = require('../test-data/loginData');

test.describe('Normal User Flow', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto('/auth/login');
  });

  test('TC-LOGIN-1 - Verify registered customer logs in and sees their account page', async ({ loginPage, accountPage }) => {
    const { LOGIN_TEST_EMAIL , PASSWORD} = process.env;

    if (!LOGIN_TEST_EMAIL || !PASSWORD) {
      throw new Error('LOGIN_TEST_EMAIL and PASSWORD must be set in .env');
    }

    await loginPage.login(LOGIN_TEST_EMAIL, PASSWORD);
    await accountPage.verifyAccountPageIsVisible();

  });

  test('TC-LOGIN-2 - Verify "Sign-in with Google" button is displayed', async ({ loginPage }) => {
    await loginPage.verifyGoogleButtonIsVisible();
  });

  test('TC-LOGIN-3 - Verify register link navigates to registration page', async ({ loginPage, page }) => {
    await loginPage.clickRegister();
    await expect(page).toHaveURL(/\/auth\/register/);
  });

  test('TC-LOGIN-4 - Verify forgot password link navigates to reset page', async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/\/auth\/forgot-password/);
  });
});

test.describe('Login with wrong or Missing input', () => {
  test.beforeEach(async ({ loginPage }) => {
    const { LOGIN_TEST_EMAIL, PASSWORD } = process.env;
    if (!LOGIN_TEST_EMAIL || !PASSWORD) {
      throw new Error('LOGIN_TEST_EMAIL, and PASSWORD must be set in .env');
    }

    await loginPage.goto('/auth/login');
  });

  let number = 5;

  for (const scenario of invalidLoginScenarios) {
    const title = `TC-LOGIN-${number++} - Verify error with ${scenario.description} `;

    test(title, async ({ loginPage }) => {
      await loginPage.login(scenario.email, scenario.password);
      await loginPage.verifyErrorMessageVisible(scenario.errorOn, scenario.expectedError);
    });
  }
});

test.describe('Keyboard and Accessibility', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto('/auth/login');
  });

  test('TC-LOGIN-18 - Verify Enter key in email field submits form', async ({ loginPage, accountPage }) => {
    const { LOGIN_TEST_EMAIL, PASSWORD } = process.env;
    if (!LOGIN_TEST_EMAIL || !PASSWORD) {
      throw new Error('LOGIN_TEST_EMAIL and PASSWORD must be set in .env');
    }

    await loginPage.emailInput.fill(LOGIN_TEST_EMAIL);
    await loginPage.passwordInput.fill(PASSWORD);
    await loginPage.pressEnterInEmail();
    await accountPage.verifyAccountPageIsVisible();
  });

  test('TC-LOGIN-19 - Verify Enter key in password field submits form', async ({ loginPage, accountPage }) => {
    const { LOGIN_TEST_EMAIL, PASSWORD } = process.env;
    if (!LOGIN_TEST_EMAIL || !PASSWORD) {
      throw new Error('LOGIN_TEST_EMAIL and PASSWORD must be set in .env');
    }

    await loginPage.emailInput.fill(LOGIN_TEST_EMAIL);
    await loginPage.passwordInput.fill(PASSWORD);
    await loginPage.pressEnterInPassword();
    await accountPage.verifyAccountPageIsVisible();
  });

  test('TC-LOGIN-20 - Verify email field has associated label', async ({ loginPage }) => {
    await loginPage.verifyEmailLabelExists();
  });

  test('TC-LOGIN-21 - Verify password field has associated label', async ({ loginPage }) => {
    await loginPage.verifyPasswordLabelExists();
  });

  test('TC-LOGIN-22 - Verify form error has aria-live for screen readers', async ({ loginPage }) => {
    await loginPage.login('unregistered_customer@example.com', 'wrongPassword!');
    await loginPage.verifyErrorHasAriaLive();
  });

  test('TC-LOGIN-23 - Verify focus moves to first invalid field on error', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.verifyFocusOnFirstError();
  });

  test('TC-LOGIN-24 - Verify tab order through all interactive elements', async ({ loginPage }) => {
    await loginPage.tabThroughFields();
  });
});

