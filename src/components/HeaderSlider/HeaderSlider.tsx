import styles from './HeaderSlider.module.scss';

export const HeaderSlider = () => {
  return (
    <>
      <div className={`${styles.slider_container}`}>
        <div className={`${styles.slider_img_wrapper}`}>
          <img
            src="../../img/banners/header-slider-for-phone.png"
            alt="iphone banner"
          />
        </div>
        <div className={`${styles.slider_button_container}`}>
          <div className={`${styles.slider_button_inner_container}`}>
            <div className={`${styles.slider_button_wrapper}`}>
              <div className={`${styles.slider_button} ${styles.marked}`}></div>
            </div>
            <div className={`${styles.slider_button_wrapper}`}>
              <div className={`${styles.slider_button}`}></div>
            </div>
            <div className={`${styles.slider_button_wrapper}`}>
              <div className={`${styles.slider_button}`}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
