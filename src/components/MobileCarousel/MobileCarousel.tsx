import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './MobileCarousel.scss';
import { CurrentImage } from '@/types/CurrentImage';

type Props = {
  images: string[];
};

export const MobileCarousel: React.FC<Props> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleSlideRight = () => {
    if (currentImage === images.length - 1) {
      return;
    }

    setCurrentImage(image => image + 1);
  };

  const handleSlideLeft = () => {
    if (currentImage === CurrentImage.First) {
      return;
    }

    setCurrentImage(image => image - 1);
  };

  const mobileHandlers = useSwipeable({
    onSwipedLeft: () => handleSlideRight(),
    onSwipedRight: () => handleSlideLeft(),
    trackMouse: true,
  });

  return (
    <div className="MobileCarousel">
      <ul
        className="MobileCarousel__list"
        style={{ transform: `translate(-${currentImage * 100}%, 0)` }}
        {...mobileHandlers}
      >
        {images?.map(image => (
          <li key={image}>
            <img src={image} alt="product" />
          </li>
        ))}
      </ul>
    </div>
  );
};
