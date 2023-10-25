import React, { useContext, useEffect, useState } from 'react';
import './cart.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import { LoginContext } from '../context/AccountContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from '../../../base.js';


const Cart = () => {

  const [product, setProduct] = useState("")
  const { id } = useParams();

  const { account, setAccount } = useContext(LoginContext)

  console.log(id)

  useEffect(() => {
      getindividualProduct(id)
  }, [id])




  const getindividualProduct = async (id) => {
    await axios.get(`${base_url}/${id}`, { credentials: 'include' }).then(response => {
      const data = response.data[0]
      if (response.status !== 201) {
        alert("no data available")
      } else {
        setProduct(data);
      }
      console.log({ response })

    }).catch(err => {
      console.log(err)
    });
  }

  const navigate = useNavigate()

  const addToCart = async (id) => {
    await axios(`${base_url}/cart/${id}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        contentType: 'application/json'
      }
    }).then(res => {
      toast.success("product added in your cart",{
        position:'top-right'
      })
      setAccount(res.data.UserContact)
      navigate('/buynow');
    }).catch(err => {
      // console.log(err)
      if (err.response.data.message == "not authorized") {
        toast.warning("Please login first",{
          position:'top-right'
        })
        navigate('/signin')
      }
    })
  }







  return (
    <div className='cart_section'>
      {product && Object.keys(product).length &&
        <div className='cart_container'>
          <div className="left_cart">
            <img src={product.detailUrl} alt="" />
            <div className="cart_btn">
              <button className='cart_btn1' onClick={() => addToCart(product._id)}>Add To Cart</button>
              <button className='cart_btn2'>Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{product.title.shortTitle}</h3>
            <h4>{product.title.longTitle}</h4>
            <hr />
            <p className="mrp">M.R.P : <del>₹ {product.price.mrp}</del></p>
            <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹ {product.price.cost}</span></p>
            <p>You save : <span style={{ color: "#B12704" }}> ₹ {product.price.mrp - product.price.cost} ({product.price.discount})</span></p>
            <div className="discount_box">
              <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
              <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
            </div>
            <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{product.description}</span></p>

          </div>




        </div>}


      {!product && <ScaleLoader

        color={"#000"}
        size={150}
        style={{ margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
        aria-label="Loading Spinner"
        data-testid="loader" />}


      <ToastContainer />
    </div>
  )
}

export default Cart