import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Gallery.module.scss';

import { ProductDetail } from '../../types/ProductDetails';

type Props = {
  productDetail: ProductDetail
};

export const Gallery: React.FC<Props> = ({ productDetail }) => {
  const galleryLargeRef = useRef<HTMLImageElement>(null);
  const [carrImg, setCarrImg] = useState(`${window.location.origin}/new/${productDetail.images[0]}`);

  const changeImg = (img: string) => {
    if (galleryLargeRef.current) {
      galleryLargeRef.current.src = `new/${img}`;
      setCarrImg(galleryLargeRef.current.src);
    }
  };

  useEffect(() => {
    setCarrImg(`${window.location.origin}/new/${productDetail.images[0]}`);
  }, [productDetail]);

  return (
    <>
      <div className={styles.gallery}>
        <ul className={styles.galleryList}>
          {productDetail?.images.map(img => (
            <li key={img}>
              <button type="button" onClick={() => changeImg(img)}>
                <img
                  className={classNames([styles.galleryItem],
                    { [styles.active]: `${window.location.origin}/new/${img}` === carrImg })}
                  src={`new/${img}`}
                  alt="thumb"
                />
              </button>
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
