import { FC, SetStateAction, memo } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import styles from './CardSliderImage.module.scss';

type TProps = {
  image: string;
  index: number;
  currentImage: string;
  setCurrentImage: (value: SetStateAction<string>) => void;
};

export const CardSliderImage: FC<TProps> = memo(
  ({ image, index, currentImage, setCurrentImage }) => {
    const { t } = useTranslation();
    const localSelect = t('product.image.count', { count: index + 1 });
    const localAlt = t('product.image.alt', { count: index + 1 });

    return (
      <button
        type="button"
        className={cn(styles.imagesList, {
          [styles.active]: currentImage === image,
        })}
        onClick={() => setCurrentImage(image)}
        aria-label={localSelect}
      >
        <img src={image} alt={localAlt} width={80} height={80} loading="lazy" />
      </button>
    );
  },
);
