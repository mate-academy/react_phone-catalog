import './SliderTop.scss';
import React, { useEffect, useState } from 'react';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

let images = [
'/img/banner2.png',
'/img/banner-phones.png',
'/img/category-accessories.png'
];

export const SliderTop: React.FC = () => {

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const displayImages = images.map((img, i) => (
    <img
      className={`slide ${activeSlideIndex === i ? 'active' : ''}`}
      src={img}
      alt="slider"
      height="400px"
      key={i}
    />
  ));


  const previousSlide = () => {
    setActiveSlideIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlideIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

   useEffect(() => {
     const interval = setInterval(() => {
       nextSlide();
     }, 5000); 

     return () => clearInterval(interval); // Cleanup on unmount
   }, []);

  return (
    // <div className="first_section">
    <>
      <h1 id="invitation"> Welcome to Nice Gadgets store!</h1>
      <section className="banner">
        <button className="banner-arrow arrowPrev " onClick={previousSlide}>
          <IoIosArrowBack />
        </button>

        <div className="banner">{displayImages}</div>

        <button className="banner-arrow arrowNext " onClick={nextSlide}>
          <IoIosArrowForward />
        </button>
      </section>
      {/* </div> */}
    </>
  );
};

export default SliderTop;
