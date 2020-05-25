import React, { useState } from 'react';
import './MainSlider.scss';

const marginLeftBanner = 10;
const widthBanner = 1040 + marginLeftBanner;
const widthCarousel = widthBanner * 2;

const sliders = [
  {
    id: 1,
    image: './img/Banner.jpg',
  },
  {
    id: 2,
    image: './img/Banner.jpg',
  },
  {
    id: 3,
    image: './img/Banner.jpg',
  },
];

const MainSlider: React.FC = () => {
  const [selectedDot, setSelectedDot] = useState(0);
  const [position, setPosition] = useState(0);

  const handlePrevOnClick = () => {
    if (position === 0) {
      setPosition(-widthCarousel);
      setSelectedDot(sliders.length - 1);
    } else {
      setPosition(position + widthBanner);
      setSelectedDot(selectedDot - 1);
    }
  };

  const handleNextOnClick = () => {
    setPosition(position - widthBanner);
    setSelectedDot(selectedDot + 1);

    if (-position > widthCarousel - widthBanner) {
      setPosition(0);
      setSelectedDot(0);
    }
  };

  return (
    <div>
      <div className="containerMainSlider">
        <button
          type="button"
          className="сarousel__button btn-left"
          aria-label="Mute volume"
          onClick={handlePrevOnClick}
        />

        <div className="container__сarousel сarousel">
          <div
            style={{ transform: `translate(${position}px)` }}
            className="сarousel__list"
          >
            {sliders.map(slide => (
              <div
                className="сarousel__item"
                key={slide.id}
              >
                <img src={slide.image} alt="photos" />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Mute volume"
          className="сarousel__button btn-right"
          onClick={handleNextOnClick}
        />
      </div>

      <ul className="сarousel__dots-wrap">
        {sliders.map((item, index) => {
          const className = selectedDot === index ? 'сarousel__dot--active' : 'сarousel__dot';

          return (
            <li
              key={item.id}
              className={className}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MainSlider;
