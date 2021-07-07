import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import MenuButtons from '../menu-buttons/menu-buttons.component'

import Logo from '../../assets/logo.png'

import './header.styles.css'

function Header() {

    const [toggle, setToggle] = useState(false)

    const menuClass = toggle ? 'dropdown-show' : 'dropdown-hide';

    const toggleMenu = () => {
        setToggle(!toggle)
    }
    
    return(
            <div className="container">
                <div className='header'>
                    <div className="logo-holder" style={{backgroundImage: `url(${Logo})`}} />         
                    <div className="button-holder">
                        <button className="mobile-view" onClick={toggleMenu}>MENU</button>
                        <MenuButtons stil={"pc-buttons"} />
                    </div>
                    <div className="signin-holder">
                        <div className='header-buttons'>
                            {( () => {
                                if(localStorage.getItem('userLog') !== null) {
                                    return <Link to='/adminpanel'> PANEL </Link>
                                } else {
                                    return <Link to='/signin'> SIGN IN </Link>
                                }
                            }) ()}
                        </div>
                    </div>
                </div>
                <div className="drop-down">
                    <MenuButtons stil={`mob-buttons ${menuClass}`} click={toggleMenu} />
                </div>
            </div>
        )
    }

export default Header