import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

type Props = {
  currentPageTitle?: string | null;
};

export const Breadcrumbs: React.FC<Props> = ({ currentPageTitle }) => {
  const { pathname } = useLocation();
  const newPathName = pathname.split('/');

  const capitalizeTheTitle = (title: string) => {
    return title
      .split('-')
      .map(ch => (
        ch === 'iphone' ? 'iPhone' : ch.at(0)?.toUpperCase() + ch.slice(1)
      ))
      .join(' ');
  };

  return (
    <nav className="bread-crumbs">
      {newPathName.map((crumb, i) => {
        if (i === 0) {
          return (
            <React.Fragment key={crumb}>
              <Link to="/" className="bread-crumbs__home" key={crumb} />

              <div className="bread-crumbs__arrow" />
            </React.Fragment>
          );
        }

        if (i === newPathName.length - 1) {
          return (
            <p className="bread-crumbs__paragraph" key={crumb}>
              {currentPageTitle || capitalizeTheTitle(crumb)}
            </p>
          );
        }

        return (
          <React.Fragment key={crumb}>
            <Link to={`/${crumb}`} className="bread-crumbs__link" key={crumb}>{crumb}</Link>

            <div className="bread-crumbs__arrow" />
          </React.Fragment>
        );
      })}
    </nav>
  );
};

Breadcrumbs.defaultProps = {
  currentPageTitle: null,
};
