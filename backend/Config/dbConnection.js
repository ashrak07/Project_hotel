const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`Database connected, host ${connect.connection.host}, name ${connect.connection.name}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = { connectDB }