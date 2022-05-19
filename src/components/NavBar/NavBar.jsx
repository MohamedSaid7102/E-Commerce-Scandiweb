import React, { Component } from 'react';

export class NavBar extends Component {
  render() {
    return <nav className="navbar">{this.props.children}</nav>;
  }
}

export default NavBar;
