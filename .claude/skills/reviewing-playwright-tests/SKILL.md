---
name: reviewing-playwright-tests
description: Use when reviewing Playwright tests or page objects in this repo (practicesoftwaretesting.com), before committing, or when a test passes but you do not trust it.
---

# Reviewing Playwright tests (practicesoftwaretesting.com)

Read the changed files, `CLAUDE.md` and `CORRECTIONS.md`. Report findings as a list, most serious first. Say which file and line each one is in. Do not rewrite the code unless asked.

## Check each item
1. **Rules from CLAUDE.md:** `getByTestId` or `getByRole` only (other locator types need the person's OK). No XPath. No `waitForTimeout`. Credentials and base URL from `.env`, none hard-coded. Title format `TC-<AREA>-<n> - Verify <behaviour>`.
2. **Structure:** locators and `verify...` methods live in page objects. Specs import from `fixtures/fixture`. Test data lives in `test-data/`.
3. **Can it fail?** Every test has at least one `expect` on a user-visible outcome. Flag:
   - a test with no `expect`
   - `expect` inside `try/catch`, or behind `if (await x.isVisible())`
   - an assertion on something that is always true
   - a count checked loosely when the exact number is known
   - a name that promises more than the test does ("rate limiting" with one attempt, "valid email" with an unregistered one)
4. **Assertions:** web-first (`await expect(locator)`). Reading a value with `count()`, `textContent()`, `isVisible()` or `page.evaluate` and then asserting on it will not retry. No `waitForLoadState('networkidle')`.
5. **TC ids:** run `npx playwright test --list` and check for duplicate ids. Data-driven ids should come from the test data, not a counter.
6. **Data:** do expected messages match the live site? Do two files disagree? Mark anything unconfirmed as `VERIFY ON SITE`.
7. **Accounts:** failing-login scenarios use made-up emails, never a real account (repeated failures lock it). Required `.env` variables are checked in `beforeEach` with the exact names used.
8. **CI:** tests that need a successful login are tagged `@needs-real-browser` (Cloudflare blocks them on GitHub runners). Nothing else is excluded from CI without a reason.
9. **Independence:** no test relies on another one running first or on leftover state.
10. **Empty and edge cases:** empty fields, whitespace, boundary lengths, locked account.
11. **Page object methods:** every method is used by a test. A method nobody calls can be broken without anyone knowing.
12. **Tidiness:** leftover `console.log` or debug code, unused imports, stray comments, missing `// @ts-check`, wrong JSDoc types, typos or trailing spaces in titles.

## Output
- A short list of findings with severity: **bug**, **weak test**, or **cleanup**.
- What was good, in one or two lines.
- Say plainly whether you ran the tests. Reading the code is not the same as running it.
- Separate findings that need the person's decision from ones you can fix directly.
- If a finding is a mistake in Claude's own earlier output, add one line to `CORRECTIONS.md` once it is fixed.
