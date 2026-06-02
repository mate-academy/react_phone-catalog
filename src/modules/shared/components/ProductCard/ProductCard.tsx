/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

import { Link } from 'react-router-dom';

import { useFavourites } from '../../utils/context/FavouritesContext';

import { ProductType } from '@/modules/shared/utils/types';

import favoutiteIcon from '@/assets/svg/heart.svg';
import favouriteIconActive from '@/assets/svg/heart-filled.svg';

import styles from './ProductCard.module.scss';
import { useCart } from '../../utils/context/CartContext';

const {
  card,
  cardLink,
  imageContainer,
  imageText,
  nameTitle,
  priceBlock,
  priceCurrent,
  priceDiscount,
  divider,
  specsBlock,
  specRow,
  specTitle,
  specValue,
  buttonsBlock,
  btnCart,
  btnCartActive,
  btnFavourite,
} = styles;

interface Props {
  product: ProductType;
  showDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const { toggleCart, isInCart } = useCart();
  const isActiveCart = isInCart(product.itemId);

  const { toggleFavourite, isFavourite } = useFavourites();
  const isActiveFavourite = isFavourite(product.itemId);

  return (
    <div className={card}>
      <Link to={`/${product.category}/${product.itemId}`} className={cardLink}>
        <div className={imageContainer}>
          <img
            src={`/${product.image}`}
            alt={product.name}
            className={imageText}
          />
        </div>

        <h3 className={nameTitle}>{product.name}</h3>
      </Link>

      <div className={priceBlock}>
        <span className={priceCurrent}>{`$${product.price}`}</span>
        {showDiscount && (
          <span className={priceDiscount}>{`$${product.fullPrice}`}</span>
        )}
      </div>

      <div className={divider} />

      <div className={specsBlock}>
        <div className={specRow}>
          <span className={specTitle}>Screen</span>
          <span className={specValue}>{product.screen}</span>
        </div>
        <div className={specRow}>
          <span className={specTitle}>Capacity</span>
          <span className={specValue}>{product.capacity}</span>
        </div>
        <div className={specRow}>
          <span className={specTitle}>RAM</span>
          <span className={specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={buttonsBlock}>
        <button
          className={`
            ${btnCart}
            ${isActiveCart ? btnCartActive : ''}
          `}
          type="button"
          onClick={() => toggleCart(product)}
          aria-label="Add to cart"
        >
          {isActiveCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={btnFavourite}
          type="button"
          onClick={() => toggleFavourite(product)}
          aria-label="Add to favorites"
        >
          <img
            src={isActiveFavourite ? favouriteIconActive : favoutiteIcon}
            alt="Add to favorites"
          />
        </button>
      </div>
    </div>
  );
};
