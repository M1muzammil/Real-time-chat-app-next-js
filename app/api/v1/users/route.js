
import { NextResponse, NextRequest } from 'next/server';
import "dotenv/config"
import { client } from '../../mongobd.mjs'
import jwt from 'jsonwebtoken';
import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi";
import { ObjectId } from 'mongodb';


const userCollection = client.db("Realtimechat").collection("users");


export const GET = async (req, res, next) => {
    try {
      const allUsers = await userCollection.find({}).toArray();
  
      return NextResponse.json({
        message: 'Users fetched successfully',
        users: allUsers,
      }, { status: 200 });
  
    } catch (error) {
      console.error('Error fetching users:', error);
      
      return NextResponse.json({
        message: 'An unknown error occurred',
      }, { status: 500 });
    }
  };
  
   








