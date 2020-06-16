import React from 'react';
import './NotFoundPage.scss';

import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="NotFoundPage NotFoundPageContainer">
      <h1
        className="NotFoundPage__Title"
      >
        Page not found
      </h1>
      <div className="NotFoundPage__Wrap">
        <img
          src="./img/cat_404.png"
          alt="404"
          className="NotFoundPage__Img"
        />
      </div>
      <p className="NotFoundPage__Text">
        Sorry, we couldn&apos;t find the page you were looking for.
        <br />
        We suggest that you return to main sections.
      </p>
      <Link to="/">
        <button
          type="button"
          className="NotFoundPage__Btn"
        >
          Go to the home page
        </button>
      </Link>
    </div>
  );
};
