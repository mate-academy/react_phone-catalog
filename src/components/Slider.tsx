import React from 'react';

interface Props {
  margin: number;
  width: number;
}
export const Slider: React.FC<Props> = ({ margin, width }) => {

  return (
    <div className="slider">
      <ul style={{maxWidth: `${width}px`}}className="slider__list">
        <li style={{marginLeft: `${margin}px`}}className="slider__item">
          <img
            src="../../img/images/home/Banner.png"
            className="slider__img"
            alt="banner"
            style={{width: `${width}px`}}
          />
        </li>
        <li className="slider__item">
          <img
            src="../../img/images/home/Banner.png"
            className="slider__img"
            alt="banner"
            style={{width: `${width}px`}}
          />
        </li>
        <li className="slider__item">
          <img
            src="../../img/images/home/Banner.png"
            className="slider__img"
            alt="banner"
            style={{width: `${width}px`}}
          />
        </li>
      </ul>
    </div>
  )
}
