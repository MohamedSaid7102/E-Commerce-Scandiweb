import React, { Component } from 'react';
import { ClapSpinner } from 'components/common/Loading/ClapSpinner';

export class Loading extends Component {
  render() {
    return (
      <div className="loading-wrapper">
        <ClapSpinner size={30} color="#686769" loading={true} />
      </div>
    );
  }
}

export default Loading;
