import { FC } from 'react';

import { IMAGES } from '@utils/constants/imagesSLider';

import styles from './SliderList.module.scss';

type TProps = {
  index: number;
};

export const SliderList: FC<TProps> = ({ index }) => (
  <div className={styles.sliderList}>
    {IMAGES.map(image => (
      <div
        key={image.id}
        className={styles.slide}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        <div className={styles.text}>
          <h3 className={styles.title}>{image.name}</h3>
          <p>{image.review}</p>
        </div>
        <img
          src={image.img}
          alt={image.name}
          width={533}
          height={300}
          loading="lazy"
        />
      </div>
    ))}
  </div>
);
