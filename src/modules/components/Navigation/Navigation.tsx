import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.scss';

type Props = {
  category: string;
  name?: string;
  back?: boolean;
};

export const Navigation: React.FC<Props> = ({ category, name, back }) => {
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
            [styles['navigation__text-white']]: name,
          })}
          to={`../${category}`}
        >
          {category}
        </Link>

        {name && (
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
              {name}
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
              styles['navigation__arrow-left'],
            )}
          />
          <span
            className={classNames(
              styles.navigation__text,
              styles['navigation__text-white'],
            )}
          >
            Back
          </span>
        </Link>
      )}
    </div>
  );
};
