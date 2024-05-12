import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import {customAlphabet} from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import User from './Schema/User.js';

const app = express();
const PORT = 3000;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// Middleware to allow json
app.use(express.json());
app.use(cors());

// Connect to the mongo database
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
});


// To format the data
const formatData = (user) => {

    // Removed the expiration time (Debug 1)
    const access_token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY)

    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname
    }
}

const nanoidId = customAlphabet('0123456789', 3);

const genUsername = async (email) => {
    let username =  email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);

    let usernameExists = await User.exists({ "personal_info.username": username })
    .then((exists) => exists)
    
    usernameExists ? username += nanoidId() : "";
    return username;
}

app.post("/signup", (req, res) => {
    let { fullname, email, password } = req.body;

    // Validate the data
    if (fullname.length < 3) {
        return res.status(403).json({"Error": "Full Name must be at least 3 letters long"});
    }             
    if (!email.length) {
        return res.status(403).json({"Error": "Email is required"});
    }
    if (password.length < 6) {
        return res.status(403).json({"Error": "Password must be at least 6 characters long"});
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({"Error": "Email must be valid"});
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({"Error": "Password must contain at least one number, one uppercase and one lowercase letter, and at least 6 characters"});
    }

    bcrypt.hash(password, 5, async (err, hash_pwd) => {
        if (err) {
            return res.status(500).json({"error": err.message});
        }

        let username = await genUsername(email);

        const user = new User({
            personal_info: {
                fullname,
                email,
                password: hash_pwd,
                username
            }
        });

        user.save().then((u) => {
            return res.status(200).json(formatData(u));
        }).catch(err => {
            if (err.code === 11000) {
                return res.status(403).json({ "error": "Email already exists" });
            }
            return res.status(500).json({"error": err.message});
        });
    });
});


app.post("/signin", (req, res) => {

//     // Destructure from request body
    let {email, password} = req.body

//     // Validate the data
    User.findOne({"personal_info.email": email}).then((user) => {
        if (!user) {
            return res.status(403).json({"error": "User not found"})
        }

        bcrypt.compare(password, user.personal_info.password, (err, result) => {

            if (err) {
                return res.status(401).json({Error: "Login failed, try again"})
            } if (!result) {
                return res.status(401).json({Error: "Incorrect password"})
            }
            else {
                return res.status(200).json(formatData(user))
            }

        })

    }).catch((err) => {
        return res.status(500).json({"error": err.message})
    })

})

app.listen(PORT, () => {
    console.log(`Server is running on port => ${PORT}`);
});
