import { useState } from 'react';
import './style.scss';

const images = [
  { id: 1, src: './img/banner-phones.png', alt: 'banner1' },
  { id: 2, src: './img/banner-tablets.png', alt: 'banner2' },
  { id: 3, src: './img/banner-accessories.png', alt: 'banner3' },
];

export const Home = () => {
  const [offSet, setOffSet] = useState(0);
  const [activeSlide, setActiveSlide] = useState<number>(images[0].id);

  const updateActiveSlide = (newOffset: number) => {
    const contentCenter = document.querySelector('.slider__content-center');

    if (contentCenter) {
      const itemWidth = contentCenter.children[0].clientWidth;

      const index = Math.abs(newOffset / itemWidth);
      const newActiveSlide = images[Math.floor(index)].id;

      setActiveSlide(newActiveSlide);
    }
  };

  const handlePrevClick = () => {
    const contentCenter = document.querySelector('.slider__content-center');

    if (contentCenter) {
      const itemWidth = contentCenter.children[0].clientWidth;

      const newOffset = Math.min(offSet + itemWidth, 0);

      setOffSet(newOffset);
      updateActiveSlide(newOffset);
    }
  };

  const handleNextClick = () => {
    const contentCenter = document.querySelector('.slider__content-center');

    if (contentCenter) {
      const itemWidth = contentCenter.children[0].clientWidth;

      const maxOffset = -itemWidth * (images.length - 1);
      const newOffset = Math.max(offSet - itemWidth, maxOffset);

      setOffSet(newOffset);
      updateActiveSlide(newOffset);
    }
  };

  const handleDotClick = (imageId: number) => {
    const contentCenter = document.querySelector('.slider__content-center');

    if (contentCenter) {
      const itemWidth = contentCenter.children[0].clientWidth;

      const clickedIndex = images.findIndex(image => image.id === imageId);
      const newOffset = -clickedIndex * itemWidth;

      setOffSet(newOffset);
      setActiveSlide(imageId);
    }
  };

  return (
    <>
      <div className="slider">
        <button
          type="button"
          className="slider-button left"
          id="prevButton"
          onClick={handlePrevClick}
        >
          <img src="./img/icons/left.svg" alt="Previous" />
        </button>
        <div className="slider__content">
          <div className="slider__content-center" style={{ transform: `translateX(${offSet}px)` }}>
            {images.map((image) => (
              <img
                key={image.id}
                className="slider__content-image"
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="slider-button next"
          id="nextButton"
          onClick={handleNextClick}
        >
          <img src="./img/icons/right.svg" alt="Next" />
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
    </>
  );
};

export default Home;
