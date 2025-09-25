import { useParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import styles from './ProductDetailsPage.module.scss';
import { PhoneDetails } from './interfaces/PhoneDetailsInterface';
import { useState } from 'react';
import phones from '../../../public/api/phones.json';

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const dataMap: Record<string, PhoneDetails[]> = {
    phones,
    tablets: [],
    accessories: [],
  };

  const detailsData = dataMap[category || ''] || [];
  const product = detailsData.find(p => p.id === productId);
  const [selectedColor, setSelectedColor] = useState(product?.color || '');
  const [selectedCapacity, setSelectedCapacity] = useState(
    product?.capacity || '',
  );

  if (!product) {
    return (
      <div className={styles.container}>
        <BreadCrumbs />
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {product && (
          <BreadCrumbs category={product.category} product={product} />
        )}

        <h1 className={styles.name}>{product.name}</h1>

        <div className={styles.wrapper}>
          <div className={styles.productDetails}>
            <div className={styles.images}>
              <div className={styles.thumbnails}>
                {product.images.map((src, i) => (
                  <img key={i} src={`/${src}`} className={styles.thumbnail} />
                ))}
              </div>
              <img src={`/${product.images[0]}`} className={styles.mainImage} />
            </div>

            <div className={styles.info}>
              <div className={styles.colors}>
                <p className={styles.colorsTitle}>Available colors</p>
                {product?.colorsAvailable.map((color, i) => (
                  <input
                    key={i}
                    type="radio"
                    className={
                      selectedColor === color ? styles.activeColor : ''
                    }
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.capacity}>
              <p className={styles.capacityTitle}>Select capacity</p>
              <div className={styles.capacityOptions}>
                {product.capacityAvailable.map((cap, i) => (
                  <label key={i} className={styles.capacityItem}>
                    <input
                      type="radio"
                      className={
                        selectedCapacity === cap ? styles.activeCapacity : ''
                      }
                      onClick={() => setSelectedCapacity(cap)}
                    />
                    {cap}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.prices}>
              <span className={styles.priceDiscount}>
                ${product.priceDiscount}
              </span>
              <span className={styles.priceRegular}>
                ${product.priceRegular}
              </span>
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCart}>Add to cart</button>
              <button className={styles.wishlist}>♡</button>
            </div>

            <div className={styles.specs}>
              <p>Screen: {product.screen}</p>
              <p>Resolution: {product.resolution}</p>
              <p>Processor: {product.processor}</p>
              <p>RAM: {product.ram}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
