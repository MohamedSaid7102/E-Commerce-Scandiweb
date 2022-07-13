import React, { Component } from 'react';
import errorSrc from 'assets/images/error.png';
import { Link } from 'react-router-dom';

export class Alert extends Component {
  render() {
    const { error, color, text } = this.props;
    return (
      <Link
        to="cart"
        className="alert-box"
        style={{
          backgroundColor: error ? 'red' : color,
          textDecoration: 'none',
        }}
      >
        {error ? (
          <img src={errorSrc} alt="error" className="error-img" />
        ) : null}
        <span>{text}</span>
      </Link>
    );
  }
}

export default Alert;
