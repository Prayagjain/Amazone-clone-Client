import React,{useContext, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import { Logincontext } from '../context/ContextProvider';
import './signIn.css'


const Sign_in = () => {

    const {  setAccount } = useContext(Logincontext)

    const history = useNavigate("")

    const [logdata,setData] = useState({
        email:"",
        password:""
    })

    const addData = (e) => {
        const {name,value} = e.target

        setData(()=>{
            return {
                ...logdata,
                [name]:value
            }
        })
    }

    const sendData = async(e)=>{
        e.preventDefault();
        const {email,password} = logdata;

        const res = await fetch('/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        })

        const data = await res.json();
        if(res.status === 200){
            setAccount(data.userName)
            history("/")
        }else{
            alert(`${data.message}`)
            setData({...logdata, email: "", password: ""})
        }
    }

  return (
    
    <section>
        <div className="sign_container">
            <div className="sign_header">
                <img src={require("../../images/blacklogoamazon.png")} alt="amazonlogo" />
            </div>
            <div className="sign_form">
                <form method='POST' >
                    <h1>Sign-In</h1>
                    <div className="form_data">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                        onChange={addData}
                        value={logdata.email}
                        name='email' id='email' />
                    </div>
                    <div className="form_data">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        onChange={addData}
                        value={logdata.password}
                        name='password' id='password' placeholder='At least 6 character' />
                    </div>
                    <button className='signin_btn' onClick={sendData}>Continue</button>
                </form>
            </div>
            <div className="create_accountinfo">
                <p>New To Amazon</p>
                <NavLink to="/register"><button>Create Your Amazon Account</button></NavLink>
            </div>
        </div>
    </section>
    
  )
}

export default Sign_in