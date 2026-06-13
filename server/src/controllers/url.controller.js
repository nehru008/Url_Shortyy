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
        throw new ApiError(400, "Please enter a valid URL");
    }

    const shortCode = nanoid(12);

    const url = await Url.create({
        originalUrl,
        shortCode,
        clicks: 0,
        createdBy: req.user._id
    });

    const shortUrl = `${req.protocol}://${req.get("host")}/api/v1/url/${shortCode}`;

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                _id: url._id,
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                shortUrl,
                clicks: url.clicks,
                createdAt: url.createdAt
            },
            "Short URL generated successfully"
        )
    );
});

const redirectUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;

    if (!shortCode) {
        throw new ApiError(400, "Invalid request");
    }

    const url = await Url.findOne({
        shortCode
    });

    if (!url) {
        throw new ApiError(404, "Invalid URL");
    }

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
});

export {CreateShortUrl , redirectUrl}