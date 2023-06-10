import productsModel from "../model/productsSchema.js";
import userModel from "../model/userSchema.js";
import bcryptjs from "bcryptjs";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productsModel.find();
    return res.status(201).json(allProducts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const individualProduct = await productsModel.find({ _id: id });
    return res.status(201).json(individualProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const userRegister = async (req, res) => {
  const { name, email, mobile, password, cpassword } = req.body;
  try {
    const isnewUser = await userModel.findOne({ email: email });
    if (isnewUser) {
      return res.status(409).json({ message: "User already exists" });
    } else if (password !== cpassword) {
      return res.status(403).json({ message: "password not matched" });
    } else {
      const newUser = new userModel({
        name,
        email,
        mobile,
        password,
        cpassword,
      });
      const user = await newUser.save();
      return res.status(201).json(user);
    }
  } catch (error) {
    return res.status(501).json({ message: "something went wrong" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUser = await userModel.findOne({ email: email });
    if (isUser) {
      const isMatch = await bcryptjs.compare(password, isUser.password);
      if (isMatch) {
        const token = await isUser.getUserAuthToken();

        res.cookie("AmazonAuth", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: false,
        });
        return res.status(201).json(isUser);
      } else {
        return res.status(404).json({ message: "invalid user" });
      }
    } else {
      return res.json(404).json("invalid user");
    }
  } catch (error) {
    return res.status(501).json({ message: "Something went wrong" });
  }
};

export const cartUser = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await productsModel.findOne({ _id: id });
    const UserContact = await userModel.findOne({ _id: req.userId });
    if (UserContact) {
      const cartData = UserContact.addToCart(cartItem);
      await UserContact.save();
      return res.status(201).json({ UserContact });
    } else {
      return res.status(401).json("invalid user");
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json("something went wrong");
  }
};

export const getAccountDetails = async (req, res) => {
  try {
    const account = await userModel.findOne({ _id: req.userId });
    return res.status(201).json(account);
  } catch (error) {
    // console.log(error)
    return res.status(500).json("something went wrong");
  }
};

export const userLogOut = async(req, res) => {
  try {
    req.rootUser.tokens =await req.rootUser.tokens.filter((currentelement) => {
      return currentelement.token !== req.token;
    });
    await req.rootUser.save();

    res.clearCookie("AmazonAuth", { path: "/" });
    return res.status(201).json({ message: "successfully log out" });
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
};




export const removeCartItem = async(req, res) => {
  try {
    const {id} = req.params
console.log(id)
    req.rootUser.cart =  await req.rootUser.cart.filter((currentelement) => {
      return currentelement.id !== id;
    });
    await req.rootUser.save();
    return res.status(201).json(req.rootUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
};

