import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Url } from "../models/url.model.js";

const LoginUser = asyncHandler(async (req,res)=>{

})

const RegisterUser = asyncHandler(async (req,res)=>{
    
})

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