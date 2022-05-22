import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  render() {
    const { visible, dark, onClick } = this.props;
    return visible ? (
      <div id="modal" className={dark ? 'dark' : ''} onClick={onClick}></div>
    ) : null;
  }
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dark: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Modal;
