import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export class NavLinks extends Component {
  render() {
    const links = this.props.links;
    return (
      <ul className='nav__links'>
        {links.map((link) => (
          <li key={link.id}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-links__item active' : 'nav-links__item'
              }
              to={link.path}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

NavLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
};

export default NavLinks;
