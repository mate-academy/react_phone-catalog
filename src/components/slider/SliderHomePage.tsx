import styles from './SliderHomePage.module.scss';
export const SliderHomePage = () => {
  return (
    <div className={styles.header__bottom}>
      <div className={styles.header__slider}>
        <div className={styles.slider__image}></div>

        <div className={styles.slider__rectangle}>
          <span className={styles.active}></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
