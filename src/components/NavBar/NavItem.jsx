import React, { Component } from 'react';

export class NavItem extends Component {
  render() {
    return (
      <li className="nav-item">
        {this.props.content}
        {/* if open prop passed as true, that means this tab is clicked and we should render it's children */}
        {this.props.open && this.props.children}
      </li>
    );
  }
}

export default NavItem;
