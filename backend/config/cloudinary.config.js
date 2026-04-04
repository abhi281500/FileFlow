import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; 



cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadonCloudinary = async (localfilePath) => {
    
    try {
        if(!localfilePath){
        throw null
    }
  const result = await  cloudinary.uploader.upload(localfilePath, {resource_type : "auto"})
  console.log("file uploaded:", result.url);
   
  fs.unlinkSync(localfilePath); // Ye line file delete kar degi
  return result;


    } catch (error) {
        if (fs.existsSync(localfilePath)) {
            fs.unlinkSync(localfilePath);
        }
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Error uploading file to Cloudinary");
    }
    
}