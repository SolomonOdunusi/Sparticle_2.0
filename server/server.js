import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
let PORT = 3000;

// Connect to the mongo database
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

app.port("/signup", (req, res) => {
    res.
})

app.listen(PORT, () => {
    console.log(`Listening on port => ${PORT}`)
})
