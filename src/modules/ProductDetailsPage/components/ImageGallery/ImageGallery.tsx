import { useEffect, useState } from 'react';
import { ProductDetails } from '../../../../types/ProductDetails';
import { ProductImage } from '../../../shared/components/ProductImage';
import styles from './ImageGallery.module.scss';

type Props = {
  product: ProductDetails;
};

export const ImageGallery: React.FC<Props> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // reset to the first image whenever the color/product changes
  useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  const activeImage = product.images[activeIndex] ?? product.images[0];

  return (
    <div className={styles.gallery}>
      <ul className={styles.gallery__thumbs}>
        {product.images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              className={`${styles.gallery__thumb} ${
                index === activeIndex ? styles['gallery__thumb--active'] : ''
              }`}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <ProductImage src={image} alt="" />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.gallery__main} data-cy="product-image">
        <ProductImage src={activeImage} alt={product.name} loading="eager" />
      </div>
    </div>
  );
};
