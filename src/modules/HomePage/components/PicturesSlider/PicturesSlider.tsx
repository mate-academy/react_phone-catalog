import { useCallback, useEffect, useRef, useState } from 'react';
import { Direction } from '../../../../types/Direction';
import { useResizeEffect, useSwipe } from '../../../../app/hooks';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';
import debounce from 'lodash.debounce';
import img1 from '/img/slider/img1.png';
import img1_mobile from '/img/slider/img1_mobile.png';
import img2 from '/img/slider/img2.png';
import img2_mobile from '/img/slider/img2_mobile.png';
import img6 from '/img/slider/img6.png';
import img6_mobile from '/img/slider/img6_mobile.png';
import arrow from '/img/arrow-black.svg?url';

const getBaseImages = () => {
  const pageWidth = window.innerWidth;

  if (pageWidth >= 640) {
    return [img1, img2, img6];
  }

  if (pageWidth >= 320) {
    return [img1_mobile, img2_mobile, img6_mobile];
  }

  return [];
};

const calcWidth = () => {
  const pageWidth = window.innerWidth;

  if (pageWidth >= 1200) {
    return 1040;
  }

  if (pageWidth >= 640) {
    return pageWidth + (-32 - 16 - 24) * 2;
  }

  if (pageWidth >= 320) {
    return pageWidth;
  }

  return 0;
};

export const PicturesSlider = () => {
  const [index, setIndex] = useState(1); // починаємо з першої реальної картинки
  const [itemWidth, setItemWidth] = useState(calcWidth());
  const [baseImages, setBaseImages] = useState(getBaseImages());

  const images = [
    baseImages[baseImages.length - 1],
    ...baseImages,
    baseImages[0],
  ];
  const frameWidth = itemWidth;

  const maxIndex = images.length - 1;
  const defaultAnimationDuration = 3000;

  const [animationDuration, setAnimationDuration] = useState(
    defaultAnimationDuration,
  );
  const [shifting, setShifting] = useState(false);

  const shiftTimer = useRef<NodeJS.Timeout | null>(null);

  const shift = useCallback(
    ({
      direction,
      targetIndex,
      animDur = defaultAnimationDuration,
    }: {
      direction?: Direction;
      targetIndex?: number;
      animDur?: number;
    }) => {
      if (shifting) {
        return;
      }

      setShifting(true);
      setAnimationDuration(animDur);

      if (typeof targetIndex === 'number') {
        setIndex(targetIndex);
      } else if (direction) {
        setIndex(prev => prev + direction);
      }
    },
    [shifting],
  );

  const handleTransitionEnd = useCallback(() => {
    setShifting(false);

    if (index === 0) {
      setAnimationDuration(0);
      setIndex(maxIndex - 1);
    } else if (index === maxIndex) {
      setAnimationDuration(0);
      setIndex(1);
    }
  }, [index, maxIndex]);

  const handleListShiftLeft = useCallback(() => {
    if (shiftTimer.current) {
      clearInterval(shiftTimer.current);
    }

    shift({ direction: Direction.REVERSE, animDur: 500 });
  }, [shift]);

  const handleListShiftRight = useCallback(() => {
    if (shiftTimer.current) {
      clearInterval(shiftTimer.current);
    }

    shift({ direction: Direction.FORWARD, animDur: 500 });
  }, [shift]);

  const handleTargetIndexSet = useCallback(
    (targetIndex: number, currentIndex: number) => {
      if (targetIndex === currentIndex) {
        return;
      }

      if (shiftTimer.current) {
        clearInterval(shiftTimer.current);
      }

      if (currentIndex === 1 && targetIndex === baseImages.length) {
        shift({ direction: Direction.REVERSE, targetIndex: 0, animDur: 500 });

        return;
      }

      if (currentIndex === baseImages.length && targetIndex === 1) {
        shift({
          direction: Direction.FORWARD,
          targetIndex: maxIndex,
          animDur: 500,
        });

        return;
      }

      shift({
        direction: Direction.REVERSE,
        targetIndex: targetIndex,
        animDur: 500,
      });
    },
    [baseImages.length, maxIndex, shift],
  );

  const { onTouchStart, onTouchEnd } = useSwipe(
    handleListShiftRight,
    handleListShiftLeft,
  );

  useEffect(() => {
    shiftTimer.current = setInterval(
      () => shift({ direction: Direction.FORWARD }),
      5000,
    );

    return () => {
      if (shiftTimer.current) {
        clearInterval(shiftTimer.current);
      }
    };
  }, [shift]);

  const handleResize = useCallback(() => {
    setItemWidth(calcWidth());
    setBaseImages(getBaseImages());
    setAnimationDuration(0);
    setIndex(1);
  }, []);

  const debouncedHandleResize = debounce(handleResize, 300);

  useResizeEffect({ onResize: debouncedHandleResize });

  useEffect(() => {
    return () => {
      debouncedHandleResize.cancel();
    };
  }, [debouncedHandleResize]);

  return (
    <section className={styles.pictures_slider}>
      <button type="button" onClick={handleListShiftLeft} disabled={shifting}>
        <img src={arrow} alt="arrow" className={styles.arrow_left} />
      </button>

      <div
        className={styles.frame}
        style={{
          width: `${frameWidth}px`,
        }}
      >
        <ul
          className={styles.list}
          style={{
            transform: `translateX(${-index * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
            width: `${frameWidth}px`,
          }}
          onTransitionEnd={handleTransitionEnd}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
        >
          {images.map((image, i) => (
            <li
              key={i}
              style={{
                width: `${frameWidth}px`,
              }}
            >
              <img src={image} alt={`Image №${i}`} className={styles.image} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        onClick={handleListShiftRight}
        disabled={shifting}
      >
        <img src={arrow} alt="arrow" className={styles.arrow_right} />
      </button>

      <div className={styles.dots}>
        {baseImages.map((_, i) => {
          return (
            <div
              className={styles.dot_box}
              key={i}
              onClick={() => handleTargetIndexSet(i + 1, index)}
            >
              <div
                className={classNames(styles.dot, {
                  [styles.active_dot]: !shifting && i + 1 === index,
                })}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
