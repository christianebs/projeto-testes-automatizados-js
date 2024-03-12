const SessionService = require('../services/session-service')
const UserService = require('../services/user-service')
const Email = require('../utils/email-validator')

class SessionController {
    static async create(req, res) {
        try {
            const { email, password } = req.body
    
            if(!Email.isValid(email)) {
                throw { status: 400, message: 'Email inválido'}
            }
            
            if(!password) {
                throw { status: 400, message: 'Senha inválida'}
            }

            if(!await UserService.userExistsAndCheckPassword({ email, password })) {
                throw { status: 404, message: 'Usuário não encontrado' }
            }
    
            const token = await SessionService.generateToken({ email })

            console.log('Token: ',token)
            return res.status(200).json({ token })
        } catch (error) {
            return res.status(error.status || 500).json(error.message || 'Server Error')
        }
    }
}

module.exports = SessionController