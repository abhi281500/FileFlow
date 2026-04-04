import { uploadonCloudinary } from "../config/cloudinary.config.js";
import {File} from "../models/file.models.js";
import { v2 as cloudinary } from 'cloudinary';

export const uploadFile = async (req, res) => {
    try {
        
        const allFiles = req.files || (req.file ? [req.file] : []);

        if (allFiles.length === 0) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        
        const uploadPromises = allFiles.map(async (file) => {
            const result = await uploadonCloudinary(file.path);
            return await File.create({
                fileName: file.originalname,
                fileUrl: result.url, // Cloudinary ka link
                publicId: result.public_id,   // Future mein delete karne ke liye kaam aayega
                size: file.size,    
                uploadedBy: req.user.id 
            });
        });

        const uploadedResults = await Promise.all(uploadPromises);

        
        res.status(200).json({ 
            message: "All files uploaded to Cloudinary successfully", 
            files: uploadedResults 
        });

    } catch (error) {
        console.error("Upload Logic Error:", error);
        return res.status(500).json({ message: "Error uploading file to Cloudinary" });
    }
}



export const getFiles = async (req, res) => {
   try {
     const userId = req.user.id;
     const files = await File.find({ uploadedBy: userId });
    

     res.status(200).json({ message: "Files fetched successfully", files });

 
   } catch (error) {
     console.error("Get Files Error:", error);
     return res.status(500).json({ message: "Error fetching files" });
   }
}

export const deleteFile = async (req, res) => {
   try{
    const fileId = req.params.fileId;
    const file = await File.findById(fileId);

    if (!file) {
        return res.status(404).json({ message: "File not found" });
    }

    if (file.uploadedBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to delete this file" });
    }

    await cloudinary.uploader.destroy(file.publicId);
    await File.findByIdAndDelete(fileId);

    res.status(200).json({ message: "File deleted successfully" }); 


   }
   
     catch (error) {
        console.error("Deleting File error",error);
        res.status(500)
        .json({message : " Deleting file error"})
    }
}
        
export const updateFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }   
        if (file.uploadedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this file" });
        }  
        if(!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Please select a file to update" });
        }
        const newFile = req.files[0];
        

        await cloudinary.uploader.destroy(file.publicId);
     
        const result = await uploadonCloudinary(newFile.path);  
        file.fileName = newFile.originalname;
        file.fileUrl = result.url;
        file.publicId = result.public_id;


        await file.save();  
        res.status(200).json({ message: "File updated successfully", file });




    } catch (error) {
        console.error("updating File error :",error);
        res.status(500)
        .json({message : " Updating file error"})   
        
        
    }

}   
