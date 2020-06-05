import React, { useState, FC } from 'react';
import { Phone } from '../../Additional/interfaces';
import './ProductSlider.scss';
import { Card } from '../Card/Card';


type Params = {
  title: string;
  phones: Phone[];
};


export const ProductSlider: FC<Params> = ({ phones, title }) => {
  const [position, setPosition] = useState(0);

  const pushLeftButton = () => {
    setPosition(prevPosition => (position - 288 < 0
      ? (phones.length - 4) * 288
      : prevPosition - 288));
  };

  const pushRightButton = () => {
    setPosition(prevPosition => (position + 288 < (phones.length - 3) * 288
      ? prevPosition + 288
      : 0));
  };

  return (
    <div className="ProductSlider">
      <div className="ProductSlider__navigation">
        <h2 className="ProductSlider__navigation_header">{title}</h2>
        <div className="ProductSlider__navigation_buttons">
          <button
            type="button"
            onClick={pushLeftButton}
            className="ProductSlider__navigation_buttons-left"
          >
            <img
              className="ProductSlider__navigation_buttons-left-image"
              alt="favourites"
              src="img/icons/arrow.svg"
            />
          </button>
          <button
            type="button"
            onClick={pushRightButton}
            className="ProductSlider__navigation_buttons-right"
          >
            <img
              className="ProductSlider__navigation_buttons-right-image"
              alt="favourites"
              src="img/icons/arrow.svg"
            />
          </button>
        </div>
      </div>

      <div className="discount">
        <ul className="discount__list" style={{ right: position }}>
          {phones.map((phone: Phone) => (
            <li key={phone.id}>
              <Card phone={phone} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
