import { useState } from 'react';
import './style.scss';

const images = [
  { id: 1, src: '../img/banner-phones.png', alt: 'banner1' },
  { id: 2, src: '../img/banner-tablets.png', alt: 'banner2' },
  { id: 3, src: '../img/banner-accessories.png', alt: 'banner3' },
];

export const Home = () => {
  const [offSet, setOffSet] = useState(0);
  const [activeSlide, setActiveSlide] = useState(images[0].id);

  const updateActiveSlide = (newOffset: number) => {
    const index = Math.abs(newOffset / 1040);
    const newActiveSlide = images[index].id;

    setActiveSlide(newActiveSlide);
  };

  const handlePrevClick = () => {
    const newOffset = Math.min(offSet + 1040, 0);

    setOffSet(newOffset);

    updateActiveSlide(newOffset);
  };

  const handleNextClick = () => {
    const maxOffset = -1040 * (images.length - 1);
    const newOffset = Math.max(offSet - 1040, maxOffset);

    setOffSet(newOffset);
    updateActiveSlide(newOffset);
  };

  const handleDotClick = (imageId: number) => {
    const clickedIndex = images.findIndex(image => image.id === imageId);
    const newOffset = -clickedIndex * 1040;

    setOffSet(newOffset);
    setActiveSlide(imageId);
  };

  return (
    <div>
      <div className="slider">
        <button
          type="button"
          className="slider-button left"
          id="prevButton"
          onClick={handlePrevClick}
        >
          <img src="../img/icons/icons/left.svg" alt="Previous" />
        </button>
        <div className="slider__content">
          <div className="slider__content-center" style={{ transform: `translateX(${offSet}px)` }}>
            {images.map((image) => (
              <img
                key={image.alt}
                className="slider__content-image"
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="slider-button right"
          id="nextButton"
          onClick={handleNextClick}
        >
          <img src="../img/icons/icons/right.svg" alt="Next" />
        </button>
      </div>

      <div className="slider__dots">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            className={`slider-dot ${activeSlide === image.id ? 'is-active' : ''}`}
            aria-label={`slide-${image.id}`}
            onClick={() => handleDotClick(image.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
