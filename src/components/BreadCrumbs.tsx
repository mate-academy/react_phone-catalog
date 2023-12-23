import React, { Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import cn from 'classnames';
import './BreadCrumbs.scss';
import { getBreadCrumbs } from '../helpers/generateBreadCrumbs';

export const BreadCrumbs: React.FC = () => {
  const location = useLocation();

  const pathNames = location.pathname
    .split('/')
    .filter((category) => category !== '');

  const breadCrumbs = getBreadCrumbs(pathNames);

  return (
    <nav className="breadCrumbs">
      <ul className="breadCrumbs__list">
        <li className="breadCrumbs__item">
          <Link to="/">
            <div className="breadCrumbs__icon" />
          </Link>
        </li>

        {breadCrumbs.length !== 0 && (<div className="breadCrumbs__arrow" />)}

        {breadCrumbs.map((breadCrumb, index) => {
          const isLast = index === pathNames.length - 1;
          const itemClasses = cn('breadCrumbs__item', {
            active: isLast,
          });

          return (
            <Fragment key={breadCrumb.link}>
              {isLast ? (
                <li className={itemClasses} key={breadCrumb.link}>
                  {breadCrumb.label}
                </li>
              ) : (
                <>
                  <li className={itemClasses} key={breadCrumb.link}>
                    <Link
                      to="/phones"
                      className="breadCrumbs__item--link"
                    >
                      {breadCrumb.label}
                    </Link>
                  </li>

                  {breadCrumbs.length !== 0 && (
                    <div className="breadCrumbs__arrow" />
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
