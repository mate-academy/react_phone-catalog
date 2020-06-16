import React, { useState } from 'react';
import CN from "classnames";
import { Card } from '../card/Card';
import { IGood } from '../../provider/dataFromApi';

import "./Brands.scss";

type Props = { goods: IGood[]; wigthSlides: number }

const HotPrice: React.FC<Props> = ({ goods, wigthSlides }) => {

  const [imgPosition, setImgPosition] = useState<number>(0);
  const sliderLength = goods.length;

  const count = sliderLength / 4;
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [stateNexttBtn, setStateNextBtn] = useState<boolean>(true);
  const [statePrevBtn, setStatePrevBtn] = useState<boolean>(false);

  const handleNextSlide = () => {
    if (currentSlide < count - 1) {
      setImgPosition(imgPosition + wigthSlides);
      setCurrentSlide(currentSlide + 1);
      setStatePrevBtn(true);
    }
    if (currentSlide === count - 1) {
      setStateNextBtn(false);
    }
  }

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setImgPosition(imgPosition - wigthSlides);
      setCurrentSlide(currentSlide - 1);
      setStateNextBtn(true);
    }

    if (currentSlide - 1 === 0) {
      setStatePrevBtn(false);
    }
  };

  return (
    <div>
      <div className="CardSliderBtn__wrapper">
        <button
          type="button"
          className={CN({
            button__left: true,
            disabledBtn: !statePrevBtn,
          })}
          disabled={!statePrevBtn}
          onClick={() => handlePrevSlide()}
        >
        </button>
        <button
          type="button"
          className={CN({
            button__right: true,
            disabledBtn: !stateNexttBtn,
          })}
          disabled={!stateNexttBtn}
          onClick={() => handleNextSlide()}
        ></button>
      </div>
      <div className="CardSlider__container">
        <ul
          className="CardSlider__list "
          style={{ transform: `translateX(${imgPosition}%)` }}
        >
          {goods.map(good =>
            <div className="CardSlider__item">
              < Card good={good} />
            </div>
          )}
        </ul>
      </div>

      {/* <div className="Card">
        <ul className="Card__list">
          {goods.map(good =>
            < Card good={good} />)}
        </ul>
      </div> */}
    </div>
  );
};

export default HotPrice;
