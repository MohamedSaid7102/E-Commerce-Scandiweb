import React, { Component } from 'react';

export class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <ul className="navbar__nav">{this.props.children}</ul>
      </nav>
    );
  }
}

export default NavBar;
