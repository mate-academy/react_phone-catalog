import React from 'react';
import styles from './PicturesSlider.module.scss';
import { Link } from 'react-router-dom';
import { ChevronArrowLeft, ChevronArrowRight } from '../../helpers/icons';
import classNames from 'classnames';

const images = [
  {
    url: '/phones',
    image: './img/banner-phones.webp',
    alt: 'Banner: phones image',
  },
  {
    url: '/tablets',
    image: './img/banner-tablets.webp',
    alt: 'Banner: tablets image',
  },
  {
    url: '/accessories',
    image: './img/banner-accessories.webp',
    alt: 'Banner: accessories image',
  },
];

const STEP = 1;
const FRAME_SIZE = 1;
const TRANSLATE_X_PERCENT = 100;
const CHANGE_IMAGE_DELAY = 5000;

export const PicturesSlider: React.FC = () => {
  const [slide, setSlide] = React.useState(0);
  const [touchStartX, setTouchStartX] = React.useState(0);
  const [touchEndX, setTouchEndX] = React.useState(0);

  const ref = React.useRef<NodeJS.Timeout | null>(null);

  const startSlide = React.useMemo(() => images.length - FRAME_SIZE, []);

  const imageStyle = (imageUrl: string) => {
    return {
      backgroundImage: `url(${imageUrl})`,
      transform: `translateX(-${slide * TRANSLATE_X_PERCENT}%)`,
    };
  };

  const handleNextClick = React.useCallback(() => {
    setSlide(currentSlide => {
      if (currentSlide !== startSlide) {
        return Math.min(currentSlide + STEP, startSlide);
      }

      return 0;
    });
  }, [startSlide]);

  const handlePreviousClick = React.useCallback(() => {
    setSlide(currentSlide => {
      if (currentSlide > 0) {
        return Math.max(currentSlide - STEP, 0);
      }

      return startSlide;
    });
  }, [startSlide]);

  const resetSlider = React.useCallback(() => {
    if (ref.current) {
      clearInterval(ref.current);
    }

    ref.current = setInterval(() => {
      handleNextClick();
    }, CHANGE_IMAGE_DELAY);
  }, [handleNextClick]);

  React.useEffect(() => {
    resetSlider();

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, [resetSlider]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      handleNextClick();
    } else if (touchStartX - touchEndX < -50) {
      handlePreviousClick();
    }

    setTouchStartX(0);
    setTouchEndX(0);
    resetSlider();
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            handlePreviousClick();
            resetSlider();
          }}
        >
          <ChevronArrowLeft />
        </button>

        <div
          className={styles.imagesWrapper}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map(item => (
            <Link to={item.url} className={styles.link} key={item.url}>
              <div
                className={styles.image}
                style={imageStyle(item.image)}
              ></div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={() => {
            handleNextClick();
            resetSlider();
          }}
        >
          <ChevronArrowRight />
        </button>
      </div>

      <div className={styles.dotsWrapper}>
        {images.map((item, index) => (
          <button
            type="button"
            className={classNames(
              styles.dot,
              slide === index ? styles['dot--active'] : '',
            )}
            key={item.url}
            onClick={() => {
              setSlide(index);
              resetSlider();
            }}
          >
            <span></span>
          </button>
        ))}
      </div>
    </section>
  );
};
