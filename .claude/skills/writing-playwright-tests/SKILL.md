---
name: writing-playwright-tests
description: Use when writing or extending Playwright tests in this repo (practicesoftwaretesting.com). Follows the Page Object Model, test-id locators, .env credentials, data-driven scenarios with fixed TC ids, the TC title format, and the CI tag for real-login tests.
---

# Writing Playwright tests

Read `CLAUDE.md` and `CORRECTIONS.md` first. The corrections are mistakes already made once.

## Structure
1. Check `pages/` for an existing page object. Add new locators and `verify...` methods to the page object, never to the spec. Create a new page object (extending `BasePage`) only for a new page, and register it in `fixtures/fixture.js`.
2. Import `test` and `expect` from `../fixtures/fixture`, not from `@playwright/test`.
3. A spec file never uses `this`. Inside a test, use the `page` fixture or call a page object method. `this.page` belongs only inside page object classes.
4. Page object actions take parameters, so one method serves every scenario, for example `login(email, password)`. Put assertions in `verify...` methods in the page object. Document parameters with JSDoc and `// @ts-check`, and list allowed values as a union, for example `{'email' | 'password' | 'form'}`.
5. Every page object method is called by at least one test. Delete helpers nobody uses.

## Locators
6. `getByTestId(...)` first (the config sets `testIdAttribute: 'data-test'`), then `getByRole`. Never `page.locator('[data-test=...]')`, never XPath.
7. Ask the person before using any other locator type (`getByLabel`, `getByText`, CSS).

## Data and accounts
8. Credentials and URLs come from `.env` through `process.env`. Never type a real email, username or password in a test or in test data.
9. Wrong-password and other failing-login scenarios use a made-up email (for example `unregistered_customer@example.com`), never `LOGIN_TEST_EMAIL` or another real account. Repeated failures lock a real account ("Account locked, too many failed attempts").
10. Several inputs for one behaviour: put the list in `test-data/` and loop over it with `for (const scenario of scenarios)`.
11. Each scenario holds its own fixed TC id. Do not number with a counter (`let number = 5; number++`): adding one scenario shifts every later id and creates duplicates.
    ```js
    { id: 'TC-LOGIN-5', description: 'empty email', email: '', password: process.env.PASSWORD, errorOn: 'email', expectedError: 'Email is required' }
    ```
    Title: `` `${scenario.id} - Verify error with ${scenario.description}` ``
12. Wrong or missing input: each scenario holds the input, the expected message and where it appears (`errorOn`). The test loops over the scenarios with no `if` inside. The page object picks the locator from a lookup list keyed by `errorOn`.
13. A scenario's description must match what it does: "rate limiting" needs repeated attempts, "valid email" needs a registered email.

## Titles
14. Format: `TC-<AREA>-<n> - Verify <expected behaviour>`. Data-driven tests still need the TC id.
15. Use the next free TC number in the area. Titles must be unique and have no trailing spaces.

## Assertions
16. Assert a user-visible outcome with web-first assertions (`await expect(locator)...`). Every test has at least one `expect`.
17. Messages: `toHaveText` or `toContainText`. `toHaveValue` only for the value of an input. Focus: `toBeFocused`. Attributes such as `aria-invalid`: `toHaveAttribute`.
18. `toHaveURL` takes a regex when the URL may carry a query or hash. A relative string such as `'/auth/register'` needs `baseURL` in the config and must match the whole URL.
19. Never:
    - wrap `expect` in `try/catch`, or put assertions behind `if (await x.isVisible())`. The test can then never fail.
    - read a value with `count()`, `textContent()` or `isVisible()` and assert on it afterwards. It does not retry.
    - use `page.evaluate` to check UI state (it cannot return DOM elements; use `toBeFocused`, `toHaveAttribute`).
    - use `waitForTimeout` or `waitForLoadState('networkidle')`. Wait for the outcome instead (URL or element).
    - leave `console.log` or debug code in page objects or specs.

## Setup
20. Put a shared starting step in `test.beforeEach` at the top of its `describe`, and do not repeat it inside each test. Never use `beforeAll` for page steps.
21. Required `.env` values: check them at the start of `beforeEach` and `throw new Error('A, B and C must be set in .env')`, listing every variable the tests in that `describe` use, spelled exactly as in `.env`. Do not `test.skip`, because a skip hides a broken setup.
22. Tests that need a successful login get `{ tag: '@needs-real-browser' }`. Cloudflare blocks real logins on GitHub runners, so CI runs `--grep-invert @needs-real-browser`. These tests still run locally.
23. Tests must not depend on each other or on leftover state.

## Practice Software Testing facts
- Relative paths like `/auth/login` need `BASE_URL` from `.env`, set as `baseURL` in the config.
- Error messages can appear under the email field, under the password field, or as one message for the whole form, so use `errorOn` in the test data.
- Login page tab order: email → password → show-password toggle (no test id or name) → Login → Register → Forgot password.
- After an empty submit, focus stays on the Login button; both inputs get `aria-invalid="true"`.
- Never invent error text, URLs, test ids or accounts. Put `VERIFY ON SITE` where a value is not confirmed on the live site, and tell the person which values need checking.

## Before you say it is done
- Run the file: `npx playwright test tests/<file>.spec.js`
- Run what CI runs: `npx playwright test --grep-invert @needs-real-browser`
- Check flakiness: add `--repeat-each=3`
- `npx playwright test --list` and confirm there are no duplicate TC ids.
- For important tests, break the behaviour on purpose (change an expected value) and confirm the test fails, then change it back.
- Scan the spec: no `this.` outside page objects, no duplicate titles, no hard-coded credentials, nothing from the "Never" list.
- If a mistake in your own output was found and fixed, add one line to `CORRECTIONS.md`.
