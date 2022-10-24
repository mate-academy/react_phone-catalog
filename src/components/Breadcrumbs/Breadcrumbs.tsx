import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav className="breadcrumbs" data-cy="breadCrumbs">
      <ul className="breadcrumbs__list">
        {breadcrumbs.map(({ breadcrumb, match }, index, array) => (
          <li key={match.pathname} className="breadcrumbs__item">
            <Link
              to={match.pathname}
              className={classNames(
                'breadcrumbs__link',
                { 'breadcrumbs__link--disabled': array.length - 1 === index },
              )}
            >
              {index === 0
                ? <div className="breadcrumbs__link-home" />
                : breadcrumb}
            </Link>
            {array.length - 1 === index
              ? ''
              : <div className="breadcrumbs__separator" />}
          </li>
        ))}
      </ul>
    </nav>
  );
};
