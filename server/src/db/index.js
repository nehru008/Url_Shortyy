import mongoose from "mongoose";


const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        
        console.log(`mongoDB connected Successfully ${connect.connection.host}`);
        
    } catch (error) {
        console.log("mongoDB Connection failed",error)
        process.exit(1); // Error / Failure
    }

}

export default connectDB