import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.scss';
import { Phone } from '../../types/PhoneType';
import { Accessories } from '../../types/AccessoriesType';

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
          to={`../`}
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
