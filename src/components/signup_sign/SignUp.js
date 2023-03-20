import React, { useState } from 'react'
import{NavLink} from 'react-router-dom'

const SignUp = () => {

    const [udata,setUdata] = useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:""
    });
    // console.log(udata)

    const addData = (e) => {
        const {name,value}=e.target;
        setUdata(()=>{
            return{
               ...udata ,
               [name]:value
            }
        })
    }

    const sendData = async(e)=>{
        e.preventDefault();
        const {fname,email,mobile,password} = udata;

        const res = await fetch('/registeruser',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname,email,mobile,password
            })
        })

        const data = await res.json();
        console.log(data,res)

        if(res.status === 400){
            alert(`${data.message}`)
        }else if(res.status === 500){
            alert(`${data.message}`)
        }else{
            alert(`${data.message}`)
            setUdata({...udata, fname: "", email: "",
            mobile: "", password: ""})
        }
    }

  return (
    <section>
        <div className="sign_container">
            <div className="sign_header">
                <img src={require("../../images/blacklogoamazon.png")} alt="amazonlogo" />
            </div>
            <div className="sign_form">
                <form method='POST'>
                    <h1>Create Account</h1>
                    <div className="form_data">
                        <label htmlFor="fname">Your Name</label>
                        <input type="text"
                        onChange={addData}
                        value={udata.fname}
                        name='fname' id='fname' />
                    </div>
                    <div className="form_data">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                        onChange={addData}
                        value={udata.email}
                        name='email' id='email' />
                    </div>
                    <div className="form_data">
                        <label htmlFor="number">Mobile number</label>
                        <input type="number"
                        onChange={addData}
                        value={udata.mobile}
                        name='mobile' id='mobile' />
                    </div>
                    <div className="form_data">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        onChange={addData}
                        value={udata.password}
                        name='password' id='password' placeholder='At least 6 character' />
                    </div>
                    {/* <div className="form_data">
                        <label htmlFor="cpassword">Password Again</label>
                        <input type="password"
                        onChange={addData}
                        value={udata.cpassword}
                        name='cpassword' id='cpassword' />
                    </div> */}
                    <button className='signin_btn' onClick={sendData}>Continue</button>
                    <div className="signin_info">
                        <p>Already have an account?</p>
                        <NavLink to='/login'>Signin</NavLink>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default SignUp