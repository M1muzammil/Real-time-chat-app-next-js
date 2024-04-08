
import { NextResponse, NextRequest } from 'next/server';
import "dotenv/config"
import { client } from '../../../mongobd.mjs'
import jwt from 'jsonwebtoken';
import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi";
import { ObjectId } from 'mongodb';
import { uploadOnCloudinary } from "../../../cloudinary.mjs";

const userCollection = client.db("Realtimechat").collection("users");


export const GET = async (req, res) => {
    // console.log("Getting user profile");
    
    const token = req.cookies.get("token")?.value
    console.log("token",token)
  
    if (!token) {
        return  NextResponse.json({message:"unauthorized"}, { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token,process.env.SECRET)
        const userId = decodedToken._id;

        const userProfile = await userCollection.findOne({ _id: new ObjectId(userId) });
      console.log("user profile", userProfile, "userid",userId)
        if (!userProfile) {
     
            return  NextResponse.json({message:"not found"},{ status: 404 });
        }
        return  NextResponse.json({
            message:"",
            data:userProfile
        });
    } catch (error) {
       
        console.error("Error getting user profile:", error);
        return  NextResponse.json({message:"server rrror"}, { status: 500 });
    }
}
   






export const PUT = async (req, res) => {
  const token = req.cookies.get("token")?.value;

  // Check if token exists
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken._id;

    // Retrieve file from request formData
    const formData = await req.formData();
    const file = formData.get('file');

    // Upload file to Cloudinary
    const uploadedFile = await uploadOnCloudinary(file, "Chat-app-userprofile-url");

    // Get the public URL of the uploaded file
    const imageUrl = uploadedFile.url;

    // Update user profile image URL in the database
    const userProfile = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { profileImageUrl: imageUrl } }
    );

    // Check if user profile was updated successfully
    if (!userProfile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return success response with updated profile image URL
    return NextResponse.json({ message: "Profile image updated successfully", imageUrl });
  } catch (error) {
    console.error("Error updating user profile image:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};









