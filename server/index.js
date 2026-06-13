import "./src/config/env.js";
import mongoose from "mongoose";
import connectDB from "./src/db/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 8032

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Server connection failed:", error);
    });

    
