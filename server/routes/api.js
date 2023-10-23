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
  decrementCartItem,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getProducts,
  deleteProduct,
  updateProduct,
  addProduct,
  getProduct
} from "../controllers/auth-controllers.js";
import authentication from "../middleware/authenticate.js";
import upload from "../multer/upload.js";


const router = express.Router();

router.get("/", getAllProducts);
router.get('/users',getUsers)
router.get('/products',getProducts)
router.get('/user/:id',getUser)
router.get('/product/:id',getProduct)
router.get("/getaccountdetails", authentication, getAccountDetails);
router.get("/logout", authentication, userLogOut);
router.delete("/remove/:id", authentication, removeCartItem);
router.delete('/user/:id',deleteUser)
router.delete('/products/:id',deleteProduct)
router.get("/:id", getOneProducts);
router.post("/register", userRegister);
router.post("/addproduct", addProduct);
router.post("/login", userLogin);
router.post("/cart/:id", authentication, cartUser);
router.post("/increment/:id",authentication, incrementCartItem);
router.get("/decrement/:id", authentication, decrementCartItem);
router.post('/edit/:id',updateUser)
router.post('/product/edit/:id',updateProduct)

export default router;
