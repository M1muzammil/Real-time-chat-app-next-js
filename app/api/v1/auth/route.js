
import { NextResponse, NextRequest } from 'next/server';

import { client } from '../../mongobd.mjs'
import jwt from 'jsonwebtoken';
import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi";


const userCollection = client.db("Realtimechat").collection("users");


export const  POST = async (req, res) => {

  
    const body = await req.json();
    // console.log("run")
    if (
        !body?.firstName
        || !body?.email
        || !body?.password
    )
     {
        return NextResponse.json({
            message: "required parameters missing,",
        }, { status: 401 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(body.email)) {
        return NextResponse.json({
            message: "Invalid email address",
        }, { status: 401 });
    }


   
    try {
        let result = await userCollection.findOne({ email: body.email });
        console.log("result: ", result);

        if (!result) { 

            const passwordHash = await stringToHash(body.password);

            const insertResponse = await userCollection.insertOne({
                firstName: body.firstName,
                email: body.email,
                password: passwordHash,
                profileImageUrl:'https://avatars.githubusercontent.com/u/119755415?s=48&v=4',
                createdOn: new Date()
            });
            console.log("insertResponse: ", insertResponse);

            return NextResponse.json({
                message: "signup successful",
        })
           

        } else { 
          return NextResponse.json({
                message: "email already exists",
        }
    
        
        )

    } 
   
}
catch (e) {
    console.log("error getting data mongodb: ", e);
    res.status(500).send('server error, please try later');
}}












