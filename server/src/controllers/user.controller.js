import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Url } from "../models/url.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken =
            user.generateAccessToken();

        const refreshToken =
            user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({
            validateBeforeSave: false,
        });

        return {
            accessToken,
            refreshToken,
        };

    } catch (error) {
        console.error(error);
        throw error;
    }
};

const RefreshAccessToken = asyncHandler(
    async (req, res) => {

        const incomingRefreshToken =
            req.cookies?.refreshToken;

        if (!incomingRefreshToken) {
            throw new ApiError(
                401,
                "Unauthorized access"
            );
        }

        const decodedToken =
            jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );

        const user = await User.findById(
            decodedToken?._id
        );

        if (!user) {
            throw new ApiError(
                404,
                "User not found"
            );
        }

        if (
            incomingRefreshToken !==
            user.refreshToken
        ) {
            throw new ApiError(
                401,
                "Invalid refresh token"
            );
        }

        const newAccessToken =
            user.generateAccessToken();

        const options = {
            httpOnly: true,
            secure:
                process.env.NODE_ENV ===
                "production"
        };

        return res
            .status(200)
            .cookie(
                "accessToken",
                newAccessToken,
                options
            )
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken:
                            newAccessToken
                    },
                    "Access token refreshed successfully"
                )
            );
    }
);

const LoginUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    if (!username && !email) {
        throw new ApiError(
            400,
            "Please provide username or email"
        );
    }

    const user = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (!user) {
        throw new ApiError(
            404,
            "User does not exist"
        );
    }

    const isPasswordValid =
        await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Invalid credentials"
        );
    }

    const {
        accessToken,
        refreshToken
    } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User
        .findById(user._id)
        .select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure:
            process.env.NODE_ENV === "production"
    };

    return res
        .status(200)
        .cookie(
            "accessToken",
            accessToken,
            options
        )
        .cookie(
            "refreshToken",
            refreshToken,
            options
        )
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});
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

const LogOutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User Logged Out Successfully!!"
            )
        );
});

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