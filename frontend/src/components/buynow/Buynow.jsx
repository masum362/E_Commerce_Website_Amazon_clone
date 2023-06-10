import React, { useContext, useEffect } from 'react';
import './buynow.css'
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';
import { LoginContext } from '../context/AccountContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Buynow = () => {


  const { account, setAccount } = useContext(LoginContext)
  const navigate = useNavigate();
  useEffect(() => {

    if (account == '') {
      navigate('/signin');
    }
  }, [account])

 

  return (
    <div className='buynow_section' >
      <div className="buynow_container">
        <div className="left_buy">
          <h1>Shopping Cart</h1>
          <p>Select All Item</p>
          <span className='leftbuyspanrice'>Price</span>
          <hr />

          {account ? account.cart.map((item) => {
            return (
              <div className="item_containert" >
                <img src={item.detailUrl} alt="" />
                <div className="item_details">
                  <h3>{item.title.longTitle}</h3>
                  <h3>{item.title.shortTitle}</h3>
                  <h3 className='diffrentprice'>₹{item.price.cost}</h3>
                  <p className='unusuall'>Usually dispatched in 8 days</p>
                  <p>Eligible for free shipping</p>
                  <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" />
                  <Option itemid={item.id} />
                </div>
                <h3 className="item_price">₹{item.price.cost}</h3>

                <hr />
              </div>
            )
          }) : ''}



          <Subtotal account={account} />
        </div>
        <Right account={account} />
      </div>
    </div>
  )
}

export default Buynow