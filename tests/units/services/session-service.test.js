const jwt = require('jsonwebtoken')
const SessionService = require('../../../src/services/session-service')

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}))

describe('SessionService tests', () => {
    const user = {
        email: 'test@example.com'
    }

    const secretKey = 'test_secret'
    const tokenOptions = {
        expiresIn: '30s'
    }

    beforeAll(() => {
        process.env.SECRET_KEY = secretKey
    })

    beforeEach(() => {
        jwt.sign.mockClear()
    })

    test('Should generate a token with correct payload and options', () => {
        jwt.sign.mockReturnValue('mocked_token')

        const token = SessionService.generateToken(user)

        expect(jwt.sign).toHaveBeenCalledWith({ email: user.email }, secretKey, tokenOptions)
        expect(token).toBe('mocked_token')
    })

    test('jwt.sign should be called once', () => {
        SessionService.generateToken(user)

        expect(jwt.sign).toHaveBeenCalledTimes(1)
    })
})
