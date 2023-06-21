import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { capitalizeString } from '../../helpers/stringOperations';
import home from '../../assets/home.svg';
import rightArrow from '../../assets/r_arrow.svg';
import './BreadCrumbs.scss';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const locationArray = pathname.slice(1).split('/');

  return (
    <nav className="bread-crumbs">
      <Link to="/">
        <img className="bread-crumbs__icon" src={home} alt="Home icon" />
      </Link>

      {locationArray.map((location, i) => (
        <div key={location}>
          <img className="bread-crumbs__icon--gray" src={rightArrow} alt="" />
          <Link className={classNames('bread-crumbs__link', { 'bread-crumbs__link--active': i === locationArray.length - 1 })} to={`/${location}`}>
            {capitalizeString(location)}
          </Link>
        </div>
      ))}
    </nav>
  );
};
