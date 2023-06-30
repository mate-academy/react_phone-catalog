import { Link, useLocation } from 'react-router-dom';

import { capitalizeString } from '../../../helpers/stringOperations';
import home from '../../../assets/svg/home.svg';
import rightArrow from '../../../assets/svg/r_arrow.svg';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  const breadCrumbs = location.pathname.slice(1).split('/');

  return (
    <nav className="bread-crumbs" data-cy="breadCrumbs">
      <Link to="/home">
        <img className="bread-crumbs__icon" src={home} alt="Home icon" />
      </Link>

      {breadCrumbs.map((path, i) => (
        <div key={path}>
          <img className="bread-crumbs__icon--color-gray" src={rightArrow} alt="" />
          {i === breadCrumbs.length - 1 ? (
            <span>{capitalizeString(path)}</span>
          ) : (
            <Link className="bread-crumbs__link" to={`/${path}`}>
              {capitalizeString(path)}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
