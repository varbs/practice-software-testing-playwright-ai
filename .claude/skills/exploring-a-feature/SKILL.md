---
name: exploring-a-feature
description: Use before writing tests for a page or feature in this repo. Turns what the page shows into a list of test cases with expected results, for the person to review before any code is written.
---

# Exploring a feature

Do not write test code in this skill. The output is a list for a person to review.

## Steps
1. Ask which page or feature, and read the page object and test that already exist for it.
2. List what the page has: controls, the data it shows, and the states it can be in (empty, loading, error).
3. Write the test cases as a table: id, title in the form `TC-<AREA>-<n> - Verify <behaviour>`, steps, expected result, priority.
4. Group them: normal user, wrong or missing input, empty and edge cases, errors.
5. Mark every expected value or message that you could not confirm as 'verify on the site'. Never invent error text.
6. Stop and ask the person to review the list.

## Rules
- Expected results describe what a user sees, not how the page is built.
- One behaviour per test case.
- Add a case for the empty state and for the boundary values, if the feauture has them.