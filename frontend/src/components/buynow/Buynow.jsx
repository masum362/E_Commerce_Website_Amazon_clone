import React, { useContext, useEffect } from 'react';
import './buynow.css';
import Subtotal from './Subtotal';
import Right from './Right';
import { LoginContext } from '../context/AccountContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {base_url} from '../../../base.js';
import Option from './Option';

const Buynow = () => {
  const token = localStorage.getItem('usercookie')
  console.log(token);

  const { account, setAccount } = useContext(LoginContext)
  const navigate = useNavigate();
  useEffect(() => {

    setTimeout(() => {
      if (account == '') {
        navigate('/signin');
      }
    }, 2000);
  }, [account])
  const navigated = useNavigate();

  useEffect(() => {

    if (!account?.cart?.length) {
      toast.warning('please add product to cart', {
        position: "top-right",
      })
      navigated('/')
    }
  }, [])


  const handleDecrement =async (id) => {
    console.log(id)
    await axios(`${base_url}/decrement/${id}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        contentType: 'application/json',
        Authorization: 'Bearer ' +token

      }
      }).then(res => {
        setAccount(res.data)
      }).catch ( err => console.log({err}) );
  }

  const handleIncrement = async (id) => {
    console.log(id)
    await axios(`${base_url}/increment/${id}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        contentType: 'application/json',
        Authorization: 'Bearer ' +token
      }
      }).then(res => {
        setAccount(res.data)
      }).catch ( err => console.log({err}) );

  }

  const deleteItem = async(itemid) => {
    console.log({itemid})

    await axios(`${base_url}/remove/${itemid}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: 'Bearer ' +token
      },
      withCredentials: true
    }).then(res => {
      setAccount(res.data)
    }).catch(err => console.log(err))
  }

  return (
    <div className='buynow_section' >
      <div className="buynow_container">
        <div className="left_buy">
          <h1>Shopping Cart</h1>
          <p>Select All Item</p>
          <span className='leftbuyspanrice'>Price</span>
          <hr />

          {account ? account.cart.map((item) => {

            console.log({item})
            // const item = (items.item);
            // const id = item._id

            // console.log({ item })
            return (
              <div className="item_containert hover:bg-orange-100 cursor-pointer  transition-all duration-300" key={item._id}>
                <img src={item?.detailUrl} alt="" />
                <div className="item_details">
                  <h3>{item?.title.longTitle}</h3>
                  <h3>{item?.title?.shortTitle}</h3>
                  <h3 className='diffrentprice'>₹{item?.price?.cost}</h3>
                  <p className='unusuall'>Usually dispatched in 8 days</p>
                  <p>Eligible for free shipping</p>
                  <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" />
                  <div>
                    <button onClick={() => handleDecrement(item?._id)} disabled={item.quantity>0 ?false :true}  className="text-xl w-6 h-6 bg-gray-400 rounded my-4 mx-1 text-center items-center hover:bg-orange-600 hover:text-white transition-all duration-150">-</button>
                    <button className="text-xl w-6 h-6  rrounded my-4 mx-1 ">{item.quantity}</button>
                    <button onClick={() => handleIncrement(item?._id)} className="text-xl w-6 h-6 bg-gray-400 rounded my-4 mx-1 text-center items-center hover:bg-orange-600 hover:text-white transition-all duration-150">+</button>
                  </div>
                  <Option deleteItem={deleteItem} itemid={item?._id} />
                </div>
                <h3 className="item_price">₹{item?.price?.cost}</h3>
                
                <hr />
              </div>
            )

          }) : ''}



          <Subtotal account={account} />
        </div>
        <Right account={account} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

    </div>
  )
}

export default Buynow