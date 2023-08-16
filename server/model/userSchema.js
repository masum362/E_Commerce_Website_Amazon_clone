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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  cart:Array,
  orders:Array,
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
    this.tokens = this.tokens.concat({
      token: token,
    });
    this.save();
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

userShema.methods.addToCart = async function (cartItem) {
  try {
    const isNewItem = await this.cart.filter((currentItem) => {
      return currentItem.id === cartItem.id;
    });
    console.log({isNewItem})

    this.cart = await this.cart.concat(cartItem);
    return this.cart;
  } catch (error) {
    return new Error(error);
  }
};

const userModel = new mongoose.model("user", userShema);

export default userModel;
