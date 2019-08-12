import React from 'react';
import { Link } from 'react-router-dom';

const NoPhone = () => (
  <main className="main-container">
    <h1>Unfortunatly there is no such phone anymore</h1>

    <div>
      <img
        src="./img/boys_500.jpg"
        alt="sad boys"
        className="nophone__image"
      />

      <ul className="nophone__link-list">
        <li>
          <Link
            className="button"
            to="/phones"
          >
              Back To Phone Catalog
          </Link>
        </li>

        <li>
          <Link
            className="button"
            to="/"
          >
            Back To Home
          </Link>
        </li>
      </ul>
    </div>
  </main>
);

export default NoPhone;
