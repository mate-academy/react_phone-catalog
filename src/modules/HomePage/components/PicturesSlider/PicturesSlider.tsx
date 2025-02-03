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

type ImageRefs = {
  [key: string]: HTMLImageElement | null;
};

export const PicturesSlider = () => {
  // first start
  const [isLoading, setIsLoading] = useState(true);

  // a visible image and list of images
  const [activeDot, setActiveDot] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [images, setImages] = useState(getImages());

  // an image to which we need to scroll in the original order
  // a previous order which was before scrolling
  const target = useRef<number | null>(null);
  const prevOrderedImages = useRef<string[]>(getImages());

  // ref to the slider and images
  const imageRefs = useRef<ImageRefs>({});
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = useScrollAnimation(300);
  const [isAnimating, setIsAnimating] = useState(false);

  // slider visibility
  const [isVisible, setIsVisible] = useState(true);

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
          const visibleEntry = visibleEntries.find(
            entry => entry.intersectionRatio === 1,
          );

          const firstVisibleEntry = visibleEntry
            ? visibleEntry.target
            : visibleEntries[0].target;

          const foundedRef = Object.entries(imageRefs.current).find(
            ([, value]) => value === firstVisibleEntry,
          );

          if (foundedRef) {
            const index = images.indexOf(foundedRef[0]);

            if (index !== -1) {
              const intersectionRatio = visibleEntries[0].intersectionRatio;

              if (intersectionRatio >= 0.5 && intersectionRatio < 1) {
                setActiveDot(index);
              }

              if (intersectionRatio === 1) {
                setActiveImage(index);
              }
            }
          }
        }
      },
      {
        root: sliderRef.current,
        threshold: [0.5, 1],
      },
    );

    Object.values(imageRefs.current).forEach(item => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [images, isAnimating]);

  // place an active image on the screen after replacements
  useEffect(() => {
    if (isAnimating) {
      return;
    }

    if (sliderRef.current) {
      const src = images[activeImage];
      const item = imageRefs.current[src];

      if (item) {
        sliderRef.current.scrollLeft = item.offsetLeft;
      }
    }
  }, [activeImage, images, isAnimating]);

  // scroll to the image
  // initialOrder -> an active image in the middle or restore initialOrder
  const changeImage = useCallback(
    (index: number, initialOrder = true) => {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);

      if (initialOrder) {
        target.current = index;
      } else {
        const src = images[index];
        const item = imageRefs.current[src];

        if (sliderRef.current && item) {
          scrollTo(sliderRef.current, item).finally(() => {
            setIsAnimating(false);
          });
        }
      }
    },
    [images, isAnimating, scrollTo],
  );

  // start and remove posibility to scroll during animation
  useEffect(() => {
    if (sliderRef.current) {
      if (isAnimating && target.current !== null) {
        const src = images[target.current];
        const item = imageRefs.current[src];

        if (item) {
          scrollTo(sliderRef.current, item).finally(() => {
            setIsAnimating(false);

            target.current = null;
          });
        }
      }

      sliderRef.current.style.scrollSnapType = isAnimating
        ? 'initial'
        : 'x mandatory';

      sliderRef.current.style.overflowX = isAnimating ? 'hidden' : 'auto';
    }
  }, [images, isAnimating, scrollTo]);

  // crete a custom images order in which an active image is in the middle of array
  // isLoading -> first render -> original images
  // target.current -> dots were used -> scroll by an original order
  // isAnimating -> show order which was befere scroll, prevent reorder during animation
  const orderedImages = useMemo(() => {
    if (target.current !== null) {
      return images;
    }

    if (isAnimating) {
      return prevOrderedImages.current;
    }

    const ordered = [];
    const middle = Math.floor(images.length / 2);
    let start = activeImage - middle;

    start = start < 0 ? images.length + start : start;

    for (let i = 0; i < images.length; i++) {
      ordered.push(images[(start + i) % images.length]);
    }

    prevOrderedImages.current = ordered;

    return ordered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeImage, images, isAnimating, target.current]);

  // autoplay
  const [isWaiting, setIsWaiting] = useState(true);

  const playCallback = useCallback(() => {
    changeImage((activeImage + 1) % images.length, false);
  }, [activeImage, changeImage, images.length]);

  const [play, pause] = useDebounce(playCallback, 5000);

  useEffect(() => {
    if (isVisible && isWaiting) {
      play();
    } else {
      pause();
    }
  }, [isVisible, isWaiting, pause, play]);

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
            changeImage(
              activeImage - 1 + (!activeImage ? images.length : 0),
              false,
            )
          }
        >
          <Arrow type={ArrowType.left} tall />
        </div>

        <div
          ref={sliderRef}
          className={classNames(styles['pictures-slider__slider'], {
            [styles['pictures-slider__slider--isLoading']]: isLoading,
          })}
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

          {orderedImages.map(image => (
            <Image
              key={image}
              src={image}
              loading="eager"
              className={styles['pictures-slider__picture']}
              ref={el => (imageRefs.current[image] = el)}
            />
          ))}
        </div>

        <div
          className={classNames(
            styles['pictures-slider__button'],
            styles['pictures-slider__button--right'],
          )}
          onClick={() => changeImage((activeImage + 1) % images.length, false)}
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
            onClick={() => changeImage(i)}
          ></div>
        ))}
      </div>
    </section>
  );
};
