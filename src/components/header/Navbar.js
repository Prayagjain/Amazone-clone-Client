import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IconButton, Drawer } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { Logincontext } from '../context/ContextProvider';
import RightHeader from './RightHeader';
import { useSelector ,useDispatch} from 'react-redux';
import { fState,emptyCount } from '../../store/slice/CartCounter';


const Navbar = () => {

  const dispatch = useDispatch();

  const { account, setAccount } = useContext(Logincontext);
  

  const [dropen, setDropen] = useState(false)
  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  const [liOpen, setliOpen] = useState(true);

  const products = useSelector(state => state.products)[0];
  const cartCount = useSelector(state => state.cart);

  const getCartData = async () => {
    const getCart = await fetch(`/getcartdata`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data1 = await getCart.json()
    if (getCart.status === 200) {
      let count = 0
      for (let i = 0; i < data1.data.items.length; i++) {
        count = count + data1.data.items[i].quantity
      }
      dispatch(fState(count))
    } else {
      dispatch(fState(0))
    }
  }

  const handleopen = () => {
    setDropen(true)
  }

  const handleDrClose = () => {
    setDropen(false)
  }

  const userLogout = async () => {
    handleDrClose()
    const uLogout = await fetch(`/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (uLogout.status === 201) {
      history("/login")
      dispatch(emptyCount())
      setAccount("")
    } else {
      setAccount("")
    }
  };

  const getUserData = async () => {
    handleDrClose()
    const uLogout = await fetch(`/getuserdata`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data2 = await uLogout.json()
    if (uLogout.status === 200) {
      setAccount(data2.userName)
    } else {
      setAccount("")
    }
  };

  const getText = (items) => {
    setText(items)
    setliOpen(false)
  }

  useEffect(() => {
    getCartData()
    getUserData()
    // eslint-disable-next-line
  }, [account])

  return (
    <>
    { cartCount.length &&
    <header>
      <nav>
        <div className="left">
          <IconButton className='hamburgur' onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handleDrClose}>
            <RightHeader logClose={handleDrClose} userLogout={userLogout} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/"><img src={require("../../../src/images/amazon_PNG25.png")} alt="" /></NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name=""
              onChange={(e) => getText(e.target.value)}
              placeholder='Search Your Products'
              id="" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
            {
              text &&
              <List className='extrasearch' hidden={liOpen}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map((product,i) => (
                    <ListItem key={i}>
                      <NavLink to={`/getproductsone/${product.id}`} onClick={() => setliOpen(true)}>
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))
                }
              </List>
            }
          </div>
        </div>
        <div className="right">
          {
            account ? <div className="nav_btn">
             <NavLink to="#">Hello, {account.toUpperCase()}</NavLink>
            </div> :
              <div className="nav_btn">
                <NavLink to="/login">SignIn</NavLink>
              </div>
          }
          {
            account ? <NavLink to="/buynow">
              <div className="cart_btn">
                <Badge badgeContent={"" + cartCount[0]} color="secondary">
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>

                <p>Cart</p>
              </div>
            </NavLink> : <NavLink to="/login">
              <div className="cart_btn">
                <Badge badgeContent={"0"} color="secondary">
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>
                <p>Cart</p>
              </div>
            </NavLink>
          }
          {
            account ? <Avatar className='avtar2'
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >{account[0].toUpperCase()}</Avatar> :
              <Avatar className='avtar'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              ></Avatar>
          }
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ? <MenuItem onClick={userLogout}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem> : ""
            }
          </Menu>
        </div>
      </nav>
    </header>
}
    </>
  )
}

export default Navbar