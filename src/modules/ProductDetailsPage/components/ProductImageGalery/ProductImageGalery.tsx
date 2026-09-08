import { useState } from 'react';
import styles from './ProductImageGalery.module.scss';
import { DetailedType } from '../../../shared/types/DetailedType';

interface Props {
  product: DetailedType;
}

export const ProductImageGalery: React.FC<Props> = ({ product }) => {
  const [largeImgSrc, setLargeImgSrc] = useState(product.images[0]);

  const clickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;

    if (target.tagName === 'IMG') {
      setLargeImgSrc((target.parentElement as HTMLAnchorElement).href);
    } else if (target.tagName === 'A') {
      setLargeImgSrc((target as HTMLAnchorElement).href);
    }
  };

  return (
    <div className={styles.gallery__container}>
      <div className={styles.gallery__large_img_container}>
        <img
          id="largeImg"
          src={largeImgSrc}
          alt="main image"
          className={`${styles.gallery__large_img} ${styles.gallery__img}`}
        />
      </div>

      <ul id="thumbs" className={styles.gallery__list} onClick={clickHandler}>
        {product.images.map((image, index) => (
          <li key={index} className={styles.gallery__list_item}>
            <a href={image} className="list_item__link">
              <img
                src={image}
                className={`${styles.gallery__img} ${styles.gallery__thumb}`}
                alt="thumb"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
