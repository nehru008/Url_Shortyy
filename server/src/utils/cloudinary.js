import ApiError from "./ApiError.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
});

export const uploadOnCloudinary = async (file) => {
    try {
        if (!file) {
            throw new ApiError(400, "File is empty");
        }

        const response = await cloudinary.uploader.upload(file, {
            resource_type: "image",
        });

        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        return response;

    } catch (error) {

        if (file && fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        throw new ApiError(500, "Profile upload failed");
    }
};