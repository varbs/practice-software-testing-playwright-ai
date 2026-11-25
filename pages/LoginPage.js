const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');

    this.googleButton = page.getByRole('button', { name: 'Sign in with Google' });

    this.registerLink = page.getByTestId('register-link');
    this.forgotPasswordLink = page.getByTestId('forgot-password-link');

    this.errors = {
      email: page.getByTestId('email-error'),
      password: page.getByTestId('password-error'),
      form: page.getByTestId('login-error')
    }

  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickRegister() {
    await this.registerLink.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async verifyGoogleButtonIsVisible() {
    await expect(this.googleButton).toBeVisible();
    await expect(this.googleButton).toBeEnabled();
  }

  /**
   * @param {'email' | 'password' | 'form'} errorOn where the message appears
   * @param {string} message
   */
  async verifyErrorMessageVisible(errorOn, message) {
    await expect(this.errors[errorOn]).toHaveText(message);
  }

  async pressEnterInEmail() {
    await this.emailInput.press('Enter');
  }

  async pressEnterInPassword() {
    await this.passwordInput.press('Enter');
  }

  async verifyEmailLabelExists() {
    const label = this.page.locator('label[for="email"]');
    await expect(label).toBeVisible();
  }

  async verifyPasswordLabelExists() {
    const label = this.page.locator('label[for="password"]');
    await expect(label).toBeVisible();
  }

  async verifyErrorHasAriaLive() {
    // Check aria-live on the form error which has assertive
    // Field errors may not have aria-live attribute
    const formError = this.errors.form;
    await expect(formError).toHaveAttribute('aria-live', 'assertive');
  }

  async verifyFieldsMarkedInvalid() {
    await expect(this.errors.email).toBeVisible();
    await expect(this.errors.password).toBeVisible();
    await expect(this.emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(this.passwordInput).toHaveAttribute('aria-invalid', 'true');
  }

  /**
   * Real order: email -> password -> show-password toggle -> Login -> Register -> Forgot password.
   * The show-password toggle has no test id or accessible name, so it is tabbed past, not asserted.
   */
  async verifyTabOrder() {
    await this.emailInput.focus();
    await this.page.keyboard.press('Tab');
    await expect(this.passwordInput).toBeFocused();
    await this.page.keyboard.press('Tab'); // show-password toggle
    await this.page.keyboard.press('Tab');
    await expect(this.loginButton).toBeFocused();
    await this.page.keyboard.press('Tab');
    await expect(this.registerLink).toBeFocused();
    await this.page.keyboard.press('Tab');
    await expect(this.forgotPasswordLink).toBeFocused();
  }
}

module.exports = { LoginPage };