import { Link, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import styles from './ProductDetailsPage.module.scss';
import { PhoneDetails } from './interfaces/PhoneDetailsInterface';
import { useEffect, useState } from 'react';
import { Loader } from '../Catalog/components/Loader/Loader';

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const [product, setProduct] = useState<PhoneDetails | null>(null);
  const [selectedColor, setSelectedColor] = useState(product?.color || '');
  const [selectedCapacity, setSelectedCapacity] = useState(
    product?.capacity || '',
  );
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!category || !productId) {
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setIsError('');

        const response = await fetch(`/api/${category}.json`);

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const products: PhoneDetails[] = await response.json();
        const found = products.find(item => item.id === productId);

        if (!found) {
          setIsError('Product not found');
          setProduct(null);

          return;
        }

        setProduct(found);
        setSelectedColor(found.color);
        setSelectedCapacity(found.capacity);
      } catch (error) {
        setIsError('Product not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [category, productId]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <BreadCrumbs />
        <Loader />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className={styles.container}>
        <BreadCrumbs />
        <h1>{isError || 'Product not found'}</h1>
        <div className={styles.product__detailsImg}>
          <img
            className={styles.product__img}
            src="/img/product-not-found.png"
            alt="Product not found"
          />
        </div>
        <Link to={`/${category}`} className={styles.buttonBack}>
          Back
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <BreadCrumbs category={product.category} product={product} />
        <Link to={`/${category}`} className={styles.buttonBack}>
          Back
        </Link>

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
