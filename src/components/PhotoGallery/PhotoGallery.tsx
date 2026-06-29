import { useState } from 'react';
import { ImageSkeleton } from '../ImageSkeleton';
import { useCarousel } from '../../hooks/useCarousel';
import { SWIPE_THRESHOLD_PX } from '../../constants/picturesSlider';
import style from './PhotoGallery.module.scss';
import cn from 'classnames';

type Props = {
  images: string[];
  isLoading: boolean;
};

export const PhotoGallery: React.FC<Props> = ({ images, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { swipeHandlers } = useCarousel({
    currentIndex: activeIndex,
    totalItems: images.length,
    onChange: setActiveIndex,
    swipeThresholdPx: SWIPE_THRESHOLD_PX,
  });

  return (
    <div className={style.galleryContent}>
      <div className={style.viewport} {...swipeHandlers}>
        {isLoading ? (
          <ImageSkeleton />
        ) : (
          <img
            src={images[activeIndex]}
            key={activeIndex}
            className={style.productImage}
            alt={`Product image ${activeIndex + 1}`}
          />
        )}
      </div>

      <ul className={style.previewsImages}>
        {images.map((src, index) => (
          <li key={`${src}-${index}`}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(style.previewButton, {
                [style.isActive]: index === activeIndex,
              })}
            >
              {isLoading ? (
                <ImageSkeleton />
              ) : (
                <img src={src} alt={`Preview ${index + 1}`} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
