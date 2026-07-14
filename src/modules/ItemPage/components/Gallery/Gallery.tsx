import { useCallback, useEffect, useState } from 'react';
import styles from './Gallery.module.scss';
import classNames from 'classnames';
import { ImageSelector } from './components/ImageSelector';
import useEmblaCarousel from 'embla-carousel-react';
import { ProgressiveImage } from '../../../shared/components/ProgressiveImage';

interface Props {
  images: string[];
  className?: string;
}

export const Gallery: React.FC<Props> = ({ images, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCurrentImageIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={classNames(styles.gallery, className)}>
      <div className={styles.gallery__wrapper} ref={emblaRef}>
        <ul className={styles.gallery__collection}>
          {images.map((image, index) => (
            <li className={styles.gallery__item} key={index}>
              <ProgressiveImage
                src={image}
                alt=""
                className={styles.gallery__image}
              />
            </li>
          ))}
        </ul>
      </div>

      <ImageSelector
        images={images}
        currentIndex={currentImageIndex}
        className={styles.gallery__selector}
        scrollTo={scrollTo}
      />
    </div>
  );
};
