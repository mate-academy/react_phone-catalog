import React, { useState, useEffect, TouchEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Banners, Banner } from './Banners';
import { BREAKPOINTS } from '../../utils/Constants';
import styles from './BannerSlider.module.scss';

interface Props {
  autoPlayInterval?: number;
}

export const BannerSlider: React.FC<Props> = ({ autoPlayInterval = 7000 }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlayInterval || Banners.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === Banners.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => {
      clearInterval(interval);
    };
  }, [autoPlayInterval]);

  const handlePrev = () => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setCurrentIndex(prev => (prev === 0 ? Banners.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNext = () => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setCurrentIndex(prev => (prev === Banners.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) {
      return;
    }

    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Touch handlers for swipe on mobile
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }

    if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getResponsiveImage = (banner: (typeof Banners)[0]) => {
    if (windowWidth < BREAKPOINTS.TABLET && banner.imageMobile) {
      return banner.imageMobile;
    } else {
      return banner.image;
    }
  };

  // Get content class name based on banner id
  const getContentClassName = (banner: Banner): string => {
    // Map banner id to specific class
    const classMap: Record<string, string> = {
      '1': styles.bannerContent1,
      '2': styles.bannerContent2,
      '3': styles.bannerContent3,
    };

    return classMap[banner.id] || styles.bannerContent;
  };

  const handleButtonClick = (link?: string) => {
    if (link) {
      navigate(link);
    }
  };

  if (Banners.length === 0) {
    return null;
  }

  return (
    <section className={styles.bannerSlider}>
      <div className={styles.container}>
        {/* Previous button - hidden on mobile */}
        <button className={`${styles.navButton} ${styles.prev}`} onClick={handlePrev} aria-label="Previous banner" type="button">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 12L6 8L10 4" />
          </svg>
        </button>

        {/* Banner content */}
        <div className={styles.bannerContainer} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          <div
            className={styles.bannerTrack}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? 'transform 0.3s ease-out' : 'none',
            }}
          >
            {Banners.map(banner => (
              <div
                key={banner.id}
                className={styles.banner}
                style={{
                  backgroundColor: banner.backgroundColor || 'transparent',
                }}
              >
                <img className={styles.bannerImage} src={getResponsiveImage(banner)} alt="img" />
                <div className={getContentClassName(banner)}>
                  {banner.titleKey && <h2 className={styles.bannerTitle}>{t(banner.titleKey)}</h2>}
                  {banner.subtitleKey && <p className={styles.bannerSubtitle}>{t(banner.subtitleKey)}</p>}
                  {banner.buttonTextKey && (
                    <button className={styles.bannerButton} onClick={() => handleButtonClick(banner.link)}>
                      {t(banner.buttonTextKey)}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next button - hidden on mobile */}
        <button className={`${styles.navButton} ${styles.next}`} onClick={handleNext} aria-label="Next banner" type="button">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 12L10 8L6 4" />
          </svg>
        </button>
      </div>

      {/* Progress dots */}
      {Banners.length > 1 && (
        <div className={styles.dots}>
          {Banners.map((_, index) => (
            <button key={index} className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`} onClick={() => handleDotClick(index)} aria-label={`Go to banner ${index + 1}`} type="button" />
          ))}
        </div>
      )}
    </section>
  );
};
