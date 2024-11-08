import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import { IMAGES } from '@utils/constants/imagesSLider';

import styles from './Dots.module.scss';

type TProps = {
  goToImage: (index: number) => void;
  imgIndex: number;
};

export const Dots: FC<TProps> = ({ goToImage, imgIndex }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.dots}>
      {IMAGES.map((_, index) => (
        <button
          key={index}
          type="button"
          className={cn(styles.dot, { [styles.active]: imgIndex === index })}
          onClick={() => goToImage(index)}
          aria-label={t('home.banner.dots', { count: index + 1 })}
        />
      ))}
    </div>
  );
};
