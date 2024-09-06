import { FC } from 'react';

import styles from './SlidesList.module.scss';

import { IMAGES } from 'utils/constants/imagesSLider';

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
