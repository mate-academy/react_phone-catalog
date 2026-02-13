import styles from './bannerSlideSkeleton.module.scss';

export const BannerSlideSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles['sphere-container']}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};
