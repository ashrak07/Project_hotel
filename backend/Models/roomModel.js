const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    service: [
      {
        type: String,
      },
    ],
    bed: {
      type: Number,
    },
    person: {
      type: Number,
    },
    area: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rooms", roomSchema);
