
import React, { useState, useEffect } from 'react';

import './PromoSlider.scss';

export const PromoSlider = ({ slides }: { slides: string[] }) => {

  const [activeNum, setActiveNum] = useState(0);
  const [left, setLeft] = useState(- (activeNum * 1040));



  const handleNextSlide = () => {
    if (activeNum === slides.length - 1) {
      setActiveNum(0);
      return;
    }
    setActiveNum(activeNum + 1);
  }

  const handlePrevSlide = () => {
    if (activeNum === 0) {
      setActiveNum(slides.length - 1);
      return;
    }
    setActiveNum(activeNum - 1);
  }

  useEffect(() => {
    const nextMove = setInterval(handleNextSlide, 5000);

    return () => clearInterval(nextMove);
  });


  useEffect (()=> {
    setLeft(- activeNum * 1040)
  }, [activeNum])


  return (
    <div className="PromoSlider">
      <div className="PromoSlider__wrapper">
        <button
          className="PromoSlider__button PromoSlider__button--left"
          onClick={handlePrevSlide}
        >
        </button>
        <div className="PromoSlider__frame">
          <ul
            className="PromoSlider__stripe"
            style={{left: `${left}px`}}
          >
            {slides.map((slideURL) => {
              return (
                <li key={slideURL}>
                  <img className="PromoSlider__item" src={slideURL} alt="Banner Photo" />
                </li>
              )
            })}
          </ul>

        </div>
        <button
          className="PromoSlider__button PromoSlider__button--right"
          onClick={handleNextSlide}
        >
        </button>
      </div>
      <div className="PromoSlider__dots-wrapper">
        {slides.map((item, index) => {
          return (
            <span
              key={item + index}
              className={activeNum === index
                ? "PromoSlider__dot PromoSlider__dot--active"
                : "PromoSlider__dot"}

            ></span>
          )
        })}

      </div>
    </div>

  )
}

