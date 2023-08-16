import jwt from "jsonwebtoken";
import userModel from "../model/userSchema.js";

const authentication = async (req, res, next) => {
  const token = req.cookies.AmazonAuth;

  try {
    const validUser = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await userModel.findOne({
      _id: validUser._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      return res.status(404).json({ message: "user not found" });
    } else {
      req.token = token;
      req.rootUser = rootUser;
      req.userId = rootUser._id;
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "not authorized" });
  }
};

export default authentication;