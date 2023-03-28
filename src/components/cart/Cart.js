import React, { useEffect, useState } from 'react'
import { Divider } from '@mui/material'
import { useParams } from 'react-router-dom'
import './cart.css'
import { useDispatch } from 'react-redux'
import { fState } from '../../store/slice/CartCounter'

const Cart = ({ setData }) => {

    const { id } = useParams("");

    const dispatch = useDispatch();

    const [indvData, setIndvData] = useState([]);

    const getIndvData = async () => {
        const res = await fetch(`https://e-commerce-clone.onrender.com/getproductsone/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        if (res.status !== 201) {
            alert("oops something went wrong")
        } else {
            setIndvData(data.data);
        }
    }

    useEffect(() => {
        getIndvData()
        // eslint-disable-next-line
    }, [id]);

    const addToCart = async (id) => {
        const addCart = await fetch(`https://e-commerce-clone.onrender.com/addtocart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                indvData
            }),
            credentials: "include"
        });
        const data1 = await addCart.json()
        if (addCart.status === 200) {
            let count = 0
            for (let i = 0; i < data1.data.items.length; i++) {
                count = count + data1.data.items[i].quantity
            }
            dispatch(fState(count))
        } else {
            alert(`${data1.message}`)
        }
    }

    return (
        <div className='cart_section'>
            {indvData && Object.keys(indvData).length && <div className="cart_container">
                <div className="left_cart">
                    <img src={indvData.detailUrl} alt="cart_img" />
                    <div className="cart_btn">
                        <button className='cart_btn1' onClick={() => addToCart(indvData._id)}>Add to Cart</button>
                        <button className='cart_btn2'>Buy Now</button>
                    </div>
                </div>
                <div className="right_cart">
                    <h3>{indvData.title.shortTitle}</h3>
                    <h4>{indvData.title.longTitle}</h4>
                    <Divider />
                    <p className='mrp'>M.R.P. : ₹{indvData.price.mrp}</p>
                    <p>Deal of the Day : <span style={{ color: '#B12704' }}>₹{indvData.price.cost}.00</span></p>
                    <p>You save : <span style={{ color: '#B12704' }}>₹{indvData.price.mrp - indvData.price.cost} ({indvData.price.discount}) :</span></p>

                    <div className="discount_box">
                        <h5>Discount : <span style={{ color: '#111' }}>{indvData.discount}</span></h5>
                        <h4>Free Delivery : <span style={{ color: '#111', fontWeight: 600 }}>Oct 8 - 21 </span>Detail</h4>
                        <p>Fastest delivery : <span style={{ color: '#111', fontWeight: 600 }}>Tomorrow 11AM</span></p>
                    </div>
                    <p className='description'>About the Items : <span style={{ color: '#565959', fontSize: 14, fontWeight: 500, letterSpacing: '0.4px' }}>{indvData.description}</span></p>
                </div>
            </div>}
        </div>
    )
}

export default Cart
