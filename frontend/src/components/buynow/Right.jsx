import React, { useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

const Right = ({ account }) => {
  const [toggle, setToggle] = useState(false)


  const [ totalPrize , setTotalPrize ] = useState(0)
  const [ quantity , setQuantity ] = useState(0)

  const totalAmount = () => {
    let totalPrize = 0
    let quantity = 0
    let total = 0
     if(account?.cart?.length){
      account.cart?.map(product => {
        // console.log(items._Id)
        totalPrize +=product.totalPrize
        quantity += product.quantity

      })
     }
    setTotalPrize(totalPrize)
    setQuantity(quantity)
    
}

useEffect(() => {
  totalAmount();
}, [account]);


  const handlePayment = () => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSevYgFh1kzRDjOecH-7iLzSza-OdEUp21yANeP4rdxtCk6WiQ/viewform?fbzx=-9105869868009461637';
  }


  return (
    <>
      {account && <div className='right_buy'>
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightbuy" />
        <div className='cost_right'>
          <p>Your order is eligible for FREE Delivery. <br />
            <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
          <h3>Subtotal ({quantity} items): <span style={{ fontWeight: "700" }}> ₹{totalPrize}</span></h3>
          <button className="rightbuy_btn" onClick={() => handlePayment()} >Proceed to Buy</button>
          <div className="emi" onClick={() => setToggle(!toggle)}>Emi available {toggle ? <i className="fa-sharp fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>}</div>
          {toggle ? <span > Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
            Jewelry, Gift cards and Amazon pay balance top up). Learn more</span>
            : null}

        </div>

      </div>}
    </>
  )
}

export default Right