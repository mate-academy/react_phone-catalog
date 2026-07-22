import { FC, useCallback, useEffect, useState } from 'react';
import styles from './ProductGallery.module.scss';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';

type Props = {
  images: string[];
  name: string;
};

export const ProductGallery: FC<Props> = ({ images, name }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const updateActiveIndex = useCallback(() => {
    if (emblaApi) {
      setActiveIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateActiveIndex();
    emblaApi.on('select', updateActiveIndex);
    emblaApi.on('reInit', updateActiveIndex);

    return () => {
      emblaApi.off('select', updateActiveIndex);
      emblaApi.off('reInit', updateActiveIndex);
    };
  }, [emblaApi, updateActiveIndex]);

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__thumbs}>
        {images.map((image, index) => (
          <button
            type="button"
            className={classNames(styles.gallery__thumb, {
              [styles.gallery__thumbActive]: index === activeIndex,
            })}
            key={image}
            onClick={() => emblaApi?.scrollTo(index)}
          >
            <img
              src={image}
              alt={name}
              className={styles.gallery__thumbImage}
            />
          </button>
        ))}
      </div>
      <div className={styles.gallery__preview} ref={emblaRef}>
        <div className={styles.gallery__track}>
          {images.map(image => (
            <div className={styles.gallery__slide} key={image}>
              <img src={image} alt={name} className={styles.gallery__image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
