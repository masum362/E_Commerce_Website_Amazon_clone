import mongoose from "mongoose";

const connection = async(url) => {

    console.log({url})
    try {
        await mongoose.connect(url)

 return console.log('database connection established')
    } catch (error) {
        console.log(`error connecting to Mongoose: ${error}`)
    }

}

export default connection;