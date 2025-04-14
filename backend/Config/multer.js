const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/") // dossier de stockage
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname) //nom unique
    }
})

const upload = multer({ storage: storage })

module.exports = upload