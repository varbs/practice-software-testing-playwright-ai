---
name: exploring-a-feature
description: Use before writing tests for a page or feature in this repo (practicesoftwaretesting.com). Opens the live page, records what it actually does, and turns that into a list of test cases with expected results for the person to review before any code is written.
---

# Exploring a feature

Do not write test code in this skill. The output is a list for a person to review.

## Steps
1. Ask which page or feature. Read the page object, spec and test data that already exist for it, and `CORRECTIONS.md`.
2. Open the page on the live site (test id attribute is `data-test`) and record what it actually does. Do not assume behaviour from convention or from other sites:
   - controls and their test ids
   - the data it shows and the states it can be in (empty, loading, error)
   - exact message texts and where each appears (under a field or for the whole form)
   - keyboard: the real tab order, and where focus goes after submit and after an error
   - accessibility: labels, `aria-invalid`, `aria-live`, controls with no accessible name
3. Find the next free TC number for the area (search existing titles), so no id is reused.
4. Write the test cases as a table: id, title in the form `TC-<AREA>-<n> - Verify <behaviour>`, steps, expected result, priority, account, CI.
5. Group them: normal user, wrong or missing input, empty and edge cases, errors, keyboard and accessibility.
6. For each case, fill in the account column:
   - wrong-password and other failing-login cases use a made-up email, never a real account (repeated failures lock it)
   - cases that need a successful login are marked `@needs-real-browser` in the CI column (Cloudflare blocks real logins on GitHub runners, so CI skips them)
7. Mark every expected value or message that you could not confirm on the site as `VERIFY ON SITE`. Never invent error text, URLs, test ids or accounts.
8. Stop and ask the person to review the list.

## Rules
- Expected results describe what a user experiences, including what assistive technology announces (for example `aria-invalid="true"`), not how the page is built.
- If the site does not do something a convention expects (for example focus does not move to the first invalid field), write down what it really does and flag it to the person. Do not write a case that expects the missing behaviour unless the person asks for it as a known-failing check.
- One behaviour per test case.
- Add a case for the empty state and for the boundary values, if the feature has them.
- A case named after a behaviour must test that behaviour (a "rate limiting" case needs repeated attempts, not one).
