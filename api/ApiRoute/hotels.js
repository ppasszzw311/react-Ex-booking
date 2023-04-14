import express from 'express';
import { errorMessage } from '../errorMessage.js';
import Hotel from "../models/Hotel.js"
import { createHotel, deleteHotel, editHotel, getAllHotel, getHotel } from '../RoutesController/hotels.js';
const router = express.Router();

// 創建資料
router.post('/', createHotel)

// 取得單筆資料
router.get('/find/:id', getHotel)

// 取得所有資料
router.get('/find', getAllHotel)

// 修改資料
router.put('/:id', editHotel)

// 刪除資料
router.delete("/:id", deleteHotel)

export default router;