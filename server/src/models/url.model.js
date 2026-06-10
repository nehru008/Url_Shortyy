import mongoose , {Schema} from "mongoose";

const UrlSchema = new Schema({
    originalUrl:{
        type:String,
        required:true,
    },
    shortCode:{
        type:String,
        required:true,
    },
    clicks: {
            type: Number,
            default: 0
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},
{timestamps:true}
)

export const Url = mongoose.model("Url",UrlSchema)