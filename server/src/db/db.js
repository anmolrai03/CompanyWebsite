import mongoose from "mongoose";
// const DB_NAME = "tube";
import { DB_NAME } from "../constants.js";


const connectdb = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongodb connected !! DB HOST: ${connectInstance.connection.host}`)
    }
    catch (error){
        console.error("ERROR: ", error)
        process.exit(1)
    }
}


export default connectdb;