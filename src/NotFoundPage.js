import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import './slyles/notFoundPage.css';

const NotFoundPage = ({ searchStr }) => {
  if (searchStr) {
    return (<Redirect to="/phones" />);
  }

  return (
    <div className="notFound">
      <br /><br />
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ooops!</h2>
      <h2>You've got lost!</h2>
      <br />
      <p>TRY</p>
      <br />

      <div className="emergencyMenu">
        <NavLink to="/" exact className="menuLink">
          <div className="link">
            Home
          </div>
        </NavLink>

        <NavLink to="/phones" exact className="menuLink">
          <div className="link">
            Phones
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
