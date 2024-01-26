import { Link } from 'react-router-dom';

import './styles.scss';

import { homeIcon } from './libs';
import { useBreadcrumbs } from '../../hooks';
import { BreadCrumbType } from '../../types';
import { AppRoutes } from '../../enums';

type Props = {
  pageTitle?: string,
};

export const BreadCrumbs: React.FC<Props> = ({ pageTitle }) => {
  const home: BreadCrumbType = {
    title: homeIcon,
    path: AppRoutes.ROOT,
  };

  const breadCrumbs = useBreadcrumbs(home);
  const lastCrumbIndex = breadCrumbs.length - 1;

  return (
    <nav className="bread-crumbs" data-cy="breadCrumbs">
      <ul className="bread-crumbs__list">
        {breadCrumbs.map(({ title, path }, index) => (
          <li
            key={path}
            className="bread-crumbs__item"
          >
            {index !== lastCrumbIndex ? (
              <Link to={path} className="bread-crumbs__link">
                {title}
              </Link>
            ) : (
              pageTitle || title
            )}
          </li>

        ))}
      </ul>

    </nav>
  );
};
