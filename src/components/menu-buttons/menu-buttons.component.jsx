import React from 'react';

import {Link} from 'react-router-dom'

import './menu-buttons.styles.css'

const MenuButtons = ({stil, click}) => (
    <div className={stil}>
        <Link className='header-buttons' to='/' onClick={click}>
            POČETNA
        </Link>
        <Link className='header-buttons' to='/onama' onClick={click}>
            O NAMA
        </Link>
        <Link className='header-buttons' to='/galerija' onClick={click}>
            GALERIJA
        </Link>
        <Link className='header-buttons' to='/kontakt' onClick={click}>
            KONTAKT
        </Link>
    </div>
)

export default MenuButtons