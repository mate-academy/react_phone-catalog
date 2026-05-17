import React from 'react';
import { Slider } from '../../../shared/components/Slider';
import styles from './ImageSlider.module.scss';

interface Props {
  images: string[];
}

export const ImageSlider: React.FC<Props> = ({ images }) => {
  return (
    <div className={styles.slider}>
      <Slider
        type="baner"
        draggable={true}
        breakpoints={{ 1: 1 }}
        showDots={true}
        dotsClassNames={styles.dots}
        dotsType="img"
      >
        {images.map(img => (
          <img src={img} key={img} className={styles.images} />
        ))}
      </Slider>
    </div>
  );
};
