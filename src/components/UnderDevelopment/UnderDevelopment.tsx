import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  page: string;
};

export const UnderDevelopment: React.FC<Props> = ({ page }) => (
  <main className="main main--not-found">
    <h1 className="main__title">
      Oops!
    </h1>
    <div className="main__text">
      Apologies for the inconvenience, but the
      <span className="main__span">
        {` ${page} `}
      </span>
      are not available yet!
      <br />
      We appreciate your understanding.
    </div>
    <div className="main__text">
      Perhaps you would like to navigate to the
      <Link to="/">
        <span className="main__span"> Home page </span>
      </Link>
      ?
    </div>
  </main>
);
