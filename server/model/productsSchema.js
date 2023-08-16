import mongoose from "mongoose";

const productsSchema =new mongoose.Schema({
    id:String,
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagline:String,
    quantity:Number,
})


const productsModel = new mongoose.model('Products',productsSchema)

export default productsModel;