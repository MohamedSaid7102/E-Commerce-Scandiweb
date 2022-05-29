import React, { Component } from 'react';
import { ReactComponent as PageNotFoundSVG } from 'assets/svgs/404.svg';
import { Link } from 'react-router-dom';

export class PageNotFound extends Component {
  render() {
    return (
      <div>
        <h1 className="not-found__hedding">LoL, You are LOST..!</h1>
        <PageNotFoundSVG style={{ width: '100%', padding: '2rem' }} />
        <Link to="/" className="btn-reset not-found__btn">
          Back To Home
        </Link>
      </div>
    );
  }
}

export default PageNotFound;
