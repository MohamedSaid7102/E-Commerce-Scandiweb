import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export class NavLinks extends Component {
  render() {
    const { links } = this.props;
    // const links = [
    //   { label: 'Women', path: 'women', id: '1' },
    //   { label: 'Men', path: 'men', id: '2' },
    //   { label: 'Kids', path: 'kids', id: '3' },
    // ];
    return (
      <ul className="nav__links">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-links__item active' : 'nav-links__item'
              }
              to={link.name}
            >
              {link.name}
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
