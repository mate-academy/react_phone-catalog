import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface BannerData {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  modelName: string;
  slogan: string;
  link: string;
}

const slides: BannerData[] = [
  {
    id: 1,
    image: './img/phones/apple-iphone-14-pro/spaceblack/00.webp',
    title: 'banner.slide1.title',
    subtitle: 'banner.slide1.subtitle',
    modelName: 'iPhone 14 Pro',
    slogan: 'banner.slide1.slogan',
    link: '/phones/apple-iphone-14-pro-128gb-spaceblack',
  },
  {
    id: 2,
    image: './img/tablets/apple-ipad-pro-11-2021/spacegray/01.webp',
    title: 'banner.slide2.title',
    subtitle: 'banner.slide2.subtitle',
    modelName: 'iPad Pro',
    slogan: 'banner.slide2.slogan',
    link: '/tablets/apple-ipad-pro-11-2021-128gb-spacegray',
  },
  {
    id: 3,
    image: './img/accessories/apple-watch-series-6/space-gray/00.webp',
    title: 'banner.slide3.title',
    subtitle: 'banner.slide3.subtitle',
    modelName: 'Apple Watch',
    slogan: 'banner.slide3.slogan',
    link: '/accessories/apple-watch-series-6-40mm-space-gray',
  },
];

export const BannerSlider: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (event: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = event.targetTouches[0].clientX;
  };

  const onTouchMove = (event: React.TouchEvent) => {
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <button className="nav-button nav-prev" onClick={prevSlide} />

      <button className="nav-button nav-next" onClick={nextSlide} />

      <div className="slider-wrapper">
        <div
          className="slider-window"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map(slide => (
              <div key={slide.id} className="slide">
                <div className="text-section">
                  <h2 className="gradient-title">
                    <span className="gradient-text">{t(slide.title)}</span>
                  </h2>

                  {slide.subtitle && (
                    <p className="subtitle">{t(slide.subtitle)}</p>
                  )}

                  <button
                    className="btn-order"
                    onClick={() => navigate(slide.link)}
                  >
                    {t('order')}
                  </button>
                </div>

                <div className="image-section">
                  <div className="product-info">
                    <h3 className="product-name">{slide.modelName}</h3>
                    <p className="product-slogan">{t(slide.slogan)}</p>
                  </div>

                  <div className="image-container">
                    <img
                      src={slide.image}
                      alt={slide.modelName}
                      className="product-img"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pagination-slider">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`pagination-slider-dot ${index === currentIndex ? 'active' : 'inactive'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
