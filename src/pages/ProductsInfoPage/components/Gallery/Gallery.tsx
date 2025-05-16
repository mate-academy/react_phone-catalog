import { useEffect, useState } from 'react';
import styles from './Gallery.module.scss';
import { AllProduct } from '../../../../types/AllProduct';
import classNames from 'classnames';

type Props = {
  selectedProduct: AllProduct;
};

export const Gallery= ({ selectedProduct } : Props) => {
  const [activeImg, setActiveImg] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProduct && selectedProduct.images.length > 0) {
      setActiveImg(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  const handleImgClick = (image: string) => {
    setActiveImg(image);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__content}>
        <div className={styles.gallery__wrapper}>
          <div className={styles.gallery__photos}>
            {selectedProduct.images.map((image, index) => (
              <img
                src={image}
                className={classNames(styles.gallery__photo, {
                  [styles.gallery__activePhoto]: activeImg === image,
                })}
                key={index}
                onClick={() => handleImgClick(image)}
              />
            ))}
          </div>
        </div>

        <div className={styles.gallery__activeImage}>
          {activeImg && (
            <img className={styles.gallery__mainImage} src={activeImg} />
          )}
        </div>
      </div>
    </div>
  );
};