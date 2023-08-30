import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { makeTitle } from '../../helpers/makeTitle';

import './Breadcrumbs.scss';

export const Breadcrumbs: FC = () => {
  const { pathname } = useLocation();

  const pathnameSegments = pathname.split('/')
    .filter(segment => segment !== '');

  const breadcrumbs = pathnameSegments.map((segment, index) => {
    const link = index === pathnameSegments.length - 1
      ? null
      : `/${pathnameSegments.slice(0, index + 1).join('/')}`;

    return { title: makeTitle(segment), link };
  });

  return (
    <nav data-cy="breadCrumbs" className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link
            to="/"
          >
            <Icon type="home" />
          </Link>
        </li>

        {breadcrumbs.map(({ title, link }) => (
          <li className="breadcrumbs__item" key={title}>
            <Icon type="arrow-right-disabled" />

            {link ? (
              <Link
                to={link}
                className="breadcrumbs__text"
              >
                {title}
              </Link>
            ) : (
              <span className="breadcrumbs__text breadcrumbs__text--active">
                {title}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
