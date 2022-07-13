import React, { Component } from 'react';
import errorSrc from 'assets/images/error.png';

export class Alert extends Component {
  render() {
    const { error, color, text } = this.props;
    return (
      <div
        className="alert-box"
        style={{ backgroundColor: error ? 'red' : color }}
      >
        {error ? (
          <img src={errorSrc} alt="error" className="error-img" />
        ) : null}
        <span>{text}</span>
      </div>
    );
  }
}

export default Alert;
