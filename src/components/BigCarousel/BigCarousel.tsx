import React from 'react';

// const slides: string[] = [
//   '../../images/bigCarousel/1.png',
//   '../../images/bigCarousel/2.png',
//   '../../images/bigCarousel/3.png',
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
          <img src={require('../../images/bigCarousel/1.png')} alt="эта хрень не работает!!!" />
        </div>
        <button type="button" className="bigArrow rightArrow" />
      </div>
    </div>
    {/* <img src="../../images/bigCarousel/2.png" alt="" /> */}
  </>
);
// <div className="currentBigSlide" />
