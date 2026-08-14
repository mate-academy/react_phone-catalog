import React from 'react';
import styles from './SkeletonCardLoader.module.scss';
import classNames from 'classnames';

export const SkeletonCardLoader = () => {
  return (
    <article className={styles.card}>
      <div
        className={classNames(styles.imageWrapper, styles.skeletonBone)}
      ></div>

      <h3 className={classNames(styles.title, styles.skeletonBone)}></h3>

      <div className={styles.prices}>
        <span className={classNames(styles.price, styles.skeletonBone)}></span>
        <span
          className={classNames(styles.fullPrice, styles.skeletonBone)}
        ></span>
      </div>
      <hr className={classNames(styles.divider, styles.skeletonBone)} />

      <div className={styles.specs}>
        <div className={styles.specItem}>
          <span
            className={classNames(styles.specName, styles.skeletonBone)}
          ></span>
          <span
            className={classNames(styles.specValue, styles.skeletonBone)}
          ></span>
        </div>

        <div className={styles.specItem}>
          <span
            className={classNames(styles.specName, styles.skeletonBone)}
          ></span>
          <span
            className={classNames(styles.specValue, styles.skeletonBone)}
          ></span>
        </div>

        <div className={styles.specItem}>
          <span
            className={classNames(styles.specName, styles.skeletonBone)}
          ></span>
          <span
            className={classNames(styles.specValue, styles.skeletonBone)}
          ></span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={classNames(styles.addToCartBtn, styles.skeletonBone)}
        ></button>
        <button
          className={classNames(styles.favoritesBtn, styles.skeletonBone)}
        ></button>
      </div>
    </article>
  );
};
