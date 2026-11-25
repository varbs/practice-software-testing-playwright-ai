
const invalidLoginScenarios = [
    {
        id: 'TC-LOGIN-5',
        description: 'empty email',
        email: '',
        password: process.env.PASSWORD,
        errorOn: 'email',
        expectedError: 'Email is required'
    },
    {
        id: 'TC-LOGIN-6',
        description: 'empty password',
        email: process.env.NEGATIVE_TEST_EMAIL,
        password: '',
        errorOn: 'password',
        expectedError: 'Password is required'
    },
    {
        id: 'TC-LOGIN-7',
        description: 'invalid email format',
        email: 'invalid_email',
        password: process.env.PASSWORD,
        errorOn: 'email',
        expectedError: 'Email format is invalid'
    },
    {
        id: 'TC-LOGIN-8',
        description: 'unregistered email',
        email: 'unregistered_customer@example.com',
        password: process.env.PASSWORD,
        errorOn: 'form',
        expectedError: 'Invalid email or password'
    },
    {
        id: 'TC-LOGIN-9',
        description: 'wrong password for valid email',
        email: 'unregistered_customer@example.com',
        password: 'wrongPassword!',
        errorOn: 'form',
        expectedError: 'Invalid email or password'

    },
    // Empty and Edge Cases
    {
        id: 'TC-LOGIN-10',
        description: 'SQL injection attempt in email',
        email: "' OR '1'='1",
        password: process.env.PASSWORD,
        errorOn: 'email',
        expectedError: 'Email format is invalid'
    },
    {
        id: 'TC-LOGIN-11',
        description: 'very long email (255+ chars)',
        email: 'a'.repeat(250) + '@example.com',
        password: process.env.PASSWORD,
        errorOn: 'email',
        expectedError: 'Email format is invalid'
    },
    {
        id: 'TC-LOGIN-12',
        description: 'very long password (128+ chars)',
        email: 'unregistered_customer@example.com',
        password: 'a'.repeat(130),
        errorOn: 'password',
        expectedError: 'Password length is invalid'
    },
    {
        id: 'TC-LOGIN-13',
        description: 'special characters in email (+.-)',
        email: 'test+user.name@example.com',
        password: process.env.PASSWORD,
        errorOn: 'form',
        expectedError: 'Invalid email or password'
    },
    {
        id: 'TC-LOGIN-14',
        description: 'special characters in password (!@#$%^&*)',
        email: 'test+user.name@example.com',
        password: 'Test!@#$%^&*()',
        errorOn: 'form',
        expectedError: 'Invalid email or password'
    },
    // Error States
    {
        id: 'TC-LOGIN-15',
        description: 'rate limiting after multiple failed attempts',
        email: 'unregistered_customer@example.com',
        password: 'wrongPassword!',
        errorOn: 'form',
        expectedError: 'Invalid email or password'
    },
    // Medium Priority - Wrong or Missing Input
    {
        id: 'TC-LOGIN-16',
        description: 'whitespace-only email',
        email: '   ',
        password: process.env.PASSWORD,
        errorOn: 'email',
        expectedError: 'Email is required'
    },
    {
        id: 'TC-LOGIN-17',
        description: 'whitespace-only password',
        email: 'unregistered_customer@example.com',
        password: '   ',
        errorOn: 'form',
        expectedError: 'Invalid email or password'
    },
    {
        id: 'TC-LOGIN-18',
        description: 'email with leading and trailing spaces',
        email: '  unregistered_customer@example.com  ',
        password: process.env.PASSWORD,
        errorOn: 'form',
        expectedError: 'Invalid email or password'
    },
];

module.exports = { invalidLoginScenarios };