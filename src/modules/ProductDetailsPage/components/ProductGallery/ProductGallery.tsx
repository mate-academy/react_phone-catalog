//#region imports
import cn from 'classnames';
import { useState, FC, useRef, useCallback } from 'react';
import { useSwipe } from '../../../shared/hooks/useSwipe';
import { useTranslation } from 'react-i18next';
import baseStyles from './base.module.scss';
import styles from './ProductGallery.module.scss';
//#endregion

type Props = {
  allImages: string[];
};

export const ProductGallery: FC<Props> = ({ allImages }) => {
  const { t } = useTranslation('productDetails');

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = allImages[selectedIndex];

  const swipe = useRef<HTMLDivElement>(null);

  const handleSwipe = useCallback(
    (start: number, end: number) => {
      const direction = start > end ? 1 : -1;
      const newIndex = selectedIndex + direction;

      if (newIndex >= 0 && newIndex < allImages.length) {
        setSelectedIndex(newIndex);
      }
    },
    [selectedIndex, allImages.length],
  );

  useSwipe(handleSwipe, swipe);

  return (
    <div className={baseStyles.productGallery}>
      <ul className={baseStyles.allImages} aria-label={t('productImages')}>
        {allImages.map((image, i) => (
          <li key={image}>
            <button
              aria-label={`Image ${i + 1}`}
              aria-pressed={selectedIndex === i}
              onClick={() => setSelectedIndex(i)}
              className={cn(baseStyles.smallImg, styles.smallImgWrapper, {
                [styles.active]: selectedIndex === i,
              })}
            >
              <img
                src={image}
                alt={`Product image ${i + 1} of ${allImages.length}`}
                className={styles.smallImg}
              />
            </button>
          </li>
        ))}
      </ul>

      <div className={baseStyles.imgWrapper} ref={swipe}>
        <img
          key={selectedIndex}
          src={selectedImage}
          alt={`Selected product image ${selectedIndex + 1} of ${allImages.length}`}
          className={styles.selectedImage}
        />
      </div>
    </div>
  );
};
