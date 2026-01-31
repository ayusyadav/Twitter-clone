import path from "path";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const PORT = process.env.PORT || 5000
const app = express();
const __dirname = path.resolve();



app.use(express.json({ limit: "5mb" })); // to parse json data
// limit should be high enough to upload images
//but not too high to avoid memory overflow or DOS(denial of service) attacks or server overload
app.use(express.urlencoded({ extended: true })); // to parse url encoded data (urlencoded)
app.use(cookieParser()); // to parse cookie data


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get(/^(?!\/api).+/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
})


// mongoDB
//username: ayushy25012006_db_user
//password: O5obVEHzWWoAePd4