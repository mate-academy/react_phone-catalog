import { useEffect, useState } from 'react';
import './Slide.scss';

interface SlideshowProps {
  images: string[];
}

export const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  return (
    <div className="slideshow">
      <button onClick={handlePrev}>&#10094;</button>
      <img src={images[currentIndex]} alt="Slide" className="img" />
      <button onClick={handleNext}>&#10095;</button>
    </div>
  );
};
