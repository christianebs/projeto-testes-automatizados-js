const Email = require('../../../src/utils/email-validator');

describe('Email Validator tests', () => {
    test('should return false for empty email', () => {
        const isValid = Email.isValid('');
        expect(isValid).toBe(false);
    });

    test('should return false for invalid email format', () => {
        const isValid = Email.isValid('invalid-email.com');
        expect(isValid).toBe(false);
    });

    test('should return true for valid email format', () => {
        const isValid = Email.isValid('valid.email@example.com');
        expect(isValid).toBe(true);
    });
});
