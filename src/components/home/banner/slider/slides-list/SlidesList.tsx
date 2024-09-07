import { FC } from 'react';

import styles from './SlidesList.module.scss';

<<<<<<< HEAD
import { IMAGES } from '@utils/constants/imagesSLider';
=======
import { IMAGES } from 'utils/constants/imagesSLider';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

type TProps = {
  index: number;
};

export const SlidesList: FC<TProps> = ({ index }) => (
  <div className={styles.sliderList}>
    {IMAGES.map(image => (
      <div
        key={image.id}
        className={styles.slide}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        <div className={styles.text}>
          <p className={styles.title}>{image.name}</p>
          <p>{image.review}</p>
        </div>
        <img src={image.img} alt={image.name} loading="lazy" />
      </div>
    ))}
  </div>
);
