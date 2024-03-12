const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'Token is not provided'})
    }

    const [, token ] = req.headers.authorization.split(' ')

    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)

        console.log(decoded)

        req.userEmail = decoded.email

        next()
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}