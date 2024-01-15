/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable global-require */
import { Link } from 'react-router-dom';
import './PageNotFound.scss';

const image = [
  require('../../assets/others/not-found.png'),
];

export const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1 className="page-not-found__title title">Page not found</h1>
      <img src={image[0]} alt="" className="page-not-found__image" />

      <Link to="/">
        <button className="page-not-found__button" type="button">
          Back to Home
        </button>
      </Link>
    </div>
  );
};
