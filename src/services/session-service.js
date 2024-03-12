const jwt = require('jsonwebtoken')

class SessionService {
    static generateToken({ email }) {
        return jwt.sign({ email }, process.env.SECRET_KEY, {
            expiresIn: '30s'
        })
    }
}

module.exports = SessionService