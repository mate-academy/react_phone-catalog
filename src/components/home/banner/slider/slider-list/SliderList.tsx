import { FC } from 'react';

import { Title } from '@ui/index';

import { IMAGES } from '@utils/constants/imagesSLider';

import styles from './SliderList.module.scss';

type TProps = {
  index: number;
};

export const SliderList: FC<TProps> = ({ index }) => (
  <div className={styles.sliderList}>
    {IMAGES.map(({ id, name, img, review }) => (
      <div
        key={id}
        className={styles.slide}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        <div className={styles.text}>
          <Title level={3}>{name}</Title>
          <p>{review}</p>
        </div>
        <img src={img} alt={name} width={533} height={300} loading="lazy" />
      </div>
    ))}
  </div>
);
