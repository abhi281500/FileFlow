import mongoose from "mongoose";

const fileschema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String, 
        required: true
    },
    publicId: {
        type: String, 
        required: true
    },
    size: Number,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
}, { timestamps: true });

export const File = mongoose.model("File",fileschema)