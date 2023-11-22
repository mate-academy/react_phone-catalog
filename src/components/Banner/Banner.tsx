import {
  FC, TouchEvent, useContext, useEffect, useState,
} from 'react';
import classNames from 'classnames';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';
import { bannerImages } from '../../utils/bannerImages';
import { Button } from '../Button/Button';

import './Banner.scss';

export const Banner: FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const { isMobile } = useContext(PhoneCatalogContext);

  const handleButtonClick = (step: number) => {
    const initialIdx = 0;
    const lastIdx = bannerImages.length - 1;

    let newIdx = currentIdx + step;

    if (step < 0) {
      if (currentIdx === initialIdx) {
        newIdx = lastIdx;
      } else if (newIdx < initialIdx) {
        newIdx = initialIdx;
      }
    }

    if (step > 0) {
      if (currentIdx === lastIdx) {
        newIdx = initialIdx;
      } else if (newIdx > lastIdx) {
        newIdx = lastIdx;
      }
    }

    setCurrentIdx(newIdx);
  };

  const handleTouchStart = (event: TouchEvent) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 50) {
      handleButtonClick(-1);
    } else if (deltaX < -50) {
      handleButtonClick(1);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleButtonClick(1);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [handleButtonClick]);

  return (
    <div className="banner">
      {!isMobile && (
        <Button
          className="banner-arrow"
          iconType="arrow-left"
          onClick={() => handleButtonClick(-1)}
        />
      )}

      <div className="banner__carousel-container">
        <div
          className="banner__carousel"
          style={{
            transform: `translateX(${-currentIdx * 100}%)`,
            transition: 'transform 800ms',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {bannerImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Banner img ${index + 1}`}
              className="banner__img"
            />
          ))}
        </div>

        <div className="banner__indicators">
          {bannerImages.map((img, index) => (
            <button
              key={img}
              type="button"
              aria-label="Current banner image indicator"
              className={classNames('banner__indicator', {
                'banner__indicator--active': currentIdx === index,
              })}
              onClick={() => setCurrentIdx(index)}
            />
          ))}
        </div>
      </div>

      {!isMobile && (
        <Button
          className="banner-arrow"
          iconType="arrow-right"
          onClick={() => handleButtonClick(1)}
        />
      )}
    </div>
  );
};
