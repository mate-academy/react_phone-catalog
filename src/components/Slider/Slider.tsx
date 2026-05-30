import { useState } from 'react';
import './Slider.scss';

// Прибрали /public/ і перший слеш з масиву шляхів
const images = [
  'img/icons/Banner (1).png',
  'img/icons/img.png',
  'img/banner-phones.png', // Перевір, чи є цей файл у папці public/img/
];

export const Slider = () => {
  const [index, setIndex] = useState(0);
  const baseUrl = import.meta.env.BASE_URL;

  const prev = () => {
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="slider">
      <h1>Welcome to Nice Gadgets store!</h1>
      <button className="slider__arrow slider__arrow--left" onClick={prev}>
        ‹
      </button>

      <div className="slider__window">
        <div
          className="slider__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            // ДОДАНО СЛЕШ: `${baseUrl}/${src}`
            <img key={i} src={`${baseUrl}/${src}`} className="slider__image" alt={`Slide ${i}`} />
          ))}
        </div>
      </div>

      <button className="slider__arrow slider__arrow--right" onClick={next}>
        ›
      </button>
    </section>
  );
};
