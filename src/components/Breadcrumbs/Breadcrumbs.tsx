import { memo } from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';
import { BreadcrumbsLinks } from './BreadcrumbsLinks';

export const Breadcrumbs = memo(() => {
  return (
    <div className="Breadcrumbs" data-cy="breadCrumbs">
      <ul className="Breadcrumbs__list">
        <li>
          <Link
            to="/home"
            className="Breadcrumbs__home-link"
            aria-label="home"
          />
        </li>
        <BreadcrumbsLinks />
      </ul>
    </div>
  );
});
