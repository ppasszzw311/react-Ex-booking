import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getHotelRooms, getRoom, updatedRoom } from '../RoutesController/rooms.js';

const router = express.Router();

// 創建一個room
router.post("/:hotelid", createRoom)

// 更改一個room
router.put("/:id", updatedRoom);

// 刪除一個room
router.delete('/:hotelid/:id', deleteRoom);

// 查詢一個room
router.get("/:id", getRoom)

// 查詢所有room
router.get("/", getAllRooms)

// 依旅館查詢所有房間
router.get("/findHotel/:hotelid", getHotelRooms)

export default router;