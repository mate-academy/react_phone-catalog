import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import styles from './ImageGallery.module.scss';

type Props = {
  product: ProductDetails;
};

export const ImageGallery: React.FC<Props> = ({ product }) => {
  const [clickedImage, setClickedImage] = useState(product.images[0]);

  const handleImageClick = (image: string) => {
    setClickedImage(image);
  };

  useEffect(() => {
    setClickedImage(product.images[0]);
  }, [product.images]);

  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageBigWrapperMobile}>
        <img
          src={clickedImage}
          alt={product.namespaceId}
          className={styles.imageBig}
        />
      </div>

      <div className={styles.imageSmallWrapper}>
        {product.images.map((image, index) => (
          <div
            key={index}
            className={
              image === clickedImage
                ? styles.imageBorderActive
                : styles.imageBorder
            }
          >
            <img
              src={image}
              alt={product.namespaceId}
              className={styles.imageSmall}
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className={styles.imageBigWrapper}>
        <img
          src={clickedImage}
          alt={product.namespaceId}
          className={styles.imageBig}
        />
      </div>
    </div>
  );
};
