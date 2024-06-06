import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './BreadCrumb.scss';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { getIconSrc } from '../../../helpers/getIconSrc';
import { ThemeContext } from '../../../contexts/ThemeContext/ThemeContext';

export const BreadCrumb: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const breadcrumbs = useBreadcrumbs();
  const currentPath = useLocation().pathname;

  return (
    <div className="breadcrumb">
      <Link to="/" className="breadcrumb__home">
        <img src={getIconSrc('home', theme)} alt="favorites" className="icon" />
      </Link>

      {breadcrumbs.slice(1).map(({ match, breadcrumb }) => (
        <React.Fragment key={match.pathname}>
          <img
            src={getIconSrc('arrow-next-disabled', theme)}
            className="icon breadcrumb__arrow"
          />

          <NavLink
            to={match.pathname}
            className={classNames('breadcrumb__title small-text', {
              'breadcrumb__title--active': currentPath === match.pathname,
            })}
          >
            {breadcrumb}
          </NavLink>
        </React.Fragment>
      ))}
    </div>
  );
};
