import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Url } from "../models/url.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const LoginUser = asyncHandler(async (req,res)=>{

    let { username, email, password } = req.body;

    username = username?.trim();
    email = email?.trim();

    if (!(username || email)) {
        throw new ApiError(
            400,
            "Username or email is required"
        );
    }

    if (!password?.trim()) {
        throw new ApiError(
            400,
            "Password is required"
        );
    }

    const user = await User.findOne({
        $or:[{email?,username}]
    })

    const OriginalPassword = 
})

const RegisterUser = asyncHandler(async (req, res) => {

    const { username, fullName, email, password } = req.body;

    if (
        [username, fullName, email, password]
            .some(field => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const isExisted = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (isExisted) {
        throw new ApiError(400, "Email or Username already exists");
    }

    const avatarLocalProfile =
        req.files?.profile?.[0]?.path;

    if (!avatarLocalProfile) {
        throw new ApiError(400, "Profile picture is required");
    }

    const file =
        await uploadOnCloudinary(avatarLocalProfile);

    if (!file) {
        throw new ApiError(400, "File upload failed");
    }

    const user = await User.create({
        username,
        fullName,
        email,
        password,
        profile: file.secure_url
    });

    return res.status(201).json({
        success: true,
        message: "Registration successful",
        user
    });
});

const LogOutUser = asyncHandler(async (req,res)=>{
    
})

const ChangePassword = asyncHandler(async (req,res)=>{

})

const UpdateAccountDetails = asyncHandler(async (req,res)=>{
    
})

const getUrlHistory = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Please login first");
    }

    const history = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "urls",
                localField: "urlHistory",
                foreignField: "_id",
                as: "urlHistory",
                pipeline: [
                    {
                        $project: {
                            originalUrl: 1,
                            shortCode: 1,
                            clicks: 1,
                            createdAt: 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                urlHistory: 1
            }
        }
    ]);

    if (!history.length) {
        throw new ApiError(404, "User not found");
    }

    if (!history[0].urlHistory.length) {
        throw new ApiError(404, "History is empty");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            history[0].urlHistory,
            "History fetched successfully"
        )
    );
});

export {LogOutUser , LoginUser , RegisterUser , ChangePassword , UpdateAccountDetails , getUrlHistory }