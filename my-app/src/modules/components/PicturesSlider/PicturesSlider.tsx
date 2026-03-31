import { useEffect, useRef, useState } from 'react';
import './PicturesSlider.scss';

interface Slide {
  image: string;
  alt?: string;
}

interface Props {
  slides: Slide[];
  autoPlayInterval?: number;
}

export const PicturesSlider = ({ slides, autoPlayInterval = 5000 }: Props) => {
  const [current, setCurrent] = useState(0);
  const isPaused = useRef(false);
  const length = slides.length;

  const next = () => setCurrent((c) => (c === length - 1 ? 0 : c + 1));
  const prev = () => setCurrent((c) => (c === 0 ? length - 1 : c - 1));

  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused.current) {
        setCurrent((c) => (c === length - 1 ? 0 : c + 1));
      }
    }, autoPlayInterval);

    return () => clearInterval(id);
  }, [length, autoPlayInterval]);

  if (!Array.isArray(slides) || length === 0) {
    return null;
  }

  return (
    <div
      className="pictures-slider"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      <button
        className="pictures-slider__btn pictures-slider__btn--prev"
        onClick={prev}
        aria-label="Previous slide"
      >
        &#8249;
      </button>

      <div className="pictures-slider__track">
        <img
          className="pictures-slider__image"
          src={slides[current].image}
          alt={slides[current].alt ?? `Slide ${current + 1}`}
        />
      </div>

      <button
        className="pictures-slider__btn pictures-slider__btn--next"
        onClick={next}
        aria-label="Next slide"
      >
        &#8250;
      </button>

      <div className="pictures-slider__dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`pictures-slider__dot${idx === current ? ' pictures-slider__dot--active' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
