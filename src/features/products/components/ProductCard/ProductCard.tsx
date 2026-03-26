import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '@/store/productStore';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/product';
import { Button } from '@/components/ui/Button/Button';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  key?: number | string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const { cart, addToCart, removeFromCart, toggleFavorite, favorites } =
    useProductStore();

  const isFavorite = favorites.includes(product.id);
  const isInCart = cart.some(item => item.id === product.id);

  const handleCartAction = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/products/${product.id}`} className={styles.productLink}>
        <div className={styles.imageWrapper}>
          <img
            src={`/${product.image}`}
            alt={product.name}
            className={styles.image}
          />
        </div>
      </Link>
      <Link to={`/products/${product.id}`}>
        <h3 className={styles.title}>{product.name}</h3>
      </Link>
      <div className={styles.priceWrapper}>
        {product.priceDiscount && product.priceRegular ? (
          <>
            <span className={styles.price}>${product.priceDiscount}</span>
            <span className={styles.priceOld}>${product.priceRegular}</span>
          </>
        ) : (
          <span className={styles.price}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specItem}>
          <span>{t('products.specs.screen')}</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.specItem}>
          <span>{t('products.specs.capacity')}</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.specItem}>
          <span>{t('products.specs.ram')}</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant={isInCart ? 'selected' : 'primary'}
          onClick={handleCartAction}
        >
          {isInCart
            ? t('products.actions.added')
            : t('products.actions.addToCart')}
        </Button>

        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => toggleFavorite(product.id)}
        />
      </div>
    </div>
  );
};
