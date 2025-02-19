import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res)=> {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })
    try {
        await food.save();
        res.json({success:true, message: "Thêm món ăn."});
    }catch(err) {
        console.log(err)
        res.json({success:false, message:"Lỗi"})
    }
}

const listFood = async (req, res)=> {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch(err) {
        console.log(err)
        res.json({success:false, message:"Lỗi"})
    }
}
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, ()=> {

        })
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message: "Xóa món ằn."});
    } catch (err) {
        console.error(err);
        res.json({success: false, message: "Lỗi xóa món ăn"})
    }
}
export {addFood, listFood, removeFood}