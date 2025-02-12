import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Image } from '@components/Image';

import { useDebounce } from '@hooks/useDebounce';
import { useScrollAnimation } from '@hooks/useScrollAnimation';

import styles from './PicturesSlider.module.scss';

type Props = {
  className?: string;
  pictures: string[];
};

export const PicturesSlider: React.FC<Props> = ({ className, pictures }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const pictureRefs = useRef<(HTMLImageElement | null)[]>([]);

  const scrollTo = useScrollAnimation(300, 0);

  const changeImage = useCallback(
    (index: number) => {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);

      const item = pictureRefs.current[index];

      if (sliderRef.current && item) {
        scrollTo(sliderRef.current, item).finally(() => {
          setIsAnimating(false);
        });
      }
    },
    [isAnimating, scrollTo],
  );

  useEffect(() => {
    if (sliderRef.current && activeImage !== 0) {
      changeImage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictures]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const firstVifibleRef = entries.filter(
          entry => entry.isIntersecting,
        )[0];

        if (!firstVifibleRef) {
          return;
        }

        const index = pictureRefs.current.indexOf(
          firstVifibleRef.target as HTMLImageElement,
        );

        if (index !== -1) {
          setActiveImage(index);
        }
      },
      {
        threshold: 0.5,
        root: sliderRef.current,
      },
    );

    pictureRefs.current.forEach(pictureRef => {
      if (pictureRef) {
        observer.observe(pictureRef);
      }
    });
  }, [pictures]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.touchAction = isAnimating ? 'none' : 'auto';
      sliderRef.current.style.pointerEvents = isAnimating ? 'none' : 'auto';
    }
  }, [isAnimating]);

  const spanCallback = useCallback(
    (index: number) => {
      changeImage(index);
    },
    [changeImage],
  );

  const [snapImage, cancelSnapImage] = useDebounce(spanCallback, 100);

  return (
    <section className={classNames(className, styles['pictures-slider'])}>
      <div
        ref={sliderRef}
        className={styles['pictures-slider__slider']}
        onScroll={() => snapImage(activeImage)}
      >
        {pictures.map((picture, i) => (
          <Image
            key={picture}
            src={picture}
            className={styles['pictures-slider__picture']}
            ref={(el: HTMLImageElement) => (pictureRefs.current[i] = el)}
          />
        ))}
      </div>

      <div className={styles['pictures-slider__controls']}>
        {pictures.map((picture, i) => (
          <Image
            key={picture}
            src={picture}
            className={classNames(styles['pictures-slider__control'], {
              [styles['pictures-slider__control--active']]: i === activeImage,
            })}
            onClick={() => {
              cancelSnapImage();
              changeImage(i);
            }}
          />
        ))}
      </div>
    </section>
  );
};
