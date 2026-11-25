# Playwright Tests for Practice Software Testing

Automated test suite for the public practice shop at [practicesoftwaretesting.com](https://practicesoftwaretesting.com).

## 🎯 Project Overview

This repository contains end-to-end tests built with **Playwright** and **Page Object Model** for the practice e-commerce site. The tests cover login functionality with plans to expand to other features.

## 🏗️ Tech Stack

- **Language**: JavaScript (CommonJS)
- **Test Framework**: @playwright/test
- **Architecture**: Page Object Model (POM)
- **Test Data**: Data-driven scenarios in `test-data/`
- **Fixtures**: Custom fixtures for page object injection
- **Environment**: `.env` for credentials and URLs

## 📁 Project Structure

```
├── pages/                    # Page Object classes
│   ├── BasePage.js          # Base class with common methods
│   ├── LoginPage.js         # Login page interactions
│   └── AccountPage.js       # Account page verification
├── fixtures/
│   └── fixture.js           # Test fixtures (page objects, test data)
├── tests/
│   └── login.spec.js        # Login test specifications
├── test-data/
│   └── loginData.js         # Data-driven test scenarios
├── utils/
│   └── api.js               # API helper functions
├── playwright.config.js     # Playwright configuration
├── .env.example             # Environment variable template
├── .env                     # Local environment (gitignored)
├── CORRECTIONS.md           # Log of test fixes and learnings
└── package.json
```

## ✨ Features Tested

### Login Page (`/auth/login`)

| Area | Test Cases | Description |
|------|------------|-------------|
| **Normal User Flow** | TC-LOGIN-1 to TC-LOGIN-4 | Valid login, Google button visibility, register/forgot password navigation |
| **Wrong/Missing Input** | TC-LOGIN-5 to TC-LOGIN-18 | Empty fields, invalid formats, unregistered users, SQL injection, edge cases |
| **Keyboard & Accessibility** | TC-LOGIN-18 to TC-LOGIN-24 | Enter key submission, label association, aria-live, focus management, tab order |

**Total: 25 test cases** (14 data-driven scenarios + 11 standalone tests)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
npx playwright install
```

### Environment Setup
```bash
cp .env.example .env
# Edit .env with your credentials
```

Required `.env` variables:
```env
BASE_URL=https://practicesoftwaretesting.com
API_URL=https://api.practicesoftwaretesting.com
CUSTOMER_EMAIL=your_email@example.com
PASSWORD=your_password
```

## 🏃 Running Tests

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests |
| `npx playwright test tests/login.spec.js` | Run login tests only |
| `npx playwright test --repeat-each=3` | Run each test 3 times (flakiness check) |
| `npx playwright test --headed` | Run with browser visible |
| `npx playwright test --grep-invert @needs-real-browser` | What CI runs: skips tests tagged `@needs-real-browser` (successful login is blocked by Cloudflare on GitHub runners, so run those locally) |
| `npx playwright test --debug` | Debug mode with Playwright Inspector |
| `npx playwright show-report` | View HTML report |

## 📝 Test Conventions

### Test Titles
Format: `TC-<AREA>-<N> - Verify <expected behaviour>`

Examples:
- `TC-LOGIN-1 - Verify registered customer logs in and sees their account page`
- `TC-LOGIN-5 - Verify error with empty email`

### Locators
- **Primary**: `getByTestId('data-test-value')` — uses `testIdAttribute: 'data-test'`
- **Secondary**: `getByRole()`, `getByLabel()`
- **Avoid**: XPath, CSS selectors, fixed waits (`waitForTimeout`)

### Assertions
- Web-first assertions only (`expect(locator).toBeVisible()`)
- Every test asserts a user-visible outcome
- Tests are independent (no shared state)

## 🔧 Configuration Highlights

**playwright.config.js**:
```javascript
testIdAttribute: 'data-test',  // Not 'data-testid'
projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
retries: 1,
```

## 📊 Test Data Strategy

Data-driven tests in `test-data/loginData.js`:
```javascript
{
  description: 'empty email',
  email: '',
  password: process.env.PASSWORD,
  errorOn: 'email',
  expectedError: 'Email is required'
}
```

Reused via loop in `tests/login.spec.js`:
```javascript
for (const scenario of invalidLoginScenarios) {
  test(`TC-LOGIN-${number++} - Verify error with ${scenario.description}`, ...)
}
```

## 🐛 Debugging

- **Trace viewer**: `npx playwright show-trace trace.zip`
- **Console logs**: Added in page objects for error visibility debugging
- **Screenshots**: Auto-captured on failure (configured in playwright.config.js)

## 📋 CORRECTIONS.md

See [CORRECTIONS.md](CORRECTIONS.md) for a log of all test fixes, including:
- Test ID attribute correction (`data-test` vs `data-testid`)
- Login path correction (`/auth/login`)
- Credential rotation due to account lockout
- Error message corrections based on actual site behavior
- Accessibility behavior variations (focus, aria-live, tab order)

## 🤝 Contributing

1. Read `CLAUDE.md` for project rules
2. Check `CORRECTIONS.md` before making similar fixes
3. Follow test title convention: `TC-<AREA>-<N> - Verify <behaviour>`
4. Use data-driven approach for similar test cases
5. Never hardcode credentials or URLs
6. Run with `--repeat-each=3` before committing

## 📄 License

MIT — Practice project for learning Playwright.