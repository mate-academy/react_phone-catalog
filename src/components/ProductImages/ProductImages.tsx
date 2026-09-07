import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

import styles from './ProductImages.module.scss';
import useEmblaCarousel from 'embla-carousel-react';
import classNames from 'classnames';
import { baseUrl } from '../../utils/ts/baseURL';

export const ProductImages = () => {
  const { activeProduct } = useContext(AppContext)!;
  const [currentSlide, setCurrentSlide] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: true,
  });

  const ScrollTo = useCallback(
    ({ index = 0 }) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        const index = emblaApi.selectedScrollSnap;

        setCurrentSlide(index);
      };

      emblaApi.on('select', onSelect);

      return () => {
        emblaApi.off('select', onSelect);
      };
    }

    return undefined;
  }, [emblaApi]);

  return (
    <div className={styles.productImages}>
      <div className={styles.productImages__mainImageContainer} ref={emblaRef}>
        <div className={styles.productImages__slider}>
          {activeProduct?.images.map((imagePath, index) => (
            <img
              src={`${baseUrl}/${imagePath}`}
              className={styles.productImages__mainImage}
              alt={`Product image ${index}`}
              key={index}
            ></img>
          ))}
        </div>
      </div>

      <div className={styles.productImages__allImages}>
        {activeProduct?.images.map((imagePath, index) => (
          <img
            src={`${baseUrl}/${imagePath}`}
            className={classNames(styles.productImages__image, {
              [styles.productImages__imageActive]: index === currentSlide,
            })}
            alt={`Product image ${index}`}
            key={index}
            onClick={() => ScrollTo({ index })}
          ></img>
        ))}
      </div>
    </div>
  );
};
