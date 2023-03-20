import React, { useEffect, useState } from 'react'

const Subtotal = ({ items }) => {

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
  }, [items])

  return (
    <div className='sub_item'>
      <h3>Subtotal ({totalQuantity()} items): <strong style={{ fontWeight: 700, color: '#111' }}> ₹{price}.00</strong></h3>
    </div>
  )
}

export default Subtotal