// import cloudinary from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const cloudinaryUpload = async (fileBuffer) => {
//   try {
//     const result = await cloudinary.v2.uploader.upload(fileBuffer, {
//       folder: "doctor_profiles", // Optional: Organize uploaded images in a specific folder
//       resource_type: "auto", // Auto detects the file type (image, video, etc.)
//       public_id: `doctor-${Date.now()}`, // Optionally, create a custom public_id
//     });

//     return result;
//   } catch (error) {
//     console.error("Cloudinary Upload Failed:", error);
//     throw new Error("Cloudinary upload failed");
//   }
// };

// export default cloudinaryUpload;
import { v2 as cloudinary } from "cloudinary";  // ✅ Correct import
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "doctor_profiles", // Optional: to organize uploads
      resource_type: "auto",     // Auto-detect file type
      public_id: `doctor-${Date.now()}`, // Optional custom name
    });

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Failed:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export default cloudinaryUpload;
