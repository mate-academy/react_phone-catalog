import React from 'react';

// const slides: string[] = [
//   './img/slideFirst.png',
//   './img/slideSecond.png',
//   './img/slideThird.png',
// ];

export const BigCarousel = () => (
  <>
    <div className="container">
      <div className="bigCarousel">
        <button type="button" className="bigArrow leftArrow" />
        {/* {slides.map((item) => {
          return (
            <div>
              <img src={item} alt="эта хрень не работает!!!" />
            </div>
          );
        })} */}
        <div className="bigCarousel__container">
          <img className="logo__img" src="./img/slideFirst.png" alt="company logo" />
        </div>
        <button type="button" className="bigArrow rightArrow" />
      </div>
    </div>
    {/* <img src="../../images/bigCarousel/2.png" alt="" /> */}
  </>
);
// <div className="currentBigSlide" />
