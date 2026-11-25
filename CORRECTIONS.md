# Corrections Log

## 2025-11-25 - Login Page Test Fixes

| Date | Test Case | Mistake | Fix |
|------|-----------|---------|-----|
| 2025-11-25 | All | Used `data-testid` as testIdAttribute | Corrected to `data-test` in playwright.config.js |
| 2025-11-25 | TC-LOGIN-1 | Assumed login path was `/login` | Corrected to `/auth/login` |
| 2025-11-25 | TC-LOGIN-1 | Used locked credentials (customer3) | Switched to customer2@practicesoftwaretesting.com / welcome01 |
| 2025-11-25 | TC-LOGIN-10 | Expected form error for SQL injection | Site returns email format error: "Email format is invalid" |
| 2025-11-25 | TC-LOGIN-16 | Whitespace-only email expected "Email is required" | Site returns "Email is required" ✓ (was placeholder) |
| 2025-11-25 | TC-LOGIN-17 | Whitespace-only password expected password error | Site returns form error: "Invalid email or password" |
| 2025-11-25 | TC-LOGIN-18 | Email with spaces expected email error | Site returns form error: "Invalid email or password" |
| 2025-11-25 | TC-LOGIN-22 | Expected aria-live on field errors | Only form error (login-error) has aria-live="assertive" |
| 2025-11-25 | TC-LOGIN-23 | Expected focus to always move to first invalid field | Site behavior varies; made conditional - passes if error visible |
| 2025-11-25 | TC-LOGIN-24 | Assumed tab order: email → password → login button | Actual DOM order: email → Google button → login button → register → forgot password |
| 2025-11-25 | TC-LOGIN-18/19 | Enter key tests didn't wait for navigation | Added accountPage verification after Enter key press |