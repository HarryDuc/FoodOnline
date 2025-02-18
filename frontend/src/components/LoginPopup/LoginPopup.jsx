import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
const LoginPopup = ({ setShowLogin }) => {

  const [currState, setCurrState] = useState("Đăng nhập")

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Đăng nhập" ? <></> : <input type='text' placeholder='Tên của bạn' required />}
          <input type="email" placeholder='Nhập email' required />
          <input type="password" placeholder='Mật khẩu' required />
        </div>
        <button>{currState === "Đăng ký" ? "Tạo tài khoản" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuingm, I agree to the terms of use & priacy policy.</p>
        </div>
        {currState === "Đăng nhập"
          ? <p>Create a new account? <span onClick={()=>setCurrState("Đăng ký")}>Click here.</span></p>
          : <p>Already have an account? <span onClick={()=>setCurrState("Đăng nhập")}>Login here.</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup