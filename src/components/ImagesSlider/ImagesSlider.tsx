import { useState } from 'react';
// import { useSwipeable } from 'react-swipeable';
import { useSwipeable } from 'react-swipeable';

type Props = {
  className?: string;
  images: string[];
};

export const ImagesSlider: React.FC<Props> = ({ className = '', images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    },
    onSwipedRight: () => {
      setCurrentIndex(
        prevIndex => (prevIndex - 1 + images.length) % images.length,
      );
    },
    trackMouse: true,
  });

  return (
    <div className={`images-slider ${className}`.trim()}>
      <ul className="images-slider__images" {...handlers}>
        {images.map((image, index) => (
          <li
            className="images-slider__image"
            key={index}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          >
            <img src={image} alt={`Product image ${index + 1}`} />
          </li>
        ))}
      </ul>

      <ul className="images-slider__thumbs">
        {images.map((image, index) => (
          <li
            className={`images-slider__thumb ${index === currentIndex ? 'images-slider__thumb--active' : ''}`}
            key={index}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};
