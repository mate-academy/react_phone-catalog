import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CurrentImage.module.scss';

type TProps = {
  src: string;
};

export const CurrentImage: FC<TProps> = ({ src }) => {
  const { t } = useTranslation();
  const localSelect = t('product.image.select');

  return (
    <div className={styles.currentImage} role="img" aria-label={localSelect}>
      <img src={src} alt={localSelect} />
    </div>
  );
};
