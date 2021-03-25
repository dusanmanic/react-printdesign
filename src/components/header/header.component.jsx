import React from 'react'
import {Link} from 'react-router-dom'

import MenuButtons from '../menu-buttons/menu-buttons.component'

import Logo from '../../assets/logo.png'

import './header.styles.css'

export class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            toggle: false
        }
    }

    toggleMenu = () => {
        this.setState({
          toggle: !this.state.toggle
        })
      }

    render() {

        const menuClass = this.state.toggle ? 'dropdown-show' : 'dropdown-hide';

        return(
            <div className="container">
                <div className='header'>
                    <div className="logo-holder" style={{backgroundImage: `url(${Logo})`}} />        
                    <div className="button-holder">
                        <button className="mobile-view" onClick={this.toggleMenu}>MENU</button>
                        <MenuButtons style={"pc-buttons"} />
                    </div>
                    <div className="signin-holder">
                        <Link className='header-buttons' to='signin'>
                            SIGN IN
                        </Link>
                    </div>
                </div>
                <div className="drop-down">
                    <MenuButtons style={`mob-buttons ${menuClass}`} click={this.toggleMenu} />
                </div>
            </div>
        )
    }
}