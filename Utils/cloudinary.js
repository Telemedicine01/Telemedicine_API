import cloudinary from "cloudinary";
// import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// export default cloudinary;
// // Function to upload file to Cloudinary
// // export const cloudinaryUpload = (filePath) => {
// //   return new Promise((resolve, reject) => {
// //     cloudinary.v2.uploader.upload(filePath, (error, result) => {
// //       if (error) {
// //         reject(error);
// //       } else {
// //         resolve(result);
// //       }
// //     });
// //   });
// // };

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (fileBuffer) => {
  try {
    const result = await cloudinary.v2.uploader.upload(fileBuffer, {
      folder: "doctor_profiles", // Optional: Organize uploaded images in a specific folder
      resource_type: "auto", // Auto detects the file type (image, video, etc.)
      public_id: `doctor-${Date.now()}`, // Optionally, create a custom public_id
    });

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Failed:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export default cloudinaryUpload;
