import useEmblaCarousel from 'embla-carousel-react';
import { FC } from 'react';

import styles from './GallerySlider.module.scss';
import { useSliderDots } from '@/modules/shared/hooks/useSliderDots';
import classNames from 'classnames';

interface Props {
  images: string[];
  className?: string;
}

export const GallerySlider: FC<Props> = ({ images, className }) => {
  const [sliderRef, sliderApi] = useEmblaCarousel({
    loop: true,
  });

  const { dots, onDotClick, selectedIndex } = useSliderDots(sliderApi);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.slider} ref={sliderRef}>
        <div className={styles.sliderContainer}>
          {images.map((item, index) => {
            const key = `product-img-${index + 1}`;

            return (
              <div key={key} className={styles.slide}>
                <img src={item} alt={key} />
              </div>
            );
          })}
        </div>
      </div>
      <ul className={styles.thumbnails}>
        {dots.map((_, index) => (
          <li
            className={classNames(styles.thumbnail, {
              [styles.activeThumbnail]: selectedIndex === index,
            })}
            onClick={() => onDotClick(index)}
            key={`product-img-thumbnail-${index}`}
          >
            <img src={images[index]} alt={`product-img-thumbnail-${index}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};
