import asyncHandler from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"

const CreateShortUrl = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;

    if (!req.user) {
        throw new ApiError(401, "Please login first");
    }

    if (!originalUrl?.trim()) {
        throw new ApiError(400, "Please enter URL");
    }

    const shortCode = nanoid(12);

    const url = await Url.create({
        originalUrl,
        shortCode,
        clicks: 0,
        createdBy: req.user._id
    });

    const shortUrl =
        `${req.protocol}://${req.get("host")}/${shortCode}`;

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                ...url.toObject(),
                shortUrl
            },
            "Short URL generated successfully"
        )
    );
});

export {CreateShortUrl }