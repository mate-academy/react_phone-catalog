import React from 'react';
import './PageNotFound.scss';
import notFoundImage from '../../../public/img/product-not-found.png';
import { Link } from 'react-router-dom';
import home from '../../images/icons/home.svg';

export const PageNotFound: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="page-not-found">
      <Link to="/" className="page-not-found__link">
        <img src={home} alt="Home" className="page-not-found__icon" /> Back to
        Home
      </Link>
      <h2 className="page-not-found__title">{message || 'Page not found'}</h2>
      <img
        src={notFoundImage}
        alt="Not found"
        className="page-not-found__image"
      />
    </div>
  );
};
