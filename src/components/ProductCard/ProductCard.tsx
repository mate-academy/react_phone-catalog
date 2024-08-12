import './ProductCard.module.scss';
import React, { useState, useEffect } from 'react';
import { ActionButtons } from '../ActionButtons';
import { ProductPhone, ProductTablet } from '../../types/Product';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

type ProductCardProps = {
  productId: string, // Identyfikator produktu do pobrania danych
  typeOfProduct: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({ productId, typeOfProduct }) => {
  const [product, setProduct] = useState<ProductPhone | ProductTablet| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`../../api/${typeOfProduct}.json`); // Poprawna ścieżka do pliku w folderze public
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ProductPhone[] = await response.json();
        const foundProduct = data.find(p => p.id === productId);
        console.log('Found product:', foundProduct); // Sprawdź, czy produkt jest znaleziony
        setProduct(foundProduct || null);
      } catch (error) {
        setError('Failed to load product');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, typeOfProduct]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product available</div>;
  }

  const { images, name, priceRegular, priceDiscount, screen, capacity, ram } = product;

  return (
    <div className={styles.ProductCard}>
      <Link
        to="/placeholder-link" // Zmień na odpowiedni link
        className={styles.imageContainer}
      >
        <img
          className={styles.image}
          src={images[0]}
          alt={name}
        />
      </Link>

      <div className={styles.wrapper}>
        <Link to="/placeholder-link" className={styles.title}>
          {name}
        </Link>

        <div className={styles.price}>
          <div className={styles.existPrice}>${priceRegular}</div>
          <div className={styles.hotPrice}>${priceDiscount}</div>
        </div>

        <div className={styles.divider}></div>
        <div className={styles.description}>
          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Screen</p>
            <p className={styles.descriptionText}>{screen}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Capacity</p>
            <p className={styles.descriptionText}>{capacity}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>RAM</p>
            <p className={styles.descriptionText}>{ram}</p>
          </div>
        </div>
        <ActionButtons />
      </div>
    </div>
  );
};
