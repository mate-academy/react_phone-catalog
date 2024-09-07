import { FC } from 'react';

import styles from './dots.module.scss';

<<<<<<< HEAD
import { IMAGES } from '@utils/constants/imagesSLider';
=======
import { IMAGES } from 'utils/constants/imagesSLider';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

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
