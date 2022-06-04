import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { closeAllDropdowns } from 'Redux/actions/dropdownActions';
import { setModalState } from 'Redux/actions/modalActions';

export class Modal extends Component {
  render() {
    const { isModalOpen, isModalDark, closeAllDropdowns, setModalState } =
      this.props;
    return ReactDOM.createPortal(
      isModalOpen ? (
        <div
          id="modal"
          className={isModalDark ? 'dark' : ''}
          onClick={() => {
            closeAllDropdowns();
            setModalState(false, false);
          }}
        ></div>
      ) : null,
      document.getElementById('modal-container')
    );
  }
}

// Connecting to the global store.
const mapStateToProps = (state) => ({
  isModalOpen: state.modal.isModalOpen,
  isModalDark: state.modal.isModalDark,
});

export default connect(mapStateToProps, { closeAllDropdowns, setModalState })(
  Modal
);
