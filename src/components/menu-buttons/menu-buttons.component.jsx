import React from 'react';

import {Link} from 'react-router-dom'

import './menu-buttons.styles.css'

const MenuButtons = ({style, click}) => (
    <div className={style}>
        <Link className='header-buttons' to='/' onClick={click}>
            POČETNA
        </Link>
        <Link className='header-buttons' to='onama' onClick={click}>
            O NAMA
        </Link>
        <Link className='header-buttons' to='proizvodi' onClick={click}>
            PROIZVODI
        </Link>
        <Link className='header-buttons' to='kontakt' onClick={click}>
            KONTAKT
        </Link>
    </div>
)

export default MenuButtons