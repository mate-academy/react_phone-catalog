import React from 'react';
import classNames from 'classnames';

import styles from './Controls.module.scss';

type Props = {
  className?: string;
};

export const ControlsSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(styles.controls, className)}>
      <div className={classNames(styles.controls__colors, styles.colors)}>
        <div
          className={classNames(
            styles['controls__sub-title'],
            styles['controls__sub-title--loading'],
          )}
        ></div>
        <ul className={styles.colors__list}>
          {[...Array(3)].map((_, i) => (
            <li
              key={i}
              className={classNames(
                styles.colors__item,
                styles['colors__item--loading'],
              )}
            ></li>
          ))}
        </ul>
      </div>

      <div
        className={classNames(styles.controls__capacities, styles.capacities)}
      >
        <div
          className={classNames(
            styles['controls__sub-title'],
            styles['controls__sub-title--loading'],
          )}
        ></div>
        <ul className={styles.capacities__list}>
          {[...Array(3)].map((_, i) => (
            <li
              key={i}
              className={classNames(
                styles.capacities__item,
                styles['capacities__item--loading'],
              )}
            ></li>
          ))}
        </ul>
      </div>

      <div className={styles.controls__prices}>
        <div
          className={classNames(
            styles.controls__price,
            styles['controls__price--loading'],
          )}
        ></div>
      </div>

      <div className={styles.controls__buttons}>
        <div
          className={classNames(
            styles['controls__cart-btn'],
            styles['controls__cart-btn--loading'],
          )}
        ></div>
        <div
          className={classNames(
            styles['controls__fav-btn'],
            styles['controls__fav-btn--loading'],
          )}
        ></div>
      </div>

      <div className={classNames(styles.controls__info, styles.info)}>
        <ul className={styles.info__list}>
          {[...Array(4)].map((_, index) => (
            <li className={styles.info__item} key={index}>
              <span
                className={classNames(
                  styles.info__property,
                  styles['info__property--loading'],
                )}
              ></span>
              <span
                className={classNames(
                  styles.info__value,
                  styles['info__value--loading'],
                )}
              ></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
