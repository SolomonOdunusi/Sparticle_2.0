import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bycrypt, { hash } from 'bcrypt';
import {nanoid} from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import User from './Schema/User.js';

const app = express();
let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// Middleware to allow json
app.use(express.json())
app.use(cors())

// Connect to the mongo database
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

// To format the data
const formatData = (user) => {

    // Removed the expiration time (Debug 1)
    // const access_token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY) 

    return {
        // access_token,
        fullname: user.personal_info.fullname,
        username: user.personal_info.username,
        profile_img: user.personal_info.profile_img,   
    }
}

// Check if username exists and generate a new one if it does
const genUsername = async (email) => {
    let username = email.split("@")[0]
    username = username.charAt(0).toUpperCase() + username.slice(1);
    let userExist = await User.exists({"personal_info.username": username})
    .then((userResult) => userResult)

    if (userExist) {
        username += nanoid(4)
    } else {
        ""
    }
    return username

}

// Routes in the server
app.post("/signup", (req, res) => {

    // Destructure from request body
    let {fullname, email, password} = req.body;

// Validate the data

        if (fullname.length < 3) {
            return toast.error("Full Name must be at least 3 letters long")
        }             
        if (!email.length) {
            return toast.error("Email is required")
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long")
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email must be valid")
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password must contain at least one number, one uppercase and one lowercase letter, and at least 6 characters")
        }


    bycrypt.hash(password, 5, async (hashErr, hash) => {

        let username = await genUsername(email)

        // Save the user to the database
        let user = new User({personal_info: {
            // Switched the params position (Debug 2)
            fullname, email, password: hash, username }})
        
        user.save().then((u) => {
            return res.status(200).json(formatData(u))
        }).catch((err) => {

            if (err.code === 11000) {
                return res.status(409).json({Error: "Email has already been registered -> " + email})
            }

            return res.status(500).json({Error: err})
        })

    })

})

app.post("/signin", (req, res) => {

    // Destructure from request body
    let {email, password} = req.body

    // Validate the data
    User.findOne({"personal_info.email": email}).then((user) => {
        if (!user) {
            return res.status(404).json({Error: "User not found"})
        }

        bycrypt.compare(password, user.personal_info.password, (err, result) => {

            if (err || !result) {
                return res.status(401).json({Error: "Login failed, check your credentials"})
            } else {
                return res.status(200).json(formatData(user))
            }

        })
        return res.status(200)
    
    }).catch((err) => {
        return res.status(500).json({Error: err})
    })

})

app.listen(PORT, () => {
    console.log(`Listening on port => ${PORT}`)
})
