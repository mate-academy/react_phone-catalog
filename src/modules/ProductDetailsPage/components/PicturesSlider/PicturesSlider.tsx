import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Image } from '@components/Image';
import styles from './PicturesSlider.module.scss';
import { useScrollAnimation } from '@hooks/useScrollAnimation';

type Props = {
  className?: string;
  pictures: string[];
};

export const PicturesSlider: React.FC<Props> = ({ className, pictures }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const pictureRefs = useRef<(HTMLImageElement | null)[]>([]);

  const scrollTo = useScrollAnimation(300);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const lastVisibleRef = entries
          .filter(entry => entry.isIntersecting)
          .at(-1);

        if (!lastVisibleRef) {
          return;
        }

        const index = pictureRefs.current.indexOf(
          lastVisibleRef.target as HTMLImageElement,
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
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.scrollSnapType = isAnimating
        ? 'initial'
        : 'x mandatory';

      sliderRef.current.style.overflowX = isAnimating ? 'hidden' : 'auto';
    }
  }, [isAnimating]);

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

  return (
    <section className={classNames(className, styles['pictures-slider'])}>
      <div ref={sliderRef} className={styles['pictures-slider__slider']}>
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
            onClick={() => changeImage(i)}
          />
        ))}
      </div>
    </section>
  );
};
