
import mongoose , {Schema} from "mongoose";

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

export const User = mongoose.model("User",UserSchema)