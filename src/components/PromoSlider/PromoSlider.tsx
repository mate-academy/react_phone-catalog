
import React from 'react';

import './PromoSlider.scss';

import {Dots} from './dots/dots';
import {Stripe} from './stripe/stripe';


export const PromoSlider = () => {
  return (
    <div className="promo-slider">
      <div className="promo-slider__wrapper">
        <button className="promo-slider__button promo-slider__button--left"></button>
        <div className="promo-slider__frame">
          <Stripe images={[]}/>
        </div>
        <button className="promo-slider__button promo-slider__button--right"></button>
      </div>
          <Dots count = {3} active={2}/> // Dots under slider.
    </div>

  )
}

