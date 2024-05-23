import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const IMAGE_WIDTH = 1040;
const IMAGE_NUM = 5;
const TRANSITION_DURATION = 250;
const BUTTON_LOCK_DURATION = TRANSITION_DURATION * 2;

export const PicturesSlider = () => {
  const [offset, setOffset] = useState(-1040);
  const [transitionDuration, setTransitionDuration] =
    useState(TRANSITION_DURATION);
  const [isButtonLocked, setIsButtonLocked] = useState(false);

  // console.log(offset);

  useEffect(() => {
    if (transitionDuration === 0) {
      setTimeout(() => {
        setTransitionDuration(TRANSITION_DURATION);
      }, TRANSITION_DURATION);
    }
  }, [transitionDuration]);

  useEffect(() => {
    if (offset < -IMAGE_WIDTH * (IMAGE_NUM - 2)) {
      setTimeout(() => {
        setTransitionDuration(0);
        setOffset(-IMAGE_WIDTH);
      }, TRANSITION_DURATION);
    }
  }, [offset]);

  useEffect(() => {
    if (offset === 0) {
      setTimeout(() => {
        setTransitionDuration(0);
        setOffset(-IMAGE_WIDTH * (IMAGE_NUM - 2));
      }, TRANSITION_DURATION);
    }
  }, [offset]);

  const handleRightBtn = () => {
    if (isButtonLocked) {
      return;
    }

    setIsButtonLocked(true);
    setTimeout(() => setIsButtonLocked(false), BUTTON_LOCK_DURATION);
    setOffset(currentOffset => {
      const newOffset = currentOffset - IMAGE_WIDTH;

      return newOffset;
    });
  };

  const handleLeftBtn = () => {
    if (isButtonLocked) {
      return;
    }

    setIsButtonLocked(true);
    setOffset(currentOffset => {
      const newOffset = currentOffset + IMAGE_WIDTH;

      return newOffset;
    });
    setTimeout(() => setIsButtonLocked(false), BUTTON_LOCK_DURATION);
  };

  return (
    <div className={styles.picturesSlider}>
      <button
        className={`${styles.btn}, ${styles.btnLeft}`}
        onClick={handleLeftBtn}
        disabled={isButtonLocked}
      ></button>
      <div className={styles.window}>
        <div
          className={`${styles.imgContainer}`}
          style={{
            transitionDuration: `${transitionDuration}ms`,
            transform: `translateX(${offset}px)`,
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
        disabled={isButtonLocked}
      ></button>
    </div>
  );
};
