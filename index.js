require('dotenv').config()
const mongoose = require('mongoose')

const server = require('./src/app')

const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log('::: Mongo DB connected :::')
        server.listen(PORT, () => console.log(`App listening on PORT:::${PORT}`))
    })
