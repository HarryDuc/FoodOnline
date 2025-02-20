import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Thêm thành công" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi thêm vào" })
    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success:true, message: "Xóa món ăn"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Lỗi xóa"})
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Lỗi get Cart"})
    }
}

export { addToCart, removeFromCart, getCart }