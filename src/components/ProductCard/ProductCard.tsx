import React from 'react';
import { Link } from 'react-router-dom';
import {
  CatalogProduct,
  Phone,
  Tablet,
  Accessory,
} from '../../../public/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorites/favoritesSlice';
import { addToCart } from '../../features/cart/cartSlice';

import s from './ProductCard.module.scss';

type ProductType = Phone | Tablet | Accessory;

interface ProductCardProps {
  product: CatalogProduct | ProductType;
  showDiscount?: boolean;
  onRemove?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showDiscount = false,
  onRemove,
}) => {
  const dispatch = useAppDispatch();

  const productId = (product as CatalogProduct).itemId || product.id;

  const favorites = useAppSelector(state => state.favorites.items);
  const isLiked = favorites.some(
    item =>
      item.itemId === productId ||
      item.id === productId ||
      (item as any).itemId === productId,
  );

  const cartItems = useAppSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.id === productId);

  const price =
    'priceDiscount' in product
      ? product.priceDiscount
      : (product as CatalogProduct).price;

  const fullPrice =
    'priceRegular' in product
      ? product.priceRegular
      : (product as CatalogProduct).fullPrice;

  const imagePath =
    'images' in product ? product.images[0] : (product as CatalogProduct).image;

  const handleLikeClick = () => {
    if (isLiked) {
      if (onRemove) {
        onRemove();
      } else {
        dispatch(removeFromFavorites(productId));
      }
    } else {
      dispatch(addToFavorites(product as CatalogProduct));
    }
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(
        addToCart({
          id: productId,
          name: product.name,
          price: price,
          image: imagePath,
        }),
      );
    }
  };

  return (
    <div className={s.productCard}>
      <Link
        to={`/${product.category}/${productId}`}
        className={s.productImageLink}
      >
        <img
          src={`./${imagePath}`}
          alt={product.name}
          className={s.productImage}
        />
      </Link>

      <Link
        to={`/${product.category}/${productId}`}
        className={s.productNameLink}
      >
        <div className={s.productName}>{product.name}</div>
      </Link>

      <div className={s.productPrice}>
        <span className={s.discount}>${price}</span>
        {showDiscount && price !== fullPrice && (
          <span className={s.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <hr className={s.divider} />

      <div className={s.productDescription}>
        <div className={s.characteristicRow}>
          <div className={s.characteristicName}>Screen</div>
          <div className={s.characteristicValue}>{product.screen}</div>
        </div>

        <div className={s.characteristicRow}>
          <div className={s.characteristicName}>Capacity</div>
          <div className={s.characteristicValue}>{product.capacity}</div>
        </div>

        <div className={s.characteristicRow}>
          <div className={s.characteristicName}>RAM</div>
          <div className={s.characteristicValue}>{product.ram}</div>
        </div>
      </div>

      <div className={s.productActions}>
        <button
          className={`${s.addToCartButton} ${isInCart ? s.addedToCart : ''}`}
          onClick={handleAddToCart}
          type="button"
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`${s.likeButton} ${isLiked ? s.isLiked : ''}`}
          onClick={handleLikeClick}
          type="button"
          aria-label="Add to favorites"
        >
          <img
            src={isLiked ? './img/HeartFilled.svg' : './img/Like.svg'}
            alt="Like"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
