import React from 'react';

// const CaruselItems: string[] = [
//   '1.png',
//   '2.png',
//   '3.png',
// ];

export const BigCarousel = () => (
  <>
    <div className="container">
      <div className="bigCarousel">
        <button type="button" className="bigArrow leftArrow" />
        <div className="bigCarousel__container">
          <img src="../../images/bigCarousel/1.png" alt="эта хрень не работает!!!" />
        </div>
        <button type="button" className="bigArrow rightArrow" />
      </div>
    </div>
    <img src="../../images/bigCarousel/1.png" alt="" />
  </>
);
// <div className="currentBigSlide" />
