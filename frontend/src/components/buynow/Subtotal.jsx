import React, { useEffect, useState } from 'react'

const Subtotal = ({account}) => {

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

  return (
    <div className='sub_item'>
      {account &&   <h3>Subtotal ({account ? (quantity ) : 0})item :<strong style={{ fontWeight: "700", color: "#111" }}> ₹{totalPrize }.00</strong></h3>}
    </div>
  )
}

export default Subtotal