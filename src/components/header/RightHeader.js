import React, { useContext } from 'react'
import Avatar from "@mui/material/Avatar"
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { Logincontext } from '../context/ContextProvider'
import './rightheader.css'

const RightHeader = ({ logClose, userLogout }) => {
    const { account, setAccount } = useContext(Logincontext)
    return (
        <>
            <div className="rightheader">
                <div className="right_nav">
                    {
                        account ?
                            <Avatar className='avtar2'>{account[0].toUpperCase()}</Avatar> :
                            <Avatar className='avtar'></Avatar>
                    }
                    {
                    account ?
                    <h3>Hello,{account.toUpperCase()}</h3> : 
                    ""
                    }
                </div>
                <div className="nav_btn" onClick={() => logClose()}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to='/'>Shop By Category</NavLink>
                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />
                    <NavLink to="/">today's Deal</NavLink>
                    {
                        account ? <NavLink to='/buynow'>Your Orders</NavLink> :
                            <NavLink to='/login'>Your Orders</NavLink>
                    }
                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />
                    <div className="flag">
                        <NavLink to='/'>Settings</NavLink>
                        <img src={require("../../../src/images/india.png")} style={{ width: 35, marginLeft: 10 }} alt="" />
                    </div>
                    {
                        account ?
                            <div className="flag" onClick={() => userLogout()}>
                                <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                                <h3 style={{ cursor: "pointer", fontWeight: 500 }}>LogOut</h3>
                            </div> :
                            <NavLink to="/login">SignIn</NavLink>
                    }
                </div>
            </div>
        </>
    )
}

export default RightHeader