import { errorMessage } from "../errorMessage.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)
    try {
        const saveRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: saveRoom._id}})
        } catch (error) {
            next(errorMessage(500, "找不到hotel id 無法上傳room 更新"))
        }
        res.status(200).json(saveRoom)
    } catch (error) {
        next(errorMessage(500, "room的上傳失敗，可能為格式錯誤"))
    }
}

export const updatedRoom = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const updateRoom = await Room.findByIdAndUpdate(id, {$set:body}, {new:true});
        res.status(200).json(updateRoom)
    } catch (error) {
        next(errorMessage(500, "資料上傳請確認格式"))
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelid = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelid, {$pull: {room: req.params.id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json("資料刪除成功")
    } catch (error) {
        next(errorMessage(500, "刪除失敗，找不到其ID"))
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id);
        res.status(200).json(getRoom)
    } catch (error) {
        next(errorMessage(500, "資料上傳請確認格式"))
    }
}

export const getAllRooms = async (req, res, next) => {
    try {
        const roomList = await Room.find();
        res.status(200).json(roomList)
    } catch (error) {
        next(errorMessage(500, "無法抓取所有飯店資料"))
    }
}

export const getHotelRooms = async (req, res, next) => {
    const gethotel = req.params.hotelid;
    try {
        const hotelData = await Hotel.findById(gethotel)
        try {
            const roomsList = await Promise.all(hotelData.rooms.map(roomId => {
                return Room.findById(roomId)
            }))
            res.status(200).json(roomsList)
        } catch (error) {
            next(errorMessage(500, "發生錯誤，找尋房間時發生錯誤"))
        }
    } catch (error) {
        next(errorMessage(500, "找不到hotel id 無法查看rooms"))
    }
}