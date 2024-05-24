import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const IMAGE_WIDTH = 1040;
const IMAGE_NUM = 5;
const TRANSITION_DURATION = 300;

export const PicturesSlider = () => {
  const [offset, setOffset] = useState(-1040);
  // const [transitionDuration, setTransitionDuration] =  useState(TRANSITION_DURATION);
  //
  // useEffect(() => {
  //   if (transitionDuration === 0) {
  //     setTimeout(() => {
  //       setTransitionDuration(TRANSITION_DURATION);
  //     }, TRANSITION_DURATION);
  //   }
  // }, [transitionDuration]);

  useEffect(() => {
    if (offset < -IMAGE_WIDTH * (IMAGE_NUM - 2)) {
      setTimeout(() => {
        // setTransitionDuration(0);
        setOffset(-IMAGE_WIDTH);
      }, 300);
    }
  }, [offset]);

  useEffect(() => {
    if (offset === 0) {
      setTimeout(() => {
        // setTransitionDuration(0);
        setOffset(-IMAGE_WIDTH * (IMAGE_NUM - 2));
      }, TRANSITION_DURATION);
    }
  }, [offset]);

  const handleRightBtn = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset - IMAGE_WIDTH;

      return newOffset;
    });
  };

  const handleLeftBtn = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset + IMAGE_WIDTH;

      return newOffset;
    });
  };

  return (
    <div className={styles.picturesSlider}>
      <button
        className={`${styles.btn}, ${styles.btnLeft}`}
        onClick={handleLeftBtn}
      ></button>
      <div className={styles.window}>
        <div
          className={`${styles.imgContainer}`}
          style={{
            transform: `translateX(${offset}px)`,
            ...(offset < -IMAGE_WIDTH * (IMAGE_NUM - 2) && {
              transition: 'none',
            }),
          }}
        >
          <div className={`${styles.sliderImg}, ${styles.sliderImg3}`}>
            3 clone
          </div>
          <div className={`${styles.sliderImg}, ${styles.sliderImg1}`}>1</div>
          <div className={`${styles.sliderImg}, ${styles.sliderImg2}`}>2</div>
          <div className={`${styles.sliderImg}, ${styles.sliderImg3}`}>3</div>
          <div className={`${styles.sliderImg}, ${styles.sliderImg1}`}>
            1 clone
          </div>
        </div>
      </div>
      <button
        className={`${styles.btn}, ${styles.btnRight}`}
        onClick={handleRightBtn}
      ></button>
    </div>
  );
};
