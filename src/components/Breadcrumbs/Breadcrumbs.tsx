import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';
import { BreadcrumbsParts } from './BreadcrumbsParts';

export const Breadcrumbs = () => {
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
        <BreadcrumbsParts />
      </ul>
    </div>
  );
};
