import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
let PORT = 3000;

// Middleware to allow json
app.use(express.json())

// Connect to the mongo database
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

// Routes in the server
app.post("/signup", (req, res) => {

    // Destructure from request body
    let {fullname, email, password} = req.body

    // Validate the data
    if (email.length < 3) {
        return res.status(403).json({"Error": "Email must be at least 3 letters long"})
    }
    return res.status(200).json({"Status": "Success"})
})

app.listen(PORT, () => {
    console.log(`Listening on port => ${PORT}`)
})
