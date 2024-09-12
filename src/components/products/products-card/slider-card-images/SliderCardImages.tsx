import { FC } from 'react';

import styles from './SliderCardImages.module.scss';

type TProps = {
  images?: string[];
  name?: string;
};

export const SliderCardImages: FC<TProps> = ({ images, name }) => {
  return (
    <>
      {images && (
        <div className={styles.images}>
          {images.map(image => (
            <button className={styles.image} key={image} type="button">
              <img src={image} alt={name} width={80} height={80} />
            </button>
          ))}
        </div>
      )}
    </>
  );
};
