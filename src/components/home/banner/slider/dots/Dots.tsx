import { FC } from 'react';

import styles from './dots.module.scss';

import { IMAGES } from '@utils/constants/imagesSLider';

type TProps = {
  goToImage: (index: number) => void;
  imgIndex: number;
};

export const Dots: FC<TProps> = ({ goToImage, imgIndex }) => (
  <div className={styles.dots}>
    {IMAGES.map((_, index) => (
      <button
        key={index}
        className={`${styles.dot} ${imgIndex === index && styles.active}`}
        onClick={() => goToImage(index)}
        aria-label={`Go to slide ${index}`}
      />
    ))}
  </div>
);
