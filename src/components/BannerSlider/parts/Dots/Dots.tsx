import { useContext } from 'react';
import { BannerSLiderContext } from '../../BannerSliderContext';
import { Dot } from '../Dot';
import './Dots.scss';

export const Dots = () => {
  const { images, currentSlide } = useContext(BannerSLiderContext);

  return (
    <div className="dots">
      {images.map(image => (
        <Dot key={image.id} isActive={currentSlide.id === image.id} />
      ))}
    </div>
  );
};
