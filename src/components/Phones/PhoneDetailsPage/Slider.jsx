import React, { useState } from 'react';
import { phoneDetailsPropType } from '../../../propTypesConstants';
import './PhoneDetails.scss';
import './slider.scss';
import './order.scss';

export const Slider = (props) => {
  const { details } = props;
  const [activeImg, setActiveImg] = useState(0);
  const handleClick = (event) => {
    event.preventDefault();
    const index = event.target.currentSrc.slice(-5, -4);

    setActiveImg(index);
  };

  return (
    <div className="phoneDetails__slider slider">
      <ul className="slider__list">
        {details.images.map(img => (
          <li
            key={img}
            className="slider__item"
          >
            <a href="/" onClick={handleClick}>
              <img
                src={img}
                alt="motorola-xoom"
                className="slider__images"
              />
            </a>
          </li>
        ))}
      </ul>
      <div className="slider__image">
        <img src={details.images[activeImg]} alt="motorola-xoom" />
      </div>
    </div>
  );
};

Slider.propTypes = {
  details: phoneDetailsPropType.isRequired,
};
