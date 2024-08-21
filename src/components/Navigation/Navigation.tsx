import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './Navigation.module.scss';
import { Phone } from '../../types/PhoneType';
import { Accessories } from '../../types/Accessories';
import { useAppContext } from '../../AppContext';
import { Link, useLocation } from 'react-router-dom';
import { HeaderPageListsSection } from '../../types/PageForShow';

type Props = {
  category: string;
  currentPage?: string;
  model: Phone | Accessories;
  back?: boolean;
};

export const Navigation: React.FC<Props> = ({
  category,
  currentPage,
  model,
  back,
}) => {
  const { setCurrentPage } = useAppContext();
  const location = useLocation();

  // set current page when location is changed
  useEffect(() => {
    const pathSegment = location.pathname.split('/');
    const currentSegment = pathSegment[1];

    switch (currentSegment) {
      case 'phones':
        setCurrentPage(HeaderPageListsSection.Phones);
        break;
      case 'tablets':
        setCurrentPage(HeaderPageListsSection.Tablets);
        break;
      case 'accessories':
        setCurrentPage(HeaderPageListsSection.Accessories);
        break;
      default:
        setCurrentPage(HeaderPageListsSection.Home);
        break;
    }
  }, [location.pathname, setCurrentPage]);

  return (
    <div className={cn(styles.container, styles.navigation)}>
      <div className={styles.navigation__main}>
        <Link
          to="/"
          className={cn(styles.navigation__icon, styles.navigation__home)}
        />
        <span
          className={cn(styles.navigation__icon, styles.navigation__arrow)}
        />
        <Link
          to={`/${model.category}`}
          className={cn(styles.navigation__text, {
            [styles['navigation__text--current']]: currentPage,
          })}
        >
          {category}
        </Link>

        {currentPage && (
          <>
            <span
              className={cn(styles.navigation__icon, styles.navigation__arrow)}
            />
            <span
              className={cn(
                styles.navigation__text,
                styles['navigation__text--position'],
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
            className={cn(
              styles.navigation__icon,
              styles.navigation__arrow,
              styles['navigation__arrow--left'],
            )}
          />
          <span
            className={cn(
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
