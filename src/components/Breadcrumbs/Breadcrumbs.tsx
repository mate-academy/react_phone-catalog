/* eslint-disable no-return-assign */
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const getCrumbs = useMemo(() => {
    let currentLink = '';

    return pathname
      .split('/')
      .filter((path) => path !== '')
      .map((path) => {
        const pathName = path.charAt(0).toUpperCase() + path.slice(1);
        const pathNameWithSpace = pathName.replaceAll('-', ' ');

        currentLink += `/${path}`;

        return (
          <li className="breadcrumbs__item" key={pathNameWithSpace}>
            <Link
              to={currentLink}
              className={cn('breadcrumbs__link', {
                'breadcrumbs__link--disabled': pathname === currentLink,
              })}
            >
              {pathNameWithSpace}
            </Link>
          </li>
        );
      });
  }, [pathname]);

  return (
    <section className="section breadcrumbs">
      <div className="section__container">
        <ul
          className="text text--size-2 breadcrumbs__items"
          data-cy="breadCrumbs"
        >
          <li className="breadcrumbs__item">
            <Link to="/" className="breadcrumbs__link">
              <picture>
                <img
                  className="breadcrumbs__icon"
                  src="./img/breadcrumbs.svg"
                  alt="breadcrumbs"
                  loading="lazy"
                />
              </picture>
            </Link>
          </li>
          {getCrumbs}
        </ul>
      </div>
    </section>
  );
};
