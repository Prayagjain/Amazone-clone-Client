import React, { useEffect, useState } from 'react'

const Right = ({ items }) => {

  const [price, setPrice] = useState(0);

  const totalQuantity = () => {
    let quantity = 0
    for (let i = 0; i < items.length; i++) {
      quantity += items[i].quantity
    };
    return quantity
  }

  const totalAmount = () => {
    let price = 0
    for (let i = 0; i < items.length; i++) {
      price += items[i].productId.price.cost * items[i].quantity
    };
    setPrice(price)
  }

  useEffect(() => {
    totalAmount();
    // eslint-disable-next-line
  }, [items])

  return (
    <div className='right_buy'>
      <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="" />
      <div className="cost_right">
        <p>Your order is Eligible for Free Delivery</p><br />
        <span style={{ color: '#565959' }}>Select this option at checkout. Details</span>
        <h3>Subtotal ({totalQuantity()} items): <span style={{ fontWeight: 700 }}>₹{price}.00</span></h3>
        <button className='rightbuy_btn'>Process to Buy</button>
        <div className="emi">
          Emi available
        </div>
      </div>
    </div>
  )
}

export default Right
