import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import { Cart } from './common/Cart';
import { Currency } from './common/Currency';
export class NavBar extends Component {
  render() {
    return (
      <nav className="nav-bar">
        {/* Categories */}
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav__item active' : 'nav__item'
              }
              to="women"
            >
              Women
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav__item active' : 'nav__item'
              }
              to="men"
            >
              Men
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav__item active' : 'nav__item'
              }
              to="kids"
            >
              Kids
            </NavLink>
          </li>
        </ul>
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo, Green bag with a white arrow inside"
            className="logo"
          />
        </Link>
        {/* Others */}
        <div className="nav__utils">
          <Currency />
          <Cart />
        </div>
      </nav>
    );
  }
}

export default NavBar;
