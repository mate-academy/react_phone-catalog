import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './PicturesSlider.module.scss';

type Props = {
  images: string[];
};

export const PicturesSlider = ({ images }: Props) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setDirection('next');
      setIndex(current => (current + 1) % images.length);
    }, 5000);

    return () => clearInterval(timerId);
  }, [images.length]);

  let transitionClassNames = {
    enter: styles.slidePrevEnter,
    enterActive: styles.slidePrevEnterActive,
    exit: styles.slidePrevExit,
    exitActive: styles.slidePrevExitActive,
  };

  if (direction === 'next') {
    transitionClassNames = {
      enter: styles.slideNextEnter,
      enterActive: styles.slideNextEnterActive,
      exit: styles.slideNextExit,
      exitActive: styles.slideNextExitActive,
    };
  }

  const handlePrev = () => {
    setDirection('prev');
    setIndex(value => (value - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setDirection('next');
    setIndex(value => (value + 1) % images.length);
  };

  const isAccessories = images[index].includes('banner-accessories');

  return (
    <section className={styles.slider}>
      <button type="button" onClick={handlePrev}>
        {'<'}
      </button>

      <div
        className={styles.viewport}
        onTouchStart={event => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={event => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX ?? null;

          touchStartX.current = null;

          if (startX === null || endX === null || images.length < 2) {
            return;
          }

          const deltaX = startX - endX;
          const threshold = 40;

          if (deltaX > threshold) {
            handleNext();
          } else if (deltaX < -threshold) {
            handlePrev();
          }
        }}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={images[index]}
            timeout={350}
            classNames={transitionClassNames}
            unmountOnExit
          >
            <picture
              className={classNames(styles.image, {
                [styles.imageWide]: isAccessories,
              })}
            >
              <source
                media="(max-width: 640px)"
                srcSet={images[index].replace(
                  'img/banner-tablets.png',
                  'img/image%2016.png',
                )}
              />
              <img
                className={styles.imageImg}
                src={images[index]}
                alt="Catalog banner"
              />
            </picture>
          </CSSTransition>
        </SwitchTransition>
      </div>

      <button type="button" onClick={handleNext}>
        {'>'}
      </button>

      <div className={styles.dots}>
        {images.map((image, dotIndex) => (
          <button
            key={image}
            type="button"
            className={classNames(styles.dot, {
              [styles.active]: dotIndex === index,
            })}
            onClick={() => {
              setDirection(dotIndex > index ? 'next' : 'prev');
              setIndex(dotIndex);
            }}
            aria-label={`Slide ${dotIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
