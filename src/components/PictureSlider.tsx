/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { API_URL } from '../utils/api-phones';
import '../styles/PictureSlider.scss';

const bannerPhotos = ['phones', 'tablets', 'accessories'];

export const PictureSlider: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const widthScroll = startIndex * 100;

  const transform = {
    transform: `translate(-${widthScroll}%, 0)`,
  };

  const handleSlideLeft = () => {
    setStartIndex(index => (index === 0 ? 2 : index - 1));
  };

  const handleSlideRight = () => {
    setStartIndex(index => (index === 2 ? 0 : index + 1));
  };

  const handleDotsSlide = (dot: string) => {
    setStartIndex(bannerPhotos.indexOf(dot));
  };

  return (
    <div className="PictureSlider">
      <div className="PictureSlider__top">
        <button
          type="button"
          className="PictureSlider__button-left"
          onClick={handleSlideLeft}
        />

        <div className="PictureSlider__photo-container">
          <ul className="PictureSlider__photos-list" style={transform}>
            {bannerPhotos.map(photo => (
              <li key={photo} className="PictureSlider__photos-item">
                <Link to={photo} className="PictureSlider__link">
                  <img
                    className="PictureSlider__photo"
                    src={`${API_URL}img/banner-${photo}.png`}
                    alt=""
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="PictureSlider__button-right"
          onClick={handleSlideRight}
        />
      </div>

      <div className="PictureSlider__dots">
        {bannerPhotos.map(dot => (
          <button
            type="button"
            className="PictureSlider__dot-button"
            onClick={() => handleDotsSlide(dot)}
          >
            <span className={cn('PictureSlider__dot', {
              'PictureSlider__dot--active':
                bannerPhotos.indexOf(dot) === startIndex,
            })}
            />
          </button>
        ))}

      </div>
    </div>
  );
};
