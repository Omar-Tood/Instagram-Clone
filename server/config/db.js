import mongoose from 'mongoose'
import { dbURL } from './config.js'

const connectDB = async()=>{
    try{
        await mongoose.connect(dbURL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })

        console.log("Mongo Connected Successfully")


    }catch(err){
        console.log('Error Connecting Database ', err)
        process.exit(1);
    }
}

export default connectDB