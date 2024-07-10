import './PictureSlider.scss';
import { useEffect, useState } from 'react';
import { CarouselItem } from '../HomePage/HomePage';

type Props = {
  items: CarouselItem[];
};

export const PictureSlider = ({ items }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isHovered, items.length]);

  return (
    <>
      <div
        className="carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button className="carousel-button" onClick={handlePrev}>
          &lt;
        </button>
        <div
          className="carousel"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            >
              <img
                src={item.img}
                alt={`Carousel item ${index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </div>
        <button className="carousel-button" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="carousel-pagination">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'carousel-dot--active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </>
  );
};
