import ApiError from "./ApiError.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
};

cloudinary.config({
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret
});

export const uploadOnCloudinary = async (file) => {
    try {
        if (!file) {
            throw new ApiError(400, "File is empty");
        }

        const missingKeys = Object.entries(cloudinaryConfig)
            .filter(([, value]) => !value)
            .map(([key]) => key);

        if (missingKeys.length) {
            throw new ApiError(
                500,
                `Cloudinary config missing: ${missingKeys.join(", ")}`
            );
        }

        const response = await cloudinary.uploader.upload(file, {
            resource_type: "image",
        });

        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        return response;

    } catch (error) {

        console.error("Cloudinary Error:", {
            message: error.message,
            http_code: error.http_code,
            name: error.name,
        });

        if (file && fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        throw new ApiError(error.statusCode || error.http_code || 500, error.message);
    }
};
