---
name: writing-playwright-tests
description: Use when writing or extending Playwright tests in this repo (practicesofwaretesting). Follows the Page Object Model, test-id locators, .env credentials, data-driven scenarios and the TC title format.
---

# Writing Playwright tests

Read `CLAUDE.md` and `CORRECTIONS.md` first. The corrections are mistakes already made once.

## Steps
1. Check `pages/` for an existing page object. Add new locators and `verify...` methods to the page object, never to the spec. Create a new page object (extending `BasePage`) only for a new page, and register it in `fixtures/fixture.js`.
2. Import `test` and `expect` from `../fixtures/fixture`, not from `@playwright/test`.
3. Locators: `getByTestId(...)` first (the config sets `testIdAttribute`), then `getByRole`. Never `page.locator('[data-test=...]')`, never XPath.
4. Credentials and URLs come from `.env` (through `test-data/credentials.js` or `process.env`). Never type an email, username or password in a test or in test data.
5. Several inputs for one behavior: put the list in `test-data/` and loop over it with `for (const scenario of scenarios)`. Each test title must be unique, so include the scenario in the title.
6. Title format: `TC-<AREA>-<n> - Verify <expected behavior>`. Data-driven tests still need the TC number.
7. Assert a user-visible outcome with web-first assertions (`await expect(locator)...`). No `waitForTimeout`. Tests must not depend on each other.
8. A spec file never uses `this`. Inside a test, use the `page` fixture or call a page object method. `this.page` belongs only inside page object classes.
9. Page object actions take parameters, so one method serves every scenario, for example `login(email, password)`. Put assertions in `verify...` methods in the page object. Document parameters with JSDoc and `// @ts-check`, and list allowed values as a union, for example `{'email' | 'password' | 'form'}`.
10. Wrong or missing input: each scenario in `test-data/` holds the input, the expected message and where it appears (`errorOn`). The test loops over the scenarios with no `if` inside. The page object picks the locator from a lookup list keyed by `errorOn`.
11. Assertions: `toHaveText` or `toContainText` for messages, and `toHaveValue` only for the value of an input. `toHaveURL` takes a regex when the URL may carry a query or hash. A relative string such as '/auth/register' needs `baseURL` in the config and must match the whole URL.
12. Put a shared starting step in `test.beforeEach` at the top of its `describe`, and do not repeat it inside each test. Never use `beforeAll` for page steps.
13. Required `.env` values: check them at the start of `beforeEach` and `throw new Error('A, B and C must be set in .env')`, listing every variable the tests use, spelled exactly as in `.env`. Do not `test.skip`, because a skip hides a broken setup.
14. Never invent error text, URLs, test ids or accounts. Put `VERIFY ON SITE` where a value is not confirmed on the live site, and tell the person which values need checking.
15. Use the next free TC number in the file. Titles must be unique and have no trailing spaces.

## Practice Software Testing facts
- Relative paths like `/auth/login` need `BASE_URL` from `.env`, set as `baseURL` in the config.
- Error messages can appear in different places (under the email field, under the password field, or in one message for the whole form), so use `errorOn` in the test data.
- Confirm the test-id attribute, the account emails and the exact messages on the live site before asserting them.

## Before you say it is done
- Run the file: `npx playwright test tests/<file>.spec.js`
- Check flakiness: add `--repeat-each=3`
- For important tests, break the behavior on purpose (change an expected value) and confirm the test fails, then change it back.
- Scan the spec: no `this.` outside page objects, no duplicate titles, no hard-coded credentials.
- If a mistake in your own output was found and fixed, add one line to `CORRECTIONS.md`.



