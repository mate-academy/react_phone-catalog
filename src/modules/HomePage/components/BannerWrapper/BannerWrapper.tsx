import classNames from 'classnames';
import { Button } from '../../../../components/Button';
import { Icon } from '../../../../components/Icon';
import styles from './BannerWrapper.module.scss';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { mainBanners } from '../../constants/mainBanners';
import { useNavigate } from 'react-router-dom';

export const BannerWrapper: React.FC = () => {
  const navigate = useNavigate();

  const extendedBanners = useMemo(
    () => [mainBanners[mainBanners.length - 1], ...mainBanners, mainBanners[0]],
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const activeDotIndex =
    currentIndex === 0
      ? mainBanners.length - 1
      : currentIndex === extendedBanners.length - 1
        ? 0
        : currentIndex - 1;

  const goRight = useCallback(() => {
    if (!isTransitioning) {
      return;
    }

    if (currentIndex >= extendedBanners.length - 1) {
      return;
    }

    setCurrentIndex(prev => prev + 1);
  }, [currentIndex, extendedBanners.length, isTransitioning]);

  const goLeft = useCallback(() => {
    if (!isTransitioning) {
      return;
    }

    if (currentIndex <= 0) {
      return;
    }

    setCurrentIndex(prev => prev - 1);
  }, [currentIndex, isTransitioning]);

  const handleTransitionEnd = () => {
    if (currentIndex === extendedBanners.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(extendedBanners.length - 2);
    }
  };

  const clickDot = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      goRight();
    }, 5000);

    return () => clearInterval(interval);
  }, [goRight, isPaused]);

  useEffect(() => {
    let raf: number;

    if (!isTransitioning) {
      raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [isTransitioning]);

  return (
    <>
      <div className={styles.bunnerWrapper}>
        <Button variant="slider" className={styles.sliderButton} onClick={goLeft}>
          <Icon variant="arrow-left" />
        </Button>

        <div
          className={styles.imgContainer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={styles.imagesTrack}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none',
            }}
          >
            {extendedBanners.map((banner, index) => (
              <div key={`${banner.src}-${index}`} className={styles.slide}>
                <div className={styles.bannerInfo}>
                  <div className={styles.textGroup}>
                    <h2 className={styles.title}>{banner.title}</h2>
                    <h3 className={styles.subtitle}>{banner.subtitle}</h3>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => navigate(banner.link)}
                    className={classNames(styles.bannerBtn, 'uppercase')}
                  >
                    {banner.button}
                  </Button>
                </div>

                <img className={styles.img} src={banner.src} alt={banner.alt} loading="eager" />
              </div>
            ))}
          </div>
        </div>

        <Button variant="slider" className={styles.sliderButton} onClick={goRight}>
          <Icon variant="arrow-right" />
        </Button>
      </div>

      <div className={styles.dots}>
        {mainBanners.map((_, index) => (
          <div
            key={index}
            className={classNames(styles.dot, {
              [styles.dot_active]: activeDotIndex === index,
            })}
            onClick={() => clickDot(index)}
          />
        ))}
      </div>
    </>
  );
};
