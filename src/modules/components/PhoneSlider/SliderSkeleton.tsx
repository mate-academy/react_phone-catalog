import React from 'react';
import styles from './PhoneSlider.module.scss';
import classNames from 'classnames';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';

export const SliderSkeleton: React.FC = () => (
  <section className={classNames(styles.container, styles.phoneSlider)}>
    <div className={styles.phoneSlider__top}>
      <h2
        className={classNames(
          styles.sectionTitle,
          styles.phoneSlider__header,
          styles.skeleton__header,
        )}
      ></h2>
      <div className={styles.phoneSlider__buttons}>
        <button
          className={classNames(
            styles.phoneSlider__button,
            styles.skeleton__button,
          )}
          disabled
        />
        <button
          className={classNames(
            styles.phoneSlider__button,
            styles.skeleton__button,
          )}
          disabled
        />
      </div>
    </div>

    <div className={styles.phoneSlider__products}>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  </section>
);
