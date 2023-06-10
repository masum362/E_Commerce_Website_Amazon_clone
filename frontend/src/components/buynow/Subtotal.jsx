import React, { useEffect, useState } from 'react'

const Subtotal = ({account}) => {


  account.cart.map(item => {
    console.log(item.price.cost)
  })


  const [ price , setPrice ] = useState(0)

  const totalAmount = () => {
    let price = 0
     if(account.cart.length){
      account.cart.map(item => {
        price += item.price.cost
      })
     }
    setPrice(price)
    
}
console.log(price)

useEffect(() => {
  totalAmount();
}, [account]);

  return (
    <div className='sub_item'>
      {account &&   <h3>Subtotal ({account ? (account.cart.length ) : 0})item :<strong style={{ fontWeight: "700", color: "#111" }}> ₹{price}.00</strong></h3>}
    </div>
  )
}

export default Subtotal