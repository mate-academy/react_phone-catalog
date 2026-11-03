import './Bunner.scss';

import bunner1 from '../../../public/img/banner-accessories.png';
import bunner2 from '../../../public/img/banner-phones.png';
import bunner3 from '../../../public/img/banner-tablets.png';

import { useEffect, useState } from 'react';

export const Bunner = () => {
  const [current, setCurrent] = useState(0);

  const bunner = [bunner1, bunner2, bunner3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % bunner.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [bunner.length]);

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % bunner.length);
  };

  const previousSlide = () => {
    setCurrent(prev => (prev - 1 + bunner.length) % bunner.length);
  };

  return (
    <section className="bunner">
      <div className="bunner__container">
        <div
          className="bunner__track"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {bunner.map((image, index) => (
            <div className="bunner__slide" key={index}>
              <img src={image} alt={`Banner ${index + 1}`} />
            </div>
          ))}
        </div>

        <button
          className="bunner__button bunner__button--left"
          onClick={previousSlide}
        >
          ‹
        </button>

        <button
          className="bunner__button bunner__button--right"
          onClick={nextSlide}
        >
          ›
        </button>

        <div className="bunner__dots">
          {bunner.map((_, index) => (
            <button
              key={index}
              className={`bunner__dot ${
                current === index ? 'bunner__dot--active' : ''
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
