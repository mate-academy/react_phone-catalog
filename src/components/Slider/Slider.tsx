import { useRef, useState } from 'react';
import './Slider.scss';
import prevIcon from '../../assets/icons/prev_icon.png';
import nextIcon from '../../assets/icons/next_icon.png';
import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.png';

const slides = [
  { image: slide1, alt: 'Slide 1' },
  { image: slide2, alt: 'Slide 2' },
  { image: slide3, alt: 'Slide 3' },
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  function scrollToSlide(index: number) {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const nextIndex = (index + slides.length) % slides.length;

    viewport.scrollTo({
      left: nextIndex * viewport.clientWidth,
      behavior: 'smooth',
    });
  }

  function handleScroll() {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const index = Math.round(viewport.scrollLeft / viewport.clientWidth);

    setCurrentIndex(index);
  }

  function handlePrev() {
    scrollToSlide(currentIndex - 1);
  }

  function handleNext() {
    scrollToSlide(currentIndex + 1);
  }

  return (
    <div className="slider grid--sub">
      <button
        className="slider__btn slider__btn--prev"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <img className="slider__btn-icon" src={prevIcon} alt="" />
      </button>
      <div
        className="slider__viewport"
        ref={viewportRef}
        onScroll={handleScroll}
      >
        <div className="slider__track">
          {slides.map(slide => (
            <img
              key={slide.alt}
              src={slide.image}
              className="slider__item"
              alt={slide.alt}
            />
          ))}
        </div>
      </div>

      <button
        className="slider__btn slider__btn--next"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <img className="slider__btn-icon" src={nextIcon} alt="" />
      </button>
      <div className="slider__pagination" aria-label="Choose slide">
        {slides.map((slide, index) => (
          <button
            key={slide.alt}
            type="button"
            className={`slider__dot${currentIndex === index ? ' is-active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentIndex === index ? 'true' : undefined}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
