import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Logo extends Component {
  render() {
    return (
      <Link to="/">
        <img src={this.props.logo} alt={this.props.logoAlt} className="logo" />
      </Link>
    );
  }
}

Logo.propTypes = {
  logo: PropTypes.string.isRequired,
  logoAlt: PropTypes.string.isRequired,
};

export default Logo;
