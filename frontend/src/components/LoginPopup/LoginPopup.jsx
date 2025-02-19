import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify';


const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Đăng nhập")
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState === "Đăng nhập") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      console.log(response.data)
      alert(response.data.message)
      toast.success(response.data.message);
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    } else {
      alert(response.data.message)
      toast.error(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Đăng nhập" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Tên của bạn' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Nhập email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Mật khẩu' required />
        </div>
        <button type='submit'>{currState === "Đăng ký" ? "Tạo tài khoản" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuingm, I agree to the terms of use & priacy policy.</p>
        </div>
        {currState === "Đăng nhập"
          ? <p>Create a new account? <span onClick={() => setCurrState("Đăng ký")}>Click here.</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Đăng nhập")}>Login here.</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup