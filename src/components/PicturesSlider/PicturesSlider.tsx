import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './PicturesSlider.module.scss';

type Props = {
  images: string[];
};

export const PicturesSlider = ({ images }: Props) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

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

  return (
    <section className={styles.slider}>
      <button
        type="button"
        onClick={() => {
          setDirection('prev');
          setIndex(value => (value - 1 + images.length) % images.length);
        }}
      >
        {'<'}
      </button>

      <div className={styles.viewport}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={images[index]}
            timeout={350}
            classNames={transitionClassNames}
            unmountOnExit
          >
            <img
              src={images[index]}
              alt="Catalog banner"
              className={styles.image}
            />
          </CSSTransition>
        </SwitchTransition>
      </div>

      <button
        type="button"
        onClick={() => {
          setDirection('next');
          setIndex(value => (value + 1) % images.length);
        }}
      >
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
