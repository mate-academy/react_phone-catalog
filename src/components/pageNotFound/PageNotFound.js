import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const PageNotFound = ({ match }) => {
  if (match.location === '/'
    || match.location === '/catalog'
    || match.location === '/cart') {
    return null;
  }

  return (
    <div>
      <h1>Page not found</h1>
      <NavLink className="nav-link" to="/">U may go to the main page</NavLink>
    </div>
  );
};

PageNotFound.propTypes = {
  match: PropTypes.shape({
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default PageNotFound;
