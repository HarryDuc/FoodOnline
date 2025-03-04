import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRoutes from './routes/foodRoutes.js';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

//connect db
connectDB();

app.use("/api/food", foodRoutes)
app.use("/api/user", userRoutes)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/images",express.static('uploads'))

app.get("/", (req, res)=> {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server runing on http://localhost:${port}`);
});

////mongodb+srv://minhduccode:DXZFfxFQmw5hfCXi@cluster0.n0osb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0