const asyncHandler = require("express-async-handler");
const Booking = require("../Models/bookingModel");

const booking = asyncHandler(async (req, res) => {
  const {
    roomId,
    userId,
    customerName,
    customerEmail,
    checkInDate,
    checkOutDate,
  } = req.body;
  console.log("request==>", req.body);

  const existingReservation = await Booking.findOne({
    room: roomId,
    $or: [
      {
        checkInDate: {
          $lt: checkOutDate,
        },
        checkOutDate: {
          $gt: checkInDate,
        },
      },
    ],
  });
  if (existingReservation) {
    res.status(400);
    throw new Error(" Room already reserved for this period ");
  }
  const book = new Booking({
    room: roomId,
    user: userId,
    customerName,
    customerEmail,
    checkInDate,
    checkOutDate,
  });
  await book.save();

  res.status(200).json({
    message: " reservation done ",
    data: book,
  });
});

const checkReservation = asyncHandler(async (req, res) => {
  console.log("--- invoking checkReservation ---");

  const { room, checkInDate, checkOutDate } = req.body;
  console.log("request body : ", req.body);

  const existingReservation = await Booking.findOne({
    room,
    $or: [
      {
        checkInDate: {
          $lt: checkOutDate,
        },
        checkOutDate: {
          $gt: checkInDate,
        },
      },
    ],
  });
  console.log("existing reservation:", existingReservation);

  if (existingReservation) {
    console.log("Room already reserved for this period");
    return res.status(400).json({
      message: "Room already reserved for this period",
    });
  }
  console.log("Room already is free");
  return res.status(200).json({
    message: "Room is free",
  });
});

const getReservation = asyncHandler(async (req, res) => {
  const reservation = await Booking.find()
    .populate("room", "name type price")
    .lean();
  res.status(200).json({
    message: "reservation list",
    data: reservation,
  });
});

const getReservationByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  console.log("request:", req.params);

  if (!userId) {
    return res.status(400).json({ message: "Nom d'utilisateur requis." });
  }

  const reservations = await Booking.find({ user: userId })
    .populate("room", "name type price")
    .populate("user", "firstName lastName email")
    .lean();

  if (reservations.length === 0) {
    return res
      .status(404)
      .json({ message: "Aucune réservation trouvée pour cet utilisateur." });
  }

  res.status(200).json({
    message: `Réservations pour ${userId}`,
    data: reservations,
  });
});

const cancelReservation = asyncHandler(async (req, res) => {
  console.log("-- invoking cancel reservation --");

  const id = req.params.id;
  console.log("request ==>", req.params);
  await Booking.findByIdAndDelete({ _id: id });

  // Récupérer toutes les reservations restantes
  const remainingReservations = await Booking.find();

  res.status(200).json({
    message: "reservations lists",
    data: remainingReservations,
    count: remainingReservations.length,
  });
});

module.exports = {
  booking,
  getReservation,
  cancelReservation,
  checkReservation,
  getReservationByUserId,
};
