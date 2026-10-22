import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useCart } from '../../shared/context/CartContext';
import { useFavorites } from '../../shared/context/FavoritesContext';

import { CardInfo } from '../../modules/Card/CardInfo/CardInfo';

import { normalizeProduct } from '../../shared/context/normalizeProduct';
import styles from './Card.module.scss';

import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { getImageUrl } from '../../shared/helpers/getImageUrl';

type CardVariant = 'grid' | 'slider';

interface Props {
  product: Product | ProductDetails;
  variant?: CardVariant;

  showPrices?: boolean;
  showSpecs?: boolean;
  showActions?: boolean;
  showDiscount?: boolean;
}

export const Card: React.FC<Props> = ({
  product,
  variant = 'grid',
  showPrices = true,
  showSpecs = true,
  showActions = true,
  showDiscount = true,
}) => {
  const { items, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const normalizedProduct = normalizeProduct(product);

  const image = normalizedProduct.image;
  const name = normalizedProduct.name;
  const itemId = normalizedProduct.itemId;

  const isInCart = items.some(item => item.id === normalizedProduct.id);

  const isFavorite = favorites.some(
    favorite => favorite.id === normalizedProduct.id,
  );

  const handleAddToCart = () => {
    addToCart(normalizedProduct);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(normalizedProduct);
  };

  return (
    <Link
      to={`/item/${itemId}`}
      className={classNames(styles.card, styles[`card--${variant}`])}
    >
      <div className={styles.imageWrapper}>
        <img src={getImageUrl(image)} alt={name} className={styles.image} />
      </div>

      <span className={styles.name}>{name}</span>

      <CardInfo
        product={product}
        showPrices={showPrices}
        showSpecs={showSpecs}
        showActions={showActions}
        showDiscount={showDiscount}
        isInCart={isInCart}
        isFavorite={isFavorite}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
      />
    </Link>
  );
};
