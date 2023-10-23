import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
    minlength: [8, "Field length must be at least 8 characters"],
    maxlength: 14,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  token:  {
    type: String,
     },
  cart:[
    {
    productID:String,
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagline:String,
    rating:Array,
    quantity:{
      type:Number , 
      default:1
    },
    totalPrize:Number,
    }
  ],
  orders:Array,
  role:{
    type: String,
    enum:['admin','user','manager'],
    default:'user',
  },
});





userShema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
    this.cpassword = await bcryptjs.hash(this.cpassword, 10);
  }
  next();
});

userShema.methods.getUserAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.token = token;
    this.save();
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

userShema.methods.addToCart = async function (id,cartItem) {
  try {
    const existingItemIndex = this.cart.findIndex(
      (currentItem) => currentItem.productID === id
    );
    console.log({existingItemIndex})

    if (existingItemIndex !== -1) {
      // If the product exists, increase its quantity
      this.cart[existingItemIndex].quantity += 1;
      this.cart[existingItemIndex].totalPrize = this.cart[existingItemIndex].price.cost * this.cart[existingItemIndex].quantity;
      console.log(this.cart[existingItemIndex].totalPrize)

    } else {
      // If the product doesn't exist, add it to the cart
      cartItem.quantity = 1; // Initialize quantity for a new item
      cartItem.totalPrize = cartItem.price.cost 
      this.cart.push(cartItem);
    }
    return this.cart;
  } catch (error) {
    return new Error(error);
  }
};


userShema.methods.quantityChangeOfProduct = async function (id, type) {  try {
    if(type==='increment'){
      const existingItemIndex = this.cart.findIndex(
        (currentItem) => {
         return currentItem.id === id
        }
      );
      
  
      if (existingItemIndex !== -1) {
        // If the product exists, increase its quantity
        this.cart[existingItemIndex].quantity += 1;
        this.cart[existingItemIndex].totalPrize = this.cart[existingItemIndex].price.cost * this.cart[existingItemIndex].quantity;
      console.log('from increasing item ' + this.cart[existingItemIndex].totalPrize)
      } 
    }else{
      const existingItemIndex = this.cart.findIndex(
        (currentItem) => {
         return currentItem.id === id
        }
      );
      if (existingItemIndex !== -1) {
        // If the product exists, increase its quantity
        this.cart[existingItemIndex].quantity -= 1;
        this.cart[existingItemIndex].totalPrize = this.cart[existingItemIndex].price.cost * this.cart[existingItemIndex].quantity;
      console.log('from decresing item ' + this.cart[existingItemIndex].totalPrize)
      } 
    }
    return this.cart;
  } catch (error) {
    return new Error(error);
  }
};

const userModel = new mongoose.model("user", userShema);

export default userModel;
