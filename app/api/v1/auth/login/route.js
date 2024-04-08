
import { NextResponse, NextRequest } from 'next/server';

import { client } from '../../../mongobd.mjs'
import jwt from 'jsonwebtoken';
import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi";


const userCollection = client.db("Realtimechat").collection("users");


export const  POST = async (req, res) => {

    const body = await req.json();

    if (
        !body?.email
        || !body?.password
    ) {


        return NextResponse.json({
            message: "required parameters missing,",
        }, { status: 403 })

    }


try{
    let result = await userCollection.findOne({ email: body.email });
      console.log("result: ", result);
    if(!result){


return NextResponse.json({
    message:"incorrect email or password"

},{status:403})

    }
else{

    const isMatch = await varifyHash(body.password, result.password)
 
    
if(isMatch){      

                
                    const token = jwt.sign({
                        isAdmin: false,
                        firstName: result.firstName,
                        _id: result._id,
                        email: body.email,
                    }, process.env.SECRET, {
                        expiresIn: '24h'
                    });
                   
                    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; 

                    
                                    const expirationDate = new Date(Date.now() + twentyFourHoursInMilliseconds);
                                   console.log("done")

                                   const response = NextResponse.json({
                                    message: `login successfully `,
                                }, { status: 200 })

                                    response.cookies.set('token', token, {
                                        httpOnly: true,
                                        secure: true,
                                        expires: expirationDate, 
                                    });
                                    console.log("token",token)

return response

                }
                else{


                    return NextResponse.json({
                        message:"incorrect email or password"
                    })
                }

}





}
catch{
   
return NextResponse.json({
    message:"an error accuorse"
})
}







}








// router.post('/login', async (req, res, next) => {

//     if (
//         !req.body?.email
//         || !req.body?.password
//     ) {
//         res.status(403);
//         res.send(`required parameters missing, 
//         example request body:
//         {
//             email: "some@email.com",
//             password: "some$password",
//         } `);
//         return;
//     }
//     req.body.email = req.body.email.toLowerCase();

//     try {
//         let result = await userCollection.findOne({ email: req.body.email });
//         console.log("result: ", result);

//         if (!result) { // user not found
//             res.status(403).send({
//                 message: "email or password incorrect"
//             });
//             return;
//         } else { // user found


//             const isMatch = await varifyHash(req.body.password, result.password)

//             if (isMatch) {
                
//                 const token = jwt.sign({
//                     isAdmin: false,
//                     firstName: result.firstName,
//                     lastName: result.lastName,
//                     _id: result._id,
//                     email: req.body.email,
//                 }, process.env.SECRET, {
//                     expiresIn: '24h'
//                 });

//                 const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//                 const expirationDate = new Date(Date.now() + twentyFourHoursInMilliseconds);
                
//                 res.cookie('token', token, {
//                     httpOnly: true,
//                     secure: true,
//                     expires: expirationDate, // Set the expiration date
//                 });
                

//                 res.send({
//                     message: "login successful"
//                 });
              
//                 return;
//             } else {
//                 res.status(401).send({
//                     message: "email or password incorrect"
//                 })
//                 return;
//             }
//         }

//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
// })