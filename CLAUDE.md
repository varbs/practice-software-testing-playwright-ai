# Project: Playwright tests for https://practicesoftwaretesting.com (public practice shop)

## Stack and commands
- JavaScript (CommonJS), @playwright/test, Page Object Model
- Run all: `npx playwright test` | one file: `npx playwright test/login.spec.js`
- Report: `npx playwright show-report`

## Structure
- pages/ page objects (extend BasePage)
- fixtures/fixture.js registers page objects. Specs import `test` from here.
- tests/ spec | test-data/ users and products | utils/ helpers (API calls live in utils/api.js)

## Rules
- Locators: check in DevTools which attribute holds the test ids, set `testIdAttribute` in the config, then use getByTestId, then getByRole. Ask before using any other kind of locator.
- No XPath, no fixed waits (`waitForTimeout`). Use web-first assertions.
- Every test asserts a user-visible outcome. Tests are independent.
- Credentials, base URL and API URL come from .env(see .env.example). Never hardcode.
- Test titles: `TC-<AREA>-<N> - Verify <expected behaviour>`, including data-driven tests.
- Read CORRECTIONS.md before writing tests. Add one line to it for every mistake of yours that is fixed.
- Only automate this practice site, with light traffic. No load testing.
