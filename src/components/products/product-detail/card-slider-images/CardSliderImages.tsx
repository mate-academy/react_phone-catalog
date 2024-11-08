import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CardSliderImages.module.scss';
import { CardSliderImage } from './card-slider-image/CardSliderImage';
import { CurrentImage } from './current-image/CurrentImage';

type TProps = {
  images?: string[];
};

export const CardSliderImages: FC<TProps> = ({ images = [] }) => {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(images[0] || '');
  const localNoImage = t('product.image.not');

  useEffect(() => {
    if (images.length) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  if (!images.length) {
    return <p>{localNoImage}</p>;
  }

  return (
    <div className={styles.images}>
      <CurrentImage src={currentImage} />

      {images.map((image, index) => (
        <CardSliderImage
          key={`${image}-${index}`}
          image={image}
          index={index}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
      ))}
    </div>
  );
};
