import styles from './ImagesDisplay.module.scss';
import { ImageItem } from '../ImageItem';
import { useContext, useState } from 'react';
import { ProductDetailsContext } from 'store/ProductDetailsContext';
import useCheckMediaQuery from 'hooks/useCheckMediaQuery';

export const ImagesDisplay = () => {
  const { product } = useContext(ProductDetailsContext);

  const [selectedImage, setSelectedImage] = useState<string>(
    product ? product.images[0] : '',
  );

  const { isMobile } = useCheckMediaQuery();

  const handleSetSelectedImage = (image: string) => {
    setSelectedImage(image);
  };

  if (!product) {
    return;
  }

  return (
    <div className={styles.container}>
      {!isMobile && (
        <ul className={styles.container__list}>
          {product.images.map(i => (
            <li key={i} className={styles.item}>
              <ImageItem
                imageUrl={i}
                isSelected={selectedImage === i}
                setSelectedImage={() => handleSetSelectedImage(i)}
              />
            </li>
          ))}
        </ul>
      )}
      <div className={styles.container__main}>
        <img src={`${selectedImage}`} />
      </div>
      {isMobile && (
        <ul className={styles.container__row}>
          {product.images.map(i => (
            <li key={i} className={styles.item}>
              <ImageItem
                imageUrl={i}
                isSelected={selectedImage === i}
                setSelectedImage={() => handleSetSelectedImage(i)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
