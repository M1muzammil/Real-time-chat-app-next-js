
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












export const PUT = async (req, res) => {
    const token = req.cookies.get("token");

    // Check if token exists
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Verify JWT token
        const decodedToken = jwt.verify(token.value, process.env.SECRET);
        const userId = decodedToken._id;

        console.log("userid",userId)

        const body = await req.json();
        console.log(
            "body", body
        )
        // Check if old and new passwords are provided
        if (!body?.oldPassword || !body?.newPassword) {
            return NextResponse.json({ message: "Old and new passwords are required" }, { status: 400 });
        }

        // Retrieve user from the database
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });

        console.log("user",user)

        // Verify old password
        const isPasswordValid = await varifyHash(body.oldPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Incorrect old password" }, { status: 401 });
        }
        console.log("new hash pass",body.newPassword)
        // Hash the new password
        const newPasswordHash = await stringToHash(body.newPassword);
        console.log("new hash pass",newPasswordHash)

        // Update user's password in the database
        const result = await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password: newPasswordHash } }
        );

        // Check if user's password was updated successfully
        if (!result.modifiedCount) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
};






