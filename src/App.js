
import './App.css';
import Navbar from './components/header/Navbar'
import Newnav from './components/newnavbar/newnav'
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import SignIn from './components/signup_sign/Sign_in';
import SignUp from './components/signup_sign/SignUp';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import{Routes,Route} from "react-router-dom"
import { useState } from 'react';

function App() {
  const [data,setData] = useState("")
  return (
    <>
    <Navbar setData={setData}/>
    <Newnav/>
    <Routes>
      <Route path="/" element={<Maincomp/>} />
      <Route path="/login" element={<SignIn data={data}/>} />
      <Route path="/register" element={<SignUp />} />
      <Route path='/getproductsone/:id' element={<Cart/>}/>
      <Route path='/buynow' element={<Buynow/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;