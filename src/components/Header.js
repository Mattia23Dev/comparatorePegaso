import React from 'react'
import logo from '../imgs/LOGO_COMPARA_CORSI_COLOR-2048x289.webp';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
        <img src={logo} alt='logo comparacorsi' />
    </div>
  )
}

export default Header