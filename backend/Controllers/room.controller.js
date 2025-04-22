const Rooms = require("../Models/roomModel");
const asyncHandler = require("express-async-handler");

const createRoom = asyncHandler(async (req, res) => {
  try {
    const { name, type, price, service, bed, person, area } = req.body;
    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error("One picture at least");
    }

    // Nettoyage des espaces dans les URLs des images
    const imageUrls = req.files.map((file) => {
      return `uploads/${file.filename}`.replace(/\s+/g, ""); // Retire tous les espaces dans le chemin
    });
    const room = new Rooms({
      name,
      type,
      price,
      service,
      bed,
      person,
      area,
      images: imageUrls,
    });
    await room.save();
    res.status(200).json({
      message: "chambre ajouté",
      data: room,
    });

    console.log("request", req.body);
  } catch (error) {
    console.log(error);
  }
});

const getAllRooms = asyncHandler(async (req, res) => {
  const room = await Rooms.find().lean();
  res.status(200).json({
    message: "room lists",
    data: room,
    count: room.length,
  });
});

const getRoomById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const room = await Rooms.findById({ _id: id });
  res.status(200).json({
    data: room,
  });
});

const updateRoom = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, type, price, service } = req.body;

    const existingRoom = await Rooms.findById(id);
    if (!existingRoom) {
      res.status(400).json({ error: "Room not found" });
    }
    let images = existingRoom.images;
    console.log("existing room ==> ", existingRoom);
    console.log("images ==> ", images);
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ` /uploads/ ${file.filename} `);
    }

    const updatedRoom = await Rooms.findByIdAndUpdate(
      id,
      {
        name,
        type,
        service,
        price,
        images,
      },
      { new: true, runValidators: true }
    );
    console.log("updated room =====>", updateRoom);

    console.log("request ==>", req.body);
    res.status(200).json({
      message: "Room updated successfully",
      data: updatedRoom,
    });
  } catch (error) {
    console.error(error);
  }
});

const deleteRoomById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Rooms.deleteOne({ _id: id });

  // Récupérer toutes les rooms restantes
  const remainingRooms = await Rooms.find();

  res.status(200).json({
    message: "room lists",
    data: remainingRooms,
    count: remainingRooms.length,
  });
});

module.exports = {
  createRoom,
  deleteRoomById,
  getAllRooms,
  getRoomById,
  updateRoom,
};
