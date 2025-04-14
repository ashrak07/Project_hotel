// const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    let token
    let authHeader = req.headers.Authorization || req.headers.authorization
    console.log("authHeader ====>", authHeader)

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401)
                    throw new Error(" User is not authorized")
                }
                console.log("decoded =====>", decoded)
                req.user = decoded.user
                console.log("*********", req.user)
                next()
            })
        } else {
            console.log("tsisy token")
        }

        if (!token) {
            res.status(401)
            throw new Error("User is not authorized or missing token")
        }
    } else {
        console.log('no request header')
    }
}
module.exports = validateToken