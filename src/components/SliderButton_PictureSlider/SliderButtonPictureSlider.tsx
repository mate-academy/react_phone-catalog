import styles from './SliderButtonPictureSlider.module.scss';
import React from 'react';

type Props = {
  setCurrentIndex: (currentIndex: number) => void;
  currentIndex: number;
  item: number;
};

export const SliderButtonPictureSlider: React.FC<Props> = ({
  setCurrentIndex,
  currentIndex,
  item,
}) => {
  return (
    <>
      {currentIndex === item && (
        <button className={styles.button_slider}>
          <img
            src="img/homePage/button_slider_active.svg"
            alt="button_slider"
            onClick={() => setCurrentIndex(item)}
          />
        </button>
      )}

      {currentIndex !== item && (
        <button className={styles.button_slider}>
          <img
            src="img/homePage/button_slider.svg"
            alt="button_slider"
            onClick={() => setCurrentIndex(item)}
          />
        </button>
      )}
    </>
  );
};
