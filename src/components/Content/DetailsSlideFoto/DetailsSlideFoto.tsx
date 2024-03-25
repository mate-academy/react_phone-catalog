import { useState } from 'react';
import classNames from 'classnames';

import { Details } from '../../../type/Details';

import styles from './DetailsSlideFoto.module.scss';

type Prons = {
  details: Details;
};

export const DetailsSlideFoto: React.FC<Prons> = ({ details }) => {
  const [selectImg, setSelectImg] = useState(details.images[0]);

  if (!details) {
    return null;
  }

  const { images, name } = details;

  return (
    <div className={styles.container}>
      <div className={styles.detailsSlideFoto}>
        {images.map(img => (
          <button
            key={img}
            type="button"
            onClick={() => setSelectImg(img)}
            className={classNames(styles.detailsSlideFoto__button, {
              [styles.detailsSlideFoto__button_active]: img === selectImg,
            })}
          >
            <img
              className={styles.detailsSlideFoto__prevImg}
              src={img}
              alt={name}
            />
          </button>
        ))}
      </div>

      <div className={styles.selectedPhoto}>
        <img src={selectImg} alt="Select foto" />
      </div>
    </div>
  );
};
