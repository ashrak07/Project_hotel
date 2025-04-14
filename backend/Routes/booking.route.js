const express = require("express")
const { booking, getReservation, cancelReservation } = require("../Controllers/booking.controller")

const router = express.Router()

router.post("/booking", booking)

router.get("/booking/all", getReservation)

router.delete("/booking/:id", cancelReservation)

module.exports = router