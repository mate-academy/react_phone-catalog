import React from 'react';
import classNames from 'classnames';

import { DetailedProduct } from '../../../../types';

import styles from './About.module.scss';

type Props = {
  product: DetailedProduct;
  className?: string;
};

export const About: React.FC<Props> = ({ product, className = '' }) => {
  const { description } = product;

  return (
    <section className={classNames(styles.about, className)}>
      <h3 className={styles.about__title}>About</h3>
      {description.map(({ title, text }, index) => (
        <article key={title + index} className={styles.about__article}>
          <h4 className={styles['about__sub-title']}>{title}</h4>
          <p className={styles.about__text}>{text}</p>
        </article>
      ))}
    </section>
  );
};
