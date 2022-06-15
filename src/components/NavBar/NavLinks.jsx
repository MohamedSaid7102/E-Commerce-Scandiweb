import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class NavLinks extends Component {
  render() {
    const { links, onClick } = this.props;
    return (
      <ul className="nav__links">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-links__item active' : 'nav-links__item'
              }
              to={link + '-products'}
              onClick={() => onClick(link)}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default NavLinks;
