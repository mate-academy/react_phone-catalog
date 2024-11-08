import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ProductImage.module.scss';

type TProps = {
  image: string;
  name: string;
};

export const ProductImage: FC<TProps> = ({ image, name }) => {
  const { t } = useTranslation();

  const localMain = t('product.image.main', { name });

  return (
    <div className={styles.image} aria-label={localMain}>
      <img
        src={image}
        alt={localMain}
        width={208}
        height={196}
        loading="eager"
      />
    </div>
  );
};
