/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Gallery.module.scss';

import { ProductDetail } from '../../types/ProductDetails';

type Props = {
  productDetail: ProductDetail
};

export const Gallery: React.FC<Props> = ({ productDetail }) => {
  const galleryLargeRef = useRef<HTMLImageElement>(null);
  const [carrImg, setCarrImg] = useState(`http://localhost:3000/_new/${productDetail.images[0]}`);

  const changeImg = (img: string) => {
    if (galleryLargeRef.current) {
      galleryLargeRef.current.src = `./_new/${img}`;
      setCarrImg(galleryLargeRef.current.src);
    }
  };

  useEffect(() => {
    setCarrImg(`http://localhost:3000/_new/${productDetail.images[0]}`);
  }, [productDetail]);

  return (
    <>
      <div className={styles.gallery}>
        <ul className={styles.galleryList}>
          {productDetail?.images.map(img => (
            <li key={img}>
              <img
                className={classNames([styles.galleryItem],
                  { [styles.active]: `http://localhost:3000/_new/${img}` === carrImg })}
                src={`new/${img}`}
                alt="thumb"
                onClick={() => changeImg(img)}
              />
            </li>
          ))}
        </ul>
        <div>
          <img
            className={styles.galleryLarge}
            src={`new/${productDetail?.images[0]}`}
            alt="large"
            ref={galleryLargeRef}
          />
        </div>
      </div>
    </>
  );
};
