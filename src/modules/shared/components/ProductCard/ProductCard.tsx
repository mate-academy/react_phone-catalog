/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORT
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCart } from '../../utils/context/CartContext';
import { useFavourites } from '../../utils/context/FavouritesContext';

import { Button } from '../ui/Button';
import { CategoryType, ProductType } from '@/modules/shared/utils/types';

import FavouriteIcon from '@/assets/svg/heart.svg?react';
import FavouriteIconActive from '@/assets/svg/heart-filled.svg?react';

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

  favouriteIcon,
  favouriteIconActive,
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
  //#region HOOKS_&_STATE
  const { t } = useTranslation();

  const { addToCart, isInCart } = useCart();
  const isActiveCart = isInCart(product.itemId);

  const { toggleFavourite, isFavourite } = useFavourites();
  const isActiveFavourite = isFavourite(product.itemId);

  const capacityLabelKey =
    (product.category as CategoryType) === 'accessories' ? 'size' : 'capacity';
  //#endregion

  //#region RENDER
  return (
    <div className={productCard}>
      <Link to={`/${product.category}/${product.itemId}`} className={cardLink}>
        <div className={cardImageBlock}>
          <img
            src={`${import.meta.env.BASE_URL}/${product.image}`}
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
          <span className={specTitle}>
            {t('productDetailsPage.techSpecs.label.screen')}
          </span>
          <span className={specValue}>{product.screen}</span>
        </div>

        <div className={specItem}>
          <span className={specTitle}>
            {t(`productDetailsPage.techSpecs.label.${capacityLabelKey}`)}
          </span>
          <span className={specValue}>{product.capacity}</span>
        </div>

        <div className={specItem}>
          <span className={specTitle}>
            {t('productDetailsPage.techSpecs.label.ram')}
          </span>
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
          aria-label={
            !isActiveCart ? t('productDetailsPage.actions.cart.btnAria') : ''
          }
        >
          {t('productDetailsPage.actions.cart.btnText', {
            context: isActiveCart ? 'active' : '',
          })}
        </Button>

        <Button
          variant="icon"
          className={actionFavourite}
          onClick={() => toggleFavourite(product)}
          aria-label={t('productDetailsPage.actions.favourite.btnAria', {
            context: isActiveFavourite ? 'active' : '',
          })}
        >
          {isActiveFavourite ? (
            <FavouriteIconActive className={favouriteIconActive} />
          ) : (
            <FavouriteIcon className={favouriteIcon} />
          )}
        </Button>
      </div>
    </div>
  );
  //#endregion
};
