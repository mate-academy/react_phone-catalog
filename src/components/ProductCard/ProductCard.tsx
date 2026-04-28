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
    item => item.itemId === productId || item.id === productId,
  );

  const cartItems = useAppSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.id === productId);

  const price =
    'priceDiscount' in product ? product.priceDiscount : product.price;

  const fullPrice =
    'priceRegular' in product
      ? product.priceRegular
      : (product as CatalogProduct).fullPrice;

  const image =
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
          image: image,
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
        <img src={image} alt={product.name} className={s.productImage} />
      </Link>

      <Link
        to={`/${product.category}/${productId}`}
        className={s.productNameLink}
      >
        <div className={s.productName}>{product.name}</div>
      </Link>

      <h3 className={s.productPrice}>
        <span className={s.discount}>${price}</span>
        {showDiscount && <span className={s.fullPrice}>${fullPrice}</span>}
      </h3>

      <hr className={s.divider} />

      <div className={s.productDescription}>
        <div className={s.descriptionLeft}>
          <div className={s.characteristicName}>Screen</div>
          <div className={s.characteristicName}>Capacity</div>
          <div className={s.characteristicName}>RAM</div>
        </div>
        <div className={s.descriptionRight}>
          <div className={s.characteristicValue}>{product.screen}</div>
          <div className={s.characteristicValue}>{product.capacity}</div>
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
