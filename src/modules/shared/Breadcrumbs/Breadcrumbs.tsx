import React, { useContext } from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { PagesPath } from '../../../types/PagesPath';
import { Arrow } from '../Icons/Arrow/Arrow';
import { ThemeContext } from '../../../store/ThemeProvider';
import classNames from 'classnames';
import { Home } from '../Icons/Home';

type Props = {};

export const Breadcrumbs: React.FC<Props> = () => {
  const { isThemeDark } = useContext(ThemeContext);
  const { pathname } = useLocation();

  const productsPath = pathname.split('/')[1];
  const productPath = pathname.split('/')[2] || null;

  return (
    <div className={styles.Breadcrumbs}>
      <Link to={PagesPath.Home} className={styles.Breadcrumbs__home}>
        <Home />
      </Link>

      {productPath ? (
        <>
          <Link
            to={`/${productsPath}`}
            className={classNames(styles.Breadcrumbs__link, {
              [styles.Breadcrumbs__link_darkTheme]: isThemeDark,
            })}
          >
            <Arrow orientation="right" colorSecondary={true} />

            <span
              className={classNames(styles.Breadcrumbs__link_text, {
                [styles.Breadcrumbs__link_text_darkTheme]: isThemeDark,
              })}
            >
              {productsPath}
            </span>
          </Link>

          <p
            className={`${styles.Breadcrumbs__link} ${styles.Breadcrumbs__link_disabled}`}
          >
            <Arrow orientation="right" colorSecondary={true} />

            {productPath.split('-').join(' ')}
          </p>
        </>
      ) : (
        <p
          className={classNames(
            styles.Breadcrumbs__link,
            styles.Breadcrumbs__link_disabled,
            {
              [styles.Breadcrumbs__link_darkTheme]: isThemeDark,
              [styles.Breadcrumbs__link_disabled_darkTheme]: isThemeDark,
            },
          )}
        >
          <Arrow orientation="right" colorSecondary={true} />

          {productsPath}
        </p>
      )}
    </div>
  );
};
