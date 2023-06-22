import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { capitalizeString } from '../../helpers/stringOperations';
import home from '../../assets/svg/home.svg';
import rightArrow from '../../assets/svg/r_arrow.svg';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const locationArray = pathname.slice(1).split('/');

  return (
    <nav className="bread-crumbs">
      <Link to="/">
        <img className="bread-crumbs__icon" src={home} alt="Home icon" />
      </Link>

      {locationArray.map((location, i) => {
        const isLast = i === locationArray.length - 1;

        return (
          <div key={location}>
            <img className="bread-crumbs__icon--gray" src={rightArrow} alt="" />
            {isLast ? (
              <span
                className={classNames('bread-crumbs__link', {
                  'bread-crumbs__link--active': isLast,
                })}
              >
                {capitalizeString(location)}
              </span>
            ) : (
              <Link
                className={classNames('bread-crumbs__link', {
                  'bread-crumbs__link--active': isLast,
                })}
                to={`/${location}`}
              >
                {capitalizeString(location)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
