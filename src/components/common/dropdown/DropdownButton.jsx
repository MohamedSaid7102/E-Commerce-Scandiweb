import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as TopArrow } from 'assets/svgs/top-arrow.svg';
import { ReactComponent as DownArrow } from 'assets/svgs/down-arrow.svg';

export class DropdownButton extends Component {
  render() {
    const {
      onClick,
      opened,
      label,
      itemsCount,
      showTopDownArrows = false,
    } = this.props;
    return (
      <button className="btn-reset btn--dropdown" onClick={onClick}>
        {typeof itemsCount === 'number' && itemsCount > 0 && (
          <span className="items-count-badge">{itemsCount}</span>
        )}
        {label}
        {showTopDownArrows ? opened ? <TopArrow /> : <DownArrow /> : null}
      </button>
    );
  }
}

DropdownButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  itemsCount: PropTypes.number,
};

export default DropdownButton;
