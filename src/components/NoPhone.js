import React from 'react';
import { Link } from 'react-router-dom';

const NoPhone = () => (
  <div>
    <h1>Unfortunatly there is no such phone anymore</h1>

    <img src="./img/boys_500.jpg" alt="sad boys" />

    <ul>
      <li>
        <Link to="/phones/">Back To Phone Catalog</Link>
      </li>

      <li>
        <Link to="/">Back To Home</Link>
      </li>
    </ul>
  </div>
);

export default NoPhone;
