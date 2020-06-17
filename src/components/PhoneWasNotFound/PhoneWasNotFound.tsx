import React from 'react';
import './PhoneWasNotFound.scss';

import { Link } from 'react-router-dom';

export const PhoneWasNotFound: React.FC = () => {
  return (
    <div className="PhoneWasNotFound PhoneWasNotFoundContainer">
      <h1
        className="PhoneWasNotFound__Title"
      >
        Product page not found
      </h1>
      <div className="PhoneWasNotFound__Wrap">
        <img
          src="./img/cat_404.png"
          alt="404"
          className="PhoneWasNotFound__Img"
        />
      </div>
      <p className="PhoneWasNotFound__Text">
        Sorry, we couldn&apos;t find the product.
        <br />
        We suggest that you return to main sections.
      </p>
      <Link to="/">
        <button
          type="button"
          className="PhoneWasNotFound__Btn"
        >
          Go to the home page
        </button>
      </Link>
    </div>
  );
};
