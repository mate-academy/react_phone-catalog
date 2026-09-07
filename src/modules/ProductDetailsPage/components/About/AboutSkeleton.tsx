import React from 'react';
import classNames from 'classnames';

import styles from './About.module.scss';

type Props = {
  className?: string;
};

export const AboutSkeleton: React.FC<Props> = ({ className = '' }) => {
  return (
    <section className={classNames(styles.about, className)}>
      <h3 className={styles.about__title}>About</h3>

      {Array.from({ length: 3 }).map((_, index) => (
        <article key={index} className={styles.about__article}>
          <div
            className={classNames(
              styles['about__sub-title'],
              styles['about__sub-title--loading'],
            )}
          ></div>
          <div
            className={classNames(
              styles.about__text,
              styles['about__text--loading'],
            )}
          ></div>
        </article>
      ))}
    </section>
  );
};
