import React, { useState } from 'react';
import cn from 'classnames';
import { sliderImg } from '../../helpers/slider';
import './Slider.scss';

export const Slider = () => {
  const [imgPostion, setimgPostion] = useState<number>(0);
  const [activeDot, setActiveDot] = useState<number>(sliderImg[0].id);
  const imgLength = 1040;
  const maxImgLength = (sliderImg.length - 1) * imgLength;

  const handleNextClick = () => {
    if (imgPostion < -(maxImgLength - 1)) {
      setimgPostion(0);
      setActiveDot(1);
    } else {
      setimgPostion(imgPostion - imgLength);
      setActiveDot(activeDot + 1);
    }
  };

  const handlePrevClick = () => {
    if (imgPostion === 0) {
      setimgPostion(-maxImgLength);
      setActiveDot(sliderImg.length);
    } else {
      setimgPostion(imgPostion + imgLength);
      setActiveDot(activeDot - 1);
    }
  };

  const dotOnClick = (id: number) => {
    setActiveDot(id);
    if (id > 1) {
      setimgPostion(-imgLength * (id - 1));
    } else {
      setimgPostion(0);
    }
  };

  const carouselStyle = {
    transform: `translateX(${imgPostion}px)`,
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="Slider__container">
            <button
              type="button"
              className="carousel__btn carousel__btn_prev btn"
              onClick={handlePrevClick}
            >
              { }
            </button>
            <div className="carousel__container">
              <ul className="carousel" style={carouselStyle}>
                {sliderImg.map(({ imgUrl, id }) => (
                  <li
                    className="carousel__item"
                    key={id}
                  >
                    <img className="carousel__img" alt="img1" src={imgUrl} />
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="carousel__btn carousel__btn_next btn"
              onClick={handleNextClick}
            >
              { }
            </button>
          </div>
          <div className="carousel__dots-wrap">
            {sliderImg.map(({ id }, index) => (
              <button
                type="button"
                onClick={() => dotOnClick(id)}
                key={id}
                className={cn('carousel__dot', {
                  carousel__dot_active: activeDot === sliderImg[index].id,
                })}
              >
                {}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
