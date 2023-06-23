import { Link, useLocation } from 'react-router-dom';

import { capitalizeString } from '../../helpers/stringOperations';
import home from '../../assets/svg/home.svg';
import rightArrow from '../../assets/svg/r_arrow.svg';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  const pathArray = location.pathname.slice(1).split('/');
  const breadCrumbs = location.state
    ? [location.state.prevPath, pathArray.at(-1)]
    : pathArray;

  return (
    <nav className="bread-crumbs">
      <Link to="/home">
        <img className="bread-crumbs__icon" src={home} alt="Home icon" />
      </Link>

      {breadCrumbs.map((path, i) => (
        <div key={path}>
          <img className="bread-crumbs__icon--gray" src={rightArrow} alt="" />
          {i === breadCrumbs.length - 1 ? (
            <span className="bread-crumbs__text">{capitalizeString(path)}</span>
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
