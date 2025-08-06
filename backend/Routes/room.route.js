const express = require("express");
const upload = require("../Config/multer");
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoomById,
} = require("../Controllers/room.controller");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/room/", upload.array("images", 5), createRoom);

router.post("/room/:id", deleteRoomById);

router.get("/room/all", validateToken, getAllRooms);

router.get("/room/all/rooms", getAllRooms);

router.get("/room/:id", getRoomById);

router.put("/room/:id", upload.array("images", 5), updateRoom);

module.exports = router;
