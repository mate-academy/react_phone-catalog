import React from 'react';
import classNames from 'classnames';

import styles from './TechSpecs.module.scss';

type Props = {
  className?: string;
};

export const TechSpecsSkeleton: React.FC<Props> = ({ className = '' }) => {
  return (
    <section className={classNames(styles['tech-specs'], className)}>
      <h3 className={styles['tech-specs__title']}>Tech specs</h3>
      <ul className={styles['tech-specs__list']}>
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index} className={styles['tech-specs__item']}>
            <span
              className={classNames(
                styles['tech-specs__property'],
                styles['tech-specs__property--loading'],
              )}
            ></span>
            <span
              className={classNames(
                styles['tech-specs__value'],
                styles['tech-specs__value--loading'],
              )}
            ></span>
          </li>
        ))}
      </ul>
    </section>
  );
};
