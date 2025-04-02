import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import breadcrumbsStyles from './Breadcrumbs.module.scss';
import { IconSvg } from '../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import { getCapitalizationFirstLetter } from '../../helpers/stringHelper';

export const Breadcrumbs = () => {
  const location = useLocation();

  console.log(location.pathname.split('/'));

  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className={breadcrumbsStyles.breadcrumbs}>
      <ul className={breadcrumbsStyles.breadcrumbs__list}>
        <li>
          <Link
            to={ROUTES.HOME}
            className={breadcrumbsStyles.breadcrumbs__link}
          >
            <IconSvg dataPath={ICON_DATA_PATHS.HOME} />
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className={breadcrumbsStyles.breadcrumbs__item}>
              <IconSvg
                dataPath={ICON_DATA_PATHS.ARROW.RIGHT}
                className={breadcrumbsStyles.breadcrumbs__separator}
              />
              {isLast ? (
                <span
                  className={`${breadcrumbsStyles.breadcrumbs__link} ${breadcrumbsStyles['breadcrumbs__link--is-last']}`}
                >
                  {getCapitalizationFirstLetter(name)}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className={breadcrumbsStyles.breadcrumbs__link}
                >
                  {getCapitalizationFirstLetter(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
