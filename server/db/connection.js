import mongoose from "mongoose";

const connection = async(password) => {

    const url = `mongodb+srv://masumahmed64077:${password}@ecommerce.qoxeb50.mongodb.net/Amazonweb?retryWrites=true&w=majority`
    try {
        await mongoose.connect(url)

 return console.log('database connection established')
    } catch (error) {
        console.log(`error connecting to Mongoose: ${error}`)
    }

}

export default connection;