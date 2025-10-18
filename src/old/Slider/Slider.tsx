import React from 'react';

export const Slider = () => {
  return (
    <>
      <section className="slider">
        <div className="container">
          <div className="slider__top">
            <h2 className="slider__title">Brand new models</h2>
            <div className="slider__cards">
              <div className="slider__card card">
                <img src="" alt="" className="card__image" />
                <h5 className="card__title">
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </h5>
                <p className="card__price">$900</p>
                <div className="card__desc">
                  <div className="card__info">
                    <div className="card__info_left">Screen</div>
                    <div className="card__info_rigth">6.1” OLED</div>
                  </div>
                  <div className="card__info">
                    <div className="card__info_left">Screen</div>
                    <div className="card__info_rigth">6.1” OLED</div>
                  </div>
                  <div className="card__info">
                    <div className="card__info_left">Screen</div>
                    <div className="card__info_rigth">6.1” OLED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
