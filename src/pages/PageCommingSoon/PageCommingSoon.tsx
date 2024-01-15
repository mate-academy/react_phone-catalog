/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable global-require */
import { Link } from 'react-router-dom';
import './PageCommingSoon.scss';

const image = [
  require('../../assets/others/comming-soon.png'),
];

export const PageCommingSoon = () => {
  return (
    <div className="page-not-found">
      <h1 className="page-not-found__title title">
        Products are comming soon
      </h1>
      <img src={image[0]} alt="" className="page-not-found__image" />

      <Link to="/">
        <button className="page-not-found__button" type="button">
          Back to Home
        </button>
      </Link>
    </div>
  );
};
