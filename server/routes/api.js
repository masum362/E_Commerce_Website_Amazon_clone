import express from "express";
import {
  getAllProducts,
  getOneProducts,
  userRegister,
  userLogin,
  cartUser,
  getAccountDetails,
  userLogOut,
  removeCartItem,
  incrementCartItem,
  decrementCartItem
} from "../controllers/auth-controllers.js";
import authentication from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/getaccountdetails", authentication, getAccountDetails);
router.get("/logout", authentication, userLogOut);
router.delete("/remove/:id", authentication, removeCartItem);
router.get("/:id", getOneProducts);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/cart/:id", authentication, cartUser);
router.post("/increment/:id", incrementCartItem);
router.get("/decrement", authentication, decrementCartItem);

export default router;
