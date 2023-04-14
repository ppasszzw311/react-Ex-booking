import { errorMessage } from "../errorMessage.js";
import Hotel from "../models/Hotel.js";

export const createHotel = async(req,res,next)=>{ //新增next
    const newHotel = new Hotel(req.body) 
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        next(errorMessage(500,"資料上傳錯誤請確認格式")) //後來我們想要客製化的
    }
}

export const getHotel = async(req, res, next) => {
    const id = req.params.id;
    try {
        const getHotel = await Hotel.findById(id);
        res.status(200).json(getHotel)
    } catch (error) {
        next(errorMessage(500, "資料上傳請確認格式"))
    }
}

export const getAllHotel = async(req ,res , next) => {
    try {
        const hotelList = await Hotel.find();
        res.status(200).json(hotelList);
    } catch (error) {
        next(errorMessage(500, "無法抓取所有飯店資料"))
    }
}

export const editHotel = async(req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id, {$set:body}, {new:true})
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(errorMessage(500, "資料上傳請確認格式"))
    }
}

export const deleteHotel = async(req, res, next) => {
    const id = req.params.id;
    try {
        await Hotel.findByIdAndDelete(id)
        res.status(200).json("刪除資料成功")
    } catch (error) {
        next(errorMessage(500, "資料上傳請確認格式"))
    } 
}