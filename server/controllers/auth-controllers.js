import productsModel from "../model/productsSchema.js";
import userModel from "../model/userSchema.js";
import bcryptjs from "bcryptjs";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import { response } from "express";

cloudinary.config({
  cloud_name: "dhjko1yrs",
  api_key: "659117575841339",
  api_secret: "kEmHpAfkHLuaCd407tPBLOk2c_Y",
});

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
console.log(id)
  try {
    const individualProduct = await productsModel.find({ _id: id });
    return res.status(201).json(individualProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const userRegister = async (req, res) => {
  const { name, email, mobile, password, cpassword } = req.body;
  console.log({ name, email, mobile, password, cpassword })
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

    if (!isUser) {
      return res.status(501).json("invalid user");
    } else {
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
      console.log(UserContact);
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

export const userLogOut = async (req, res) => {
  try {
    req.rootUser.tokens = await req.rootUser.tokens.filter((currentelement) => {
      return currentelement.token !== req.token;
    });
    await req.rootUser.save();

    res.clearCookie("AmazonAuth", { path: "/" });
    return res.status(201).json({ message: "successfully log out" });
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.cart = await req.rootUser.cart.filter((currentelement) => {
      return currentelement.id !== id;
    });
    await req.rootUser.save();
    return res.status(201).json(req.rootUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
};

export const incrementCartItem = async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  return res.json({ message: "CALLING" });
  //   try {
  //     const {id} = req.params
  // console.log(id)
  //     req.rootUser.cart =  await req.rootUser.cart.filter((currentelement) => {
  //       return currentelement.id !== id;
  //     });
  //     await req.rootUser.save();
  //     return res.status(201).json(req.rootUser);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json("something went wrong");
  //   }
};

export const decrementCartItem = async (req, res) => {
  const { id } = req.params;
  console.log("calling");
  //   try {
  //     const {id} = req.params
  // console.log(id)
  //     req.rootUser.cart =  await req.rootUser.cart.filter((currentelement) => {
  //       return currentelement.id !== id;
  //     });
  //     await req.rootUser.save();
  //     return res.status(201).json(req.rootUser);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json("something went wrong");
  //   }
};

export const getUsers = async (req, res) => {
  try {
    const allUser = await userModel.find({});
    res.status(201).json(allUser);
  } catch (error) {
    console.log("dara reading error: " + error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const allProduct = await productsModel.find({});
    res.status(201).json(allProduct);
  } catch (error) {
    console.log("dara reading error: " + error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.find({ _id: req.params.id });
    res.status(201).json(user);
  } catch (error) {
    console.log("dara reading error: " + error);
  }
};

export const getProduct = async (req, res) => {
  
  try {
    const product = await productsModel.find({ _id: req.params.id });
    res.status(201).json(product);
  } catch (error) {
    console.log("dara reading error: " + error);
  }
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const editUser = new userModel(user);

  try {
    const user = await userModel.updateOne(
      { _id: req.params.id },
      {
        name: editUser.name,
        email: editUser.email,
        phone: editUser.phone,
      }
    );
    res.status(201).json(user);
  } catch (error) {
    console.log("dara reading error: " + error);
  }
};

export const updateProduct = async (req, res) => {
  const {id} = req.params;
  console.log({id})
  
  const { title, description, category, mrp, cost, discount, tags, quantity } =
    req.body;

    console.log({ title, description, category, mrp, cost, discount, tags, quantity })

try {
  const file = req.files.image;

  cloudinary.uploader
    .upload(file.tempFilePath)
    .then((res) => {
      const product = new productsModel({
        id: uuidv4(),
        url: res.url,
        detailUrl: res.url,
        title: {
          shortTitle: category,
          longTitle: title,
        },
        price: {
          mrp,
          cost,
          discount,
        },
        description,
        tagline: tags,
        quantity,
      });
    userModel.updateOne({ _id: req.params.id },product)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    })
    .catch((err) => console.log(err));


  return res.status(200).json({ message: "product added successfully" });






  
} catch (error) {
  console.log(error)
  return res.status(501).json({message:"something went wrong"})
}

}

export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.deleteOne({ _id: req.params.id });
    res.status(201).json(user);
  } catch (error) {
    console.log("dara reading error: " + error);
  }
};

export const deleteProduct = async (req, res) => {
  console.log(req.params.id)
  try {
    const product = await productsModel.deleteOne({ _id: req.params.id });
    res.status(201).json(product);
  } catch (error) {
    console.log("dara reading error: " + error);
  }
};

export const addUser = async (req, res) => {
  const user = req.body;
  const newUser = new userModel(user);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log("user adding error: " + error);
  }
};

export const addProduct = async (req, res) => {
  console.log(
    { title },
    { description },
    { category },
    { mrp },
    { cost },
    { discount },
    { tags }
  );

  // console.log({imageData})

  const { title, description, category, mrp, cost, discount, tags, quantity } =
    req.body;

  // const API = "666020e795357f7c10e094438636a31d";
  try {
    // const imageData = req.file.buffer.toString("base64");

    // const imageUploadResult = await cloudinary.uploader.upload(imageData);

    // const imageUrl = imageUploadResult.secure_url;

    // res.json({ imageUrl });
    // const response = await axios.post(`"https://api.imgbb.com/1/upload"`, {
    //   key: API,
    //   image: imageData,
    // }).then(res => {
    //   const imageUrl = res.json(res.data);
    //   console.log({imageUrl});
    // }).catch(err => {
    //   console.log('something went wrong' + err);
    //   return res.status(500).json(err);
    // })
    // const imageUrl = response
    // console.log({ imageUrl });
    // console.log(title)

    // Save imageUrl to your MongoDB database or storage solution
    // Return the imageUrl in the response

    const file = req.files.image;

    cloudinary.uploader
      .upload(file.tempFilePath, (err, result) => {})
      .then((res) => {
        const product = new productsModel({
          id: uuidv4(),
          url: res.url,
          detailUrl: res.url,
          title: {
            shortTitle: category,
            longTitle: title,
          },
          price: {
            mrp,
            cost,
            discount,
          },
          description,
          tagline: tags,
          quantity,
        });
        product
          .save()
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => console.log(err));
    return res.status(200).json({ message: "product added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
