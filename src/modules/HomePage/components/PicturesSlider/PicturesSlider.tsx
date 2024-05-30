import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';
import { useSwipeable } from 'react-swipeable';

const IMAGE_WIDTH_DESKTOP = 1040;
const IMAGE_WIDTH_TABLET = 490;
const IMAGE_WIDTH_MOBILE = 320;
const IMAGE_NUM = 3;

export const PicturesSlider = () => {
  const [offset, setOffset] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [autoScrollActive, setAutoScrollActive] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1199 && window.innerWidth >= 640) {
        setImageWidth(IMAGE_WIDTH_TABLET);
      } else if (window.innerWidth >= 1200) {
        setImageWidth(IMAGE_WIDTH_DESKTOP);
      } else {
        setImageWidth(IMAGE_WIDTH_MOBILE);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (offset < -imageWidth * (IMAGE_NUM - 1)) {
      setTimeout(() => {
        setOffset(0);
      }, 0);
    }

    if (offset > 0) {
      setTimeout(() => {
        setOffset(-imageWidth * (IMAGE_NUM - 1));
      }, 0);
    }
  }, [imageWidth, offset]);

  const handleRightBtn = useCallback(() => {
    setAutoScrollActive(false);
    setOffset(currentOffset => {
      const newOffset = currentOffset - imageWidth;

      return newOffset;
    });
  }, [imageWidth]);

  const handleLeftBtn = useCallback(() => {
    setAutoScrollActive(false);
    setOffset(currentOffset => {
      const newOffset = currentOffset + imageWidth;

      return newOffset;
    });
  }, [imageWidth]);

  const handlerSwipes = useSwipeable({
    onSwipedLeft: () => handleRightBtn(),
    onSwipedRight: () => handleLeftBtn(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRightBtn();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [handleRightBtn, autoScrollActive]);

  const handleDash = (position: number) => {
    setOffset(position);
    setAutoScrollActive(false);
  };

  useEffect(() => {
    setAutoScrollActive(true);
  }, [offset]);

  return (
    <div className={styles.slider}>
      <div className={styles.picturesSlider} {...handlerSwipes}>
        {imageWidth !== 320 && (
          <button
            className={`${styles.btn} ${styles.btnLeft}`}
            onClick={handleLeftBtn}
          ></button>
        )}

        <div className={styles.window}>
          <div
            className={`${styles.imgContainer}`}
            style={{
              transform: `translateX(${offset}px)`,
            }}
          >
            <div className={`${styles.sliderImg} ${styles.sliderImg1}`}></div>
            <div className={`${styles.sliderImg} ${styles.sliderImg2}`}></div>
            <div className={`${styles.sliderImg} ${styles.sliderImg3}`}></div>
          </div>
        </div>
        {imageWidth !== 320 && (
          <button
            className={`${styles.btn} ${styles.btnRight}`}
            onClick={handleRightBtn}
          ></button>
        )}
      </div>

      <div className={styles.dashesPanel}>
        <button
          className={classNames(styles.dashes, {
            [styles.activeDash]: offset === 0,
          })}
          onClick={() => handleDash(0)}
        ></button>
        <button
          className={classNames(styles.dashes, {
            [styles.activeDash]: offset === -imageWidth * 1,
          })}
          onClick={() => handleDash(-imageWidth)}
        ></button>
        <button
          className={classNames(styles.dashes, {
            [styles.activeDash]: offset === -imageWidth * 2,
          })}
          onClick={() => handleDash(-imageWidth * 2)}
        ></button>
      </div>
    </div>
  );
};
