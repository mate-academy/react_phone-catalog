import { useState } from 'react';
import './ImageSlider.scss';
import { Slides } from '../../types/Slides';

type Props = {
  slides: Slides[];
};

const ImageSlider: React.FC<Props> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftButton = () => {
    const isFirstIndex = currentIndex === 0;
    const newIndex = isFirstIndex ? slides.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const handleRightButton = () => {
    const isLastIndex = currentIndex === slides.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  };

  return (
    <div className="slider__container">
      <button
        onClick={handleLeftButton}
        type="button"
        className="slider__button-left slider__button"
      />
      <button
        onClick={handleRightButton}
        type="button"
        className="slider__button-right slider__button"
      />
      <div className="slide-picture">
        <img src={slides[currentIndex].url} alt="" />
      </div>
    </div>
  );
};

export default ImageSlider;
