import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

export class PDP extends Component {
  render() {
    return (
      // pdb: product description page
      <div className="pdb">
        {/* I made this in case we want to add more sections down in the future */}
        <Outlet />
      </div>
    );
  }
}

export default PDP;
