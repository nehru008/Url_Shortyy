
import mongoose , {Schema} from "mongoose";
import ApiError from "../utils/ApiError.js";
import bcrpt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,

    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
    },
    urlHistory:[{
        type: Schema.Types.ObjectId,
        ref:"Url",
    }]
    
},
{timestamps:true}
)


UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: proceess.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

UserSchema.methods.generateRefreshToken = async function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: proceess.env.REFRESH_TOKEN_EXPIRY,
        }
    );
}


export const User = mongoose.model("User",UserSchema)