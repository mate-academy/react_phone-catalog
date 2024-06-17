import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Navigation.module.scss';
import { Phone } from '../../types/PhoneType';
import { Accessories } from '../../types/AccessoriesType';
import { useAppContext } from '../../AppContext';
import { PageSection } from '../../types/PageSection';

type Props = {
  category: string;
  currentPage?: string;
  model: Phone | Accessories;
  back?: boolean;
};

export const Navigation: React.FC<Props> = ({
  category,
  currentPage,
  back,
  model,
}) => {
  const { setCurrentPage } = useAppContext();

  const location = useLocation();

  // Set currentPage when location changes
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentSection = pathSegments[1]; // Assuming path is '/category'

    switch (currentSection) {
      case 'phones':
        setCurrentPage(PageSection.Phones);
        break;
      case 'tablets':
        setCurrentPage(PageSection.Tablets);
        break;
      case 'accessories':
        setCurrentPage(PageSection.Accessories);
        break;
      default:
        setCurrentPage(PageSection.Home); // or any default section you prefer
        break;
    }
  }, [location.pathname, setCurrentPage]);

  return (
    <div className={classNames(styles.container, styles.navigation)}>
      <div className={styles.navigation__main}>
        <Link
          className={classNames(
            styles.navigation__icon,
            styles.navigation__home,
          )}
          to="/"
        />
        <span
          className={classNames(
            styles.navigation__icon,
            styles.navigation__arrow,
          )}
        />
        <Link
          className={classNames(styles.navigation__text, {
            [styles['navigation__text--current']]: currentPage,
          })}
          to={`/${model.category}`}
        >
          {category}
        </Link>

        {currentPage && (
          <>
            <span
              className={classNames(
                styles.navigation__icon,
                styles.navigation__arrow,
              )}
            />
            <span
              className={classNames(
                styles.navigation__text,
                styles['navigation__text-position'],
              )}
            >
              {model.name}
            </span>
          </>
        )}
      </div>

      {back && (
        <Link to={'../'} className={styles.navigation__back}>
          <span
            className={classNames(
              styles.navigation__icon,
              styles.navigation__arrow,
              styles['navigation__arrow--left'],
            )}
          />
          <span
            className={classNames(
              styles.navigation__text,
              styles['navigation__text--back'],
            )}
          >
            Back
          </span>
        </Link>
      )}
    </div>
  );
};
