import React, { Component } from 'react';

export class NavItem extends Component {
  render() {
    const { onClick, content, showChildren } = this.props;
    return (
      <li
        className="nav-item"
        onClick={() => (typeof onClick === 'function' ? onClick() : null)}
      >
        {content}
        {/* if showChildren prop passed as true, that means this tab is clicked and we should render it's children */}
        {showChildren && this.props.children}
      </li>
    );
  }
}

export default NavItem;
