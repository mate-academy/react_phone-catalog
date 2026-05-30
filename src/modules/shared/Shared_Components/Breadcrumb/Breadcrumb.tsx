import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';
import classNames from 'classnames';

interface Props {
  arrayOfPages: string[];
}

export const Breadcrumb: React.FC<Props> = ({ arrayOfPages }) => {
  const { isDark } = useContext(DarkModeContext);

  return (
    <div className="breadcrumb">
      <Link
        to="/"
        className={classNames('breadcrumb__link breadcrumb__link--home', {
          'breadcrumb__link--home-is-Dark': isDark,
        })}
      />

      {arrayOfPages.map(page => (
        <React.Fragment key={page}>
          <div className="breadcrumb__arrow" />

          <Link
            to={`/${page}`}
            className={classNames('breadcrumb__link', {
              'breadcrumb__link--is-Dark': isDark,
              'breadcrumb__link--is-Dark-Active':
                isDark && page === arrayOfPages[arrayOfPages.length - 1],
              'breadcrumb__link--active':
                page === arrayOfPages[arrayOfPages.length - 1],
            })}
          >
            {page}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};
