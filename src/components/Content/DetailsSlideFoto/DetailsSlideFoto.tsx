import {useEffect, useState} from 'react';
import classNames from 'classnames';

import {Details} from '../../../type/Details';

import styles from './DetailsSlideFoto.module.scss';

type Prons = {
  details: Details;
};

export const DetailsSlideFoto: React.FC<Prons> = ({details}) => {
  const [selectetImg, setSelectetImg] = useState(details.images[0]);

  useEffect(() => {
    if (details && details.images.length > 0) {
      setSelectetImg(details.images[0]);
    }
  }, [details]);

  if (!details) {
    return null;
  }

  const {images, name} = details;

  return (
    <div className={styles.container}>
      <div className={styles.detailsSlideFoto}>
        {images.map(img => (
          <button
            key={`${img}`}
            type="button"
            onClick={() => setSelectetImg(img)}
            className={classNames(styles.detailsSlideFoto__button, {
              [styles.detailsSlideFoto__button_active]: img === selectetImg,
            })}
          >
            <img
              className={styles.detailsSlideFoto__prevImg}
              src={selectetImg}
              alt={name}
            />
          </button>
        ))}
      </div>

      <div className={styles.selectedPhoto}>
        <img src={selectetImg} alt="Select foto" />
      </div>
    </div>
  );
};
