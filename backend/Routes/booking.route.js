const express = require("express");
const {
  booking,
  getReservation,
  cancelReservation,
  checkReservation,
  getReservationByUserId,
} = require("../Controllers/booking.controller");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/booking", validateToken, booking);

router.post("/booking/check", checkReservation);

router.get("/booking/all", validateToken, getReservation);

router.get("/booking/:userId", validateToken, getReservationByUserId);

router.delete("/booking/:id", cancelReservation);

module.exports = router;
