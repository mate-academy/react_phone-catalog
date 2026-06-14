/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORST
import { Link } from 'react-router-dom';

import { useCart } from '../../utils/context/CartContext';
import { useFavourites } from '../../utils/context/FavouritesContext';

import { Button } from '../ui/Button';
import { ProductType } from '@/modules/shared/utils/types';

import favoutiteIcon from '@/assets/svg/heart.svg';
import favouriteIconActive from '@/assets/svg/heart-filled.svg';

import styles from './ProductCard.module.scss';
//#endregion

//#region STYLES
const {
  productCard,

  cardLink,
  cardImageBlock,
  cardImage,
  cardTitle,

  cardPriceBlock,
  priceCurrent,
  priceDiscount,

  cardDivider,
  cardSpecs,
  specItem,
  specTitle,
  specValue,

  cardActions,
  actionCart,
  actionFavourite,
} = styles;
//#endregion

interface Props {
  product: ProductType;
  showDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  //#region DATA_FETCHING
  const { addToCart, isInCart } = useCart();
  const isActiveCart = isInCart(product.itemId);

  const { toggleFavourite, isFavourite } = useFavourites();
  const isActiveFavourite = isFavourite(product.itemId);
  //#endregion

  //#region RENDER
  return (
    <div className={productCard}>
      <Link to={`/${product.category}/${product.itemId}`} className={cardLink}>
        <div className={cardImageBlock}>
          <img
            src={`/${product.image}`}
            alt={product.name}
            className={cardImage}
          />
        </div>

        <h3 className={cardTitle}>{product.name}</h3>
      </Link>

      <div className={cardPriceBlock}>
        <span className={priceCurrent}>{`$${product.price}`}</span>
        {showDiscount && (
          <span className={priceDiscount}>{`$${product.fullPrice}`}</span>
        )}
      </div>

      <div className={cardDivider} />

      <div className={cardSpecs}>
        <div className={specItem}>
          <span className={specTitle}>Screen</span>
          <span className={specValue}>{product.screen}</span>
        </div>
        <div className={specItem}>
          <span className={specTitle}>Capacity</span>
          <span className={specValue}>{product.capacity}</span>
        </div>
        <div className={specItem}>
          <span className={specTitle}>RAM</span>
          <span className={specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={cardActions}>
        <Button
          variant="primary"
          isSelected={isActiveCart}
          className={actionCart}
          onClick={() => {
            if (!isActiveCart) {
              addToCart(product);
            }
          }}
          aria-label={isActiveCart ? 'Remove from cart' : 'Add to cart'}
        >
          {isActiveCart ? 'Added to cart' : 'Add to cart'}
        </Button>

        <Button
          variant="icon"
          className={actionFavourite}
          onClick={() => toggleFavourite(product)}
          aria-label={
            isActiveFavourite ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          <img
            src={isActiveFavourite ? favouriteIconActive : favoutiteIcon}
            alt="Favorite icon"
          />
        </Button>
      </div>
    </div>
  );
  //#endregion
};
