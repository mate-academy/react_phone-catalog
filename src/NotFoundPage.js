import React from 'react';
import './styles/homePage.css';

const NotFoundPage = ({ match }) => {
  if (match.path !== '/') {
    return (
      <h2 className="notfound-title">Error! Page url uncorrected</h2>
    );
  }
};

export default NotFoundPage;
