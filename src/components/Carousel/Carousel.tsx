import { useState } from 'react';
import bannerOne from './banners/banner-carousel-1.png';
import bannerTwo from './banners/banner-carousel-2.jpg';
import bannerThree from './banners/banner-carousel-3.jpg';
import { CarouselButton } from './CarouselButton';
import { CarouselBanner } from './CarouselBanner';
import { SelectedBannerIcon } from './SelectedBannerIcon';
import './Carousel.scss';

const banners = [
  {
    path: bannerOne,
    alt: 'phones',
  },
  {
    path: bannerTwo,
    alt: 'tablets',
  },
  {
    path: bannerThree,
    alt: 'accessories',
  },
];

const carouselSettings = {
  bannerWidth: 1040,
  bannerGap: 64,
  totalBanners: banners.length,
};

export const Carousel = () => {
  const { bannerWidth, bannerGap, totalBanners } = carouselSettings;
  const [currentBanner, setCurrentBanner] = useState(1);
  const scroll = -(currentBanner - 1) * (bannerWidth + bannerGap);
  const styles = {
    transform: `translateX(${scroll}px)`,
    transition: 'transform 0.5s',
  };

  const handleBannerChange = (direction: 'next' | 'prev') => {
    let newBanner: number;

    if (direction === 'next') {
      newBanner = currentBanner === totalBanners ? 1 : currentBanner + 1;
    } else {
      newBanner = currentBanner === 1 ? totalBanners : currentBanner - 1;
    }

    setCurrentBanner(newBanner);
  };

  return (
    <>
      <div className="carousel grid">
        <CarouselButton
          action="prev"
          hadnleClick={handleBannerChange}
        />
        <div className="carousel__images-container">
          <div
            style={styles}
            className="carousel__images"
          >
            {banners.map(({ path, alt }) => (
              <CarouselBanner
                key={alt}
                path={path}
                alt={alt}
                bannerWidth={bannerWidth}
                bannerGap={bannerGap}
              />
            ))}
          </div>
        </div>
        <CarouselButton
          action="next"
          hadnleClick={handleBannerChange}
        />
      </div>
      <div className="selected-banner">
        {banners.map(({ alt }, i) => (
          <SelectedBannerIcon
            key={alt}
            isSelected={currentBanner === i + 1}
          />
        ))}
      </div>
    </>
  );
};
