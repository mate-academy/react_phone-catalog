import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';
import { Product } from '../shared/types';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoriteContext';
import { Button } from '../../components/UI/Button/Button';

export const ProductDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFavorite = product
    ? favorites.some(fav => fav.id === product.id)
    : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/products/${productId}');

        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data: Product = await response.json();
        const normalizedProduct = {
          ...data,
          priceDicount: data.priceDiscount ?? data.fullPrice,
          priceRegular: data.priceRegular ?? data.fullPrice,
        };

        setProduct(normalizedProduct);
        setLoading(false);
      } catch {
        setError(t('error'));
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, t]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || !product) {
    return <div className={styles.error}>{error || t('productNotFound')}</div>;
  }

  return (
    <div className={styles.details}>
      <h1>{product.name}</h1>
      <div className={styles.content}>
        <div className={styles.images}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} image ${index + 1}`}
            />
          ))}
        </div>
        <div className={styles.info}>
          <p>Price: ${product.priceDiscount}</p>
          {(product.priceDiscount ?? 0) <
            (product.priceRegular ?? Infinity) && (
            <p className={styles.originalPrice}>${product.priceRegular}</p>
          )}
          <select value={product.capacity} disabled>
            {product.capacityAvailable?.map(cap => (
              <option value={cap} key={cap}>
                {cap}
              </option>
            ))}
          </select>
          <select value={product.color} disabled>
            {product.colorsAvailable?.map(color => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
          <div className={styles.description}>
            {product.description?.map((desc, index) => (
              <div key={index}>
                <h3>{desc.title}</h3>
                {desc.text.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.specs}>
            <p>Screen: {product.screen}</p>
            <p>Resolution: {product.resolution}</p>
            <p>Processor: {product.processor}</p>
            <p>RAM: {product.ram}</p>
            <p>Camera: {product.camera}</p>
            <p>Zoom: {product.zoom}</p>
            <p>Connectivity: {product.cell?.join(', ') || 'N/A'}</p>
            {product.year && <p>Year: {product.year}</p>}
          </div>
          <div className={styles.actions}>
            <Button
              variant="primary"
              size="md"
              onClick={() => addToCart(product)}
            >
              {t('addToCart')}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => toggleFavorite(product)}
              className={isFavorite ? styles.favoriteActive : ''}
            >
              ❤️
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
