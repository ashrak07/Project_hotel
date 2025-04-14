const express = require("express");
const upload = require("../Config/multer");
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoomById,
} = require("../Controllers/room.controller");

const router = express.Router();

router.post("/room/", upload.array("images", 5), createRoom);

router.post("/room/:id", deleteRoomById);

router.get("/room/all", getAllRooms);

router.get("/room/:id", getRoomById);

router.put("/room/:id", upload.array("images", 5), updateRoom);

module.exports = router;
