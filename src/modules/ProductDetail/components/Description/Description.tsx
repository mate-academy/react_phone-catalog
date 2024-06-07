import React from 'react';
import styles from './Description.module.scss';
import classNames from 'classnames';
import { Details } from '../../../../types/Details';

type Props = {
  selectedProduct: Details;
};

export const Description: React.FC<Props> = ({ selectedProduct }) => {
  const {
    screen,
    ram,
    processor,
    resolution,
    description,
    capacity,
    camera,
    zoom,
    cell,
  } = selectedProduct;

  return (
    <>
      <section className={styles.description}>
        <h3 className={classNames(styles.title, styles.description__header)}>
          About
        </h3>
        {description.map(item => (
          <article className={styles.description__section} key={item.title}>
            <h4 className={styles.description__title}>{item.title}</h4>
            <p className={styles.description__text}>{item.text}</p>
          </article>
        ))}
      </section>

      <section className={styles.tech}>
        <span className={classNames(styles.title, styles.tech__header)}>
          Tech specs
        </span>
        <article className={styles.tech__list}>
          <div className={styles.tech__item}>
            <span className={styles.tech__name}>Screen</span>
            <span className={styles.tech__info}>{screen}</span>
          </div>
          <div className={styles.tech__item}>
            <span className={styles.tech__name}>Resolution</span>
            <span className={styles.tech__info}>{resolution}</span>
          </div>
          <div className={styles.tech__item}>
            <span className={styles.tech__name}>Processor</span>
            <span className={styles.tech__info}>{processor}</span>
          </div>
          <div className={styles.tech__item}>
            <span className={styles.tech__name}>RAM</span>
            <span className={styles.tech__info}>{ram}</span>
          </div>
          <div className={styles.tech__item}>
            <span className={styles.tech__name}>Built in memory</span>
            <span className={styles.tech__info}>{capacity}</span>
          </div>
          <div className={styles.tech__item}>
            <span className={styles.tech__name}>Camera</span>
            <span className={styles.tech__info}>{camera}</span>
          </div>
          <div className={styles.tech__item}>
            <span className={styles.tech__name}>Zoom</span>
            <span className={styles.tech__info}>{zoom}</span>
          </div>
          <div className={styles.tech__item}>
            <span className={styles.tech__name}>Cell</span>
            <span className={styles.tech__info}>{cell.join(', ')}</span>
          </div>
        </article>
      </section>
    </>
  );
};
