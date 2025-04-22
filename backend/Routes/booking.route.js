const express = require("express");
const {
  booking,
  getReservation,
  cancelReservation,
  checkReservation,
} = require("../Controllers/booking.controller");

const router = express.Router();

router.post("/booking", booking);

router.post("/booking/check", checkReservation);

router.get("/booking/all", getReservation);

router.delete("/booking/:id", cancelReservation);

module.exports = router;
