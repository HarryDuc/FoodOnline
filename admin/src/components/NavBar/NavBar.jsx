import React from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets'

const NavBar = () => {
  return (
    <div>
        <div className="navbar">
            <img className='logo' src={assets.logo} alt="" />
            <img className='profile' src={assets.profile_image} alt="" />
        </div>
    </div>
  )
}

export default NavBar