import { NavLink } from 'react-router-dom';

import './PageNotFound.scss';

export const PageNotFound = () => (
  <div className="page-not-found">
    <h1 className="page-not-found--title">
      It looks like you`re lost
    </h1>

    <h1 className="page-not-found--subtitle">
      So let`s just go to the
      <NavLink
        to="/"
        className="page-not-found--link"
      >
        &nbsp;
        Home
      </NavLink>
    </h1>
  </div>
);
