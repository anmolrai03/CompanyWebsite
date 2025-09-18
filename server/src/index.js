console.log("Hello")
import dotenv from "dotenv";

import mongoose from "mongoose";
import express from "express";
import connectdb from "./db/db.js";

dotenv.config({
    path: './env'
})

const port = process.env.PORT || 8000

const app = express()

connectdb()
.then(() => {
    app.listen(port, () => {
        console.log(`server is running at port ${port}`)
    })
})
.catch((error) => {
    console.log("Mongo db connection failed !!!", error)
})
