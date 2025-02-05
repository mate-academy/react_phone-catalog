import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './PicturesSlider.module.scss';

import { ArrowType } from '@sTypes/ArrowType';

import { Arrow } from '@components/Arrow';
import { Image } from '@components/Image';

import { useDebounce } from '@hooks/useDebounce';
import { useScrollAnimation } from '@hooks/useScrollAnimation';

const IMAGES = [
  './img/banner/banner-1.png',
  './img/banner/banner-2.png',
  './img/banner/banner-3.png',
  './img/banner/banner-4.png',
];

const PHONE_IMAGES = [
  './img/banner/banner-1-phone.png',
  './img/banner/banner-2.png',
  './img/banner/banner-3.png',
  './img/banner/banner-4.png',
];

function getImages() {
  return (window.innerWidth || 0) < 640 ? PHONE_IMAGES : IMAGES;
}

export const PicturesSlider = () => {
  // first start
  const [isLoading, setIsLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(1);
  const [images, setImages] = useState(getImages());

  // ref to the slider and images
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const scrollTo = useScrollAnimation(300);
  const [isAnimating, setIsAnimating] = useState(false);

  // slider visibility
  const [isVisible, setIsVisible] = useState(true);

  const lastScroll = useRef(0);
  const needRestore = useRef(true);

  const restoreScroll = useCallback(
    (index = activeImage) => {
      if (!isAnimating && sliderRef.current) {
        const item = imageRefs.current[index];

        if (item) {
          sliderRef.current.scrollLeft = item.offsetLeft - lastScroll.current;
        }
      }
    },
    [activeImage, isAnimating],
  );

  const saveScroll = useCallback(
    (index = activeImage) => {
      const item = imageRefs.current[index];

      if (item && sliderRef.current) {
        lastScroll.current = item.offsetLeft - sliderRef.current.scrollLeft;
      }
    },
    [activeImage],
  );

  // show original images and, then, show with order (setIsLoading(false))
  // handle resizing and create observer for slider
  // if user sees less than 30% of the slider, it stops auto play.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const lastIsVisible = entries.at(-1);

        if (lastIsVisible) {
          setIsVisible(lastIsVisible.isIntersecting);
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    setIsLoading(false);

    const handleResize = () => {
      setImages(getImages());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // observer
  // checks which image is on the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length) {
          const visibleEntry = visibleEntries[0].target;

          let index = imageRefs.current.indexOf(
            visibleEntry as HTMLImageElement | null,
          );

          if (index !== -1) {
            if (!isAnimating) {
              if (index === 0) {
                saveScroll(index);
                needRestore.current = true;

                index = imageRefs.current.length - 2;
              } else if (index === imageRefs.current.length - 1) {
                saveScroll(index);
                needRestore.current = true;

                index = 1;
              }
            }

            setActiveImage(index);
          }
        }
      },
      {
        root: sliderRef.current,
        threshold: 0.5,
      },
    );

    imageRefs.current.forEach(item => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isAnimating, isLoading, saveScroll]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.overflowX = isAnimating ? 'hidden' : 'auto';
    }
  }, [isAnimating]);

  // place an active image on the screen after replacements
  useEffect(() => {
    if (needRestore.current) {
      restoreScroll();
      needRestore.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needRestore.current]);

  // scroll to the image
  // initialOrder -> an active image in the middle or restore initialOrder
  const changeImage = useCallback(
    (index: number) => {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);

      const item = imageRefs.current[index];

      if (sliderRef.current && item) {
        scrollTo(sliderRef.current, item).finally(() => {
          setIsAnimating(false);
        });
      }
    },
    [isAnimating, scrollTo],
  );

  // autoplay
  const [isWaiting, setIsWaiting] = useState(true);

  const playCallback = useCallback(() => {
    changeImage((activeImage + 1) % (images.length + 2));
  }, [activeImage, changeImage, images.length]);

  const [play, pause] = useDebounce(playCallback, 5000);

  useEffect(() => {
    if (isVisible && isWaiting) {
      play();
    } else {
      pause();
    }
  }, [isVisible, isWaiting, pause, play]);

  const spanCallback = useCallback(
    (index: number) => {
      changeImage(index);
    },
    [changeImage],
  );

  const waitingCallback = useCallback(() => {
    setIsWaiting(true);
  }, []);

  const [startWaiting] = useDebounce(waitingCallback, 100);
  const [snapImage, cancelSnapImage] = useDebounce(spanCallback, 100);

  const activeDot = useMemo(() => {
    const currentDot = activeImage;

    if (!currentDot) {
      return imageRefs.current.length - 3;
    }

    if (currentDot === imageRefs.current.length - 1) {
      return 0;
    }

    return currentDot - 1;
  }, [activeImage]);

  return (
    <section
      className={styles['pictures-slider']}
      onMouseEnter={() => setIsWaiting(false)}
      onMouseLeave={() => setIsWaiting(true)}
      onTouchStart={() => setIsWaiting(false)}
      onTouchEnd={() => setIsWaiting(true)}
    >
      <div className={styles['pictures-slider__top']}>
        <div
          className={classNames(
            styles['pictures-slider__button'],
            styles['pictures-slider__button--left'],
          )}
          onClick={() =>
            changeImage(activeImage - 1 + (!activeImage ? images.length : 0))
          }
        >
          <Arrow type={ArrowType.left} tall />
        </div>

        <div
          ref={sliderRef}
          className={classNames(styles['pictures-slider__slider'], {
            [styles['pictures-slider__slider--isLoading']]: isLoading,
          })}
          onScroll={() => {
            snapImage(activeImage);
            setIsWaiting(false);
            startWaiting();
          }}
        >
          {isLoading && (
            <Image
              src={images[0]}
              className={classNames(
                styles['pictures-slider__picture'],
                styles['pictures-slider__picture--isLoading'],
              )}
            />
          )}

          <Image
            src={images[images.length - 1]}
            className={styles['pictures-slider__picture']}
            ref={el => (imageRefs.current[0] = el)}
          />

          {images.map((image, i) => (
            <Image
              key={image}
              src={image}
              className={styles['pictures-slider__picture']}
              ref={el => (imageRefs.current[i + 1] = el)}
            />
          ))}

          <Image
            src={images[0]}
            className={styles['pictures-slider__picture']}
            ref={el => (imageRefs.current[images.length + 1] = el)}
          />
        </div>

        <div
          className={classNames(
            styles['pictures-slider__button'],
            styles['pictures-slider__button--right'],
          )}
          onClick={() => changeImage((activeImage + 1) % (images.length + 2))}
        >
          <Arrow type={ArrowType.right} tall />
        </div>
      </div>

      <div className={styles['pictures-slider__bottom']}>
        {images.map((image, i) => (
          <div
            key={image}
            className={classNames(styles['pictures-slider__dot'], {
              [styles['pictures-slider__dot--active']]: i === activeDot,
            })}
            onClick={() => {
              cancelSnapImage();
              changeImage(i + 1);
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};
