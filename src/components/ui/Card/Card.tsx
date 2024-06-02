import React from 'react';
import './CardStyle.scss';

type Props = {
  text?: string;
};

const Card: React.FC<Props> = ({ text = 'asdasdasdasdasdasa sdasdas' }) => {
  return (
    <div className="card">
      <div className="card__container">
        <img
          src="img/phones/apple-iphone-11/black/00.webp"
          alt=""
          className="card__image"
        />
        <div className="card__title">{text}</div>
        <div className="card__text">
          <div className="card__price">
            <div className="card__price--main">$999</div>
            <div className="card__price--discount">$899</div>
          </div>
        </div>
        <hr className="card__line" />
        <div className="card__parameters">
          <div className="card__parameters--screen">
            <div className="card__parameters--title">Screen</div>
            <div className="card__parameters--sub-title">6.5” OLED</div>
          </div>
          <div className="card__parameters--capacity">
            <div className="card__parameters--title">Capacity</div>
            <div className="card__parameters--sub-title">64 GB</div>
          </div>
          <div className="card__parameters--ram">
            <div className="card__parameters--title">RAM</div>
            <div className="card__parameters--sub-title">4 GB</div>
          </div>
        </div>
        <div className="card__buttons">
          <button className="card__buttons--add">Add to cart</button>
          <button className="card__buttons--like like">
            <img src="icons/like.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
