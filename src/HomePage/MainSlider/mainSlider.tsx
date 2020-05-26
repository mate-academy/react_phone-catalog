import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { IMAGES_FOR_SLIDER } from '../../Additional/additional_api';
import './mainSlider.scss';

export const Slider = () => {
  const [position, setPosition] = useState(0);

  const pushLeftButton = () => {
    setPosition(prevPosition => (position - 1040 < 0
      ? (IMAGES_FOR_SLIDER.length - 1) * 1040
      : prevPosition - 1040));
  };

  const pushRightButton = () => {
    setPosition(prevPosition => (
      position + 1040 < (IMAGES_FOR_SLIDER.length) * 1040
        ? prevPosition + 1040
        : 0));
  };


  useEffect(() => {
    const rotateSlider = setInterval(pushRightButton, 7000);

    return () => clearInterval(rotateSlider);
  });

  // --- second useEffect removes problem with infinite move to one side

  useEffect(() => {
    if (position > (IMAGES_FOR_SLIDER.length - 1) * 1040) {
      setPosition(0);
    }
  }, [position]);


  const clickOnPointerBar = (index: number) => {
    setPosition(index * 1040);
  };

  return (
    <>
      <div className="HomePage__carousel carousel">
        <button
          type="button"
          className="carousel__control carousel__control_left"
          onClick={pushLeftButton}
        >
          <img
            className="carousel__control-arrow carousel__control-arrowleft"
            src="/src/Additional/icons/arrow.svg"
            alt="slide left"
          />
        </button>
        <div className="carousel__images">
          <ul className="carousel__list" style={{ right: `${position}px` }}>
            {IMAGES_FOR_SLIDER.map((image, index) => (
              <li key={image.slice(10, 15)}>
                <img
                  className="carousel__list_img"
                  src={image}
                  alt={`phone${index}`}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="carousel__control carousel__control_right"
          onClick={pushRightButton}
        >
          <img
            className="carousel__control-arrow carousel__control-arrowright"
            src="/src/Additional/icons/arrow.svg"
            alt="slide right"
          />
        </button>
      </div>
      <div className="carousel__pointer">
        {IMAGES_FOR_SLIDER.map((image, index) => (
          <button
            aria-label="touch me"
            type="button"
            key={image.slice(10, 15)}
            onClick={() => (clickOnPointerBar(index))}
            className={cn(position / 1040 === index
              ? 'carousel__pointer_bar carousel__pointer_bar-active'
              : 'carousel__pointer_bar')}
          />
        ))}
      </div>
    </>
  );
};
