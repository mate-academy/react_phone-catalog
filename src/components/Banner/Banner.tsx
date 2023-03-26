import { FC, useEffect, useState } from 'react';
import { ImageBanner } from '../ImageBanner/ImageBanner';
import {
  ButtonBannerPagination,
} from '../ButtonBannerPagination/ButtonBannerPagination';
import { ArrowLeft } from '../ArrowLeft/ArrowLeft';
import { ArrowRight } from '../ArrowRight/ArrowRight';

import './Banner.scss';

export const Banner: FC = () => {
  const [activeBanner, setActiveBanner] = useState(0);
  const imagesForBanner = [
    '../../../public/_new/img/banner-phones.png',
    '/_new/img/banner-tablets.png',
    '/_new/img/banner-accessories.png',
  ];

  const startBanner = () => {
    if (activeBanner === 2) {
      setActiveBanner(0);
    } else {
      setActiveBanner(activeBanner + 1);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      startBanner();
    }, 5000);

    return () => {
      clearInterval(timerId);
    };
  }, [activeBanner]);

  return (
    <div className="banner container">
      <div className="banner__content">
        <button
          type="button"
          className="banner__button banner__button--left"
          onClick={() => startBanner()}
        >
          <ArrowLeft />
        </button>

        <div className="banner__image">
          {imagesForBanner.map((image, index) => (
            <ImageBanner
              key={image}
              activeBanner={activeBanner}
              image={image}
              index={index}
            />
          ))}
        </div>

        <button
          type="button"
          className="banner__button banner__button--right"
          onClick={() => startBanner()}
        >
          <ArrowRight />
        </button>
      </div>
      <div className="banner__pagination">
        {imagesForBanner.map((image, index) => (
          <ButtonBannerPagination
            key={image}
            activeBanner={activeBanner}
            setActiveBanner={setActiveBanner}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
