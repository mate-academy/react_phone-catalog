import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Slide } from '../../../../../../types';

type Props = {
  slide: Slide;
  isActive: boolean;
  isMobile: boolean;
};

const convertHexToRgba = (hex: string, opacity: number) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const target = e.currentTarget;
  const borderColor = target.getAttribute('data-border-color');

  if (borderColor) {
    target.setAttribute('data-original-border-color', target.style.borderColor);
    target.style.borderColor = borderColor;
  }
};

const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const target = e.currentTarget;
  const originalBorderColor = target.getAttribute('data-original-border-color');

  if (originalBorderColor) {
    target.style.borderColor = originalBorderColor;
  }
};

export const BannerSlide: React.FC<Props> = ({ slide, isActive, isMobile }) => {
  return (
    <div
      className={classNames('banner-slider__slide', {
        active: isActive,
      })}
      style={{ background: `${slide.background}` }}
    >
      {isMobile ? (
        <Link to={slide.url}>
          <h2
            className="banner-slider__slide-heading"
            style={{
              background: `${slide.colorHeading}`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            {slide.message}
          </h2>
          <h3
            className="banner-slider__slide-name"
            style={{ color: `${slide.colorName}` }}
          >
            {slide.name}
          </h3>
          <div className="banner-slider__slide-image">
            <img src={slide.image} alt={slide.name} />
          </div>
        </Link>
      ) : (
        <>
          <div className="banner-slider__slide-content">
            <div
              className="banner-slider__slide-cta"
              style={{
                backgroundColor: `${slide.backgroundCTA}`,
              }}
            >
              <div className="banner-slider__slide-head">
                <h2
                  className="banner-slider__slide-heading"
                  style={{
                    background: `${slide.colorHeading}`,
                    backgroundClip: 'text',
                  }}
                >
                  {slide.message}
                </h2>
              </div>
              <Link
                to={slide.url}
                className="banner-slider__slide-cta-btn"
                style={{
                  color: `${slide.colorName}`,
                  border: `2px solid ${convertHexToRgba(slide.colorName, 0.3)}`,
                }}
                data-border-color={convertHexToRgba(slide.colorName, 1)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                order now
              </Link>
            </div>

            <div className="banner-slider__slide-image-wrapper">
              <h3
                className="banner-slider__slide-name"
                style={{ color: `${slide.colorName}` }}
              >
                {slide.name}
              </h3>
              <div>
                <img src={slide.image} alt={slide.name} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
