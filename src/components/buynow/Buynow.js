import { Divider } from "@mui/material"
import React, { useEffect, useState } from 'react';
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";
import Empty from "./Empty";
import './buynow.css';
import { useSelector } from "react-redux";

const Buynow = () => {

    const [cartData, setCartData] = useState("")

    const cartCount = useSelector(state => state.cart);

    const getdatabuy = async () => {
        const res = await fetch("/getcartdata", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credential: "include"
        });

        const data = await res.json()
        if (res.status === 200) {
            setCartData(data.data.items)
        } else {
            console.log("data not found")
        }
    }

    let crtCunt = cartCount[0]

    useEffect(() => {
        getdatabuy();
    }, [crtCunt]);

    return (
        <>
            {cartData.length ? <div className='buynow_section'>
                <div className="buynow_container">
                    <div className="left_buy">
                        <h1>Shopping Cart</h1>
                        <p>select all items</p>
                        <span className='leftbuyprice'>Price</span>
                        <Divider />
                        {
                            cartData.map((e) => {
                                return (
                                    <div key={e.productId._id}>
                                        <div className="item_containert" >
                                            <img src={e.productId.detailUrl} alt="" />
                                            <div className="item_details">
                                                <h3>{e.productId.title.longTitle}</h3>
                                                <h3>{e.productId.title.shortTitle}</h3>
                                                <h3 className="diffrentprice">₹{e.productId.price.mrp}.00</h3>
                                                <p className="unusuall">Usually dispatch in 8 days. </p>
                                                <p>Eligible for FREE Shipping</p>
                                                <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" />
                                                <Option data={e.productId._id} quantity={e.quantity} />
                                            </div>
                                            <h3 className="item_price">₹{e.productId.price.cost}.00</h3>
                                        </div>
                                        <Divider/>
                                    </div>
                                )
                            })
                        }
                        <Subtotal items={cartData} />
                    </div>
                    <Right items={cartData} />
                </div>
            </div> : <Empty />
            }
        </>
    )
}

export default Buynow;