const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
