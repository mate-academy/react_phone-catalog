import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { generateBreadcrumbs } from '../../helpers/generateBreadcrumbs';

import arrowRightGray from '../../images/arrows/arrow-right-gray.svg';
import homeIcon from '../../images/home.svg';

import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const pathSegments = location.pathname
    .split('/')
    .filter((segment) => segment !== '');

  const breadcrumbs = generateBreadcrumbs(pathSegments);

  return (
    <nav className="breadcrumbs" data-cy="breadCrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">
            <img src={homeIcon} alt="home icon" className="breadcrumbs__icon" />
          </Link>
        </li>

        {breadcrumbs.length !== 0 && <img src={arrowRightGray} alt="" />}

        {breadcrumbs.map((breadcrumb, index) => {
          const isLastBreadcrumb = index === pathSegments.length - 1;
          const itemClasses = cn('breadcrumbs__item', {
            active: isLastBreadcrumb,
          });

          return (
            <Fragment key={breadcrumb.link}>
              {isLastBreadcrumb ? (
                <li key={breadcrumb.link} className={itemClasses}>
                  {breadcrumb.label}
                </li>
              ) : (
                <>
                  <li key={breadcrumb.link} className={itemClasses}>
                    <Link to={breadcrumb.link}>{breadcrumb.label}</Link>
                  </li>
                  {breadcrumbs.length !== 0 && (
                    <img src={arrowRightGray} alt="arrow right" />
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
