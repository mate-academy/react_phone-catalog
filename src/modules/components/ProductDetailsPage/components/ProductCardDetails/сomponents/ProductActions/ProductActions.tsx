/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';
import { useFavourites } from '@/modules/shared/utils/context/FavouritesContext';
import { useCart } from '@/modules/shared/utils/context/CartContext';

import { ProductDetailsType } from '@/modules/shared/utils/types';
import { PRODUCT_COLORS_MAP as COLORS } from '@/modules/shared/utils/constants';

import { Button } from '@/modules/shared/components/ui/Button';

import favouriteIcon from '@/assets/svg/heart.svg';
import favouriteIconActive from '@/assets/svg/heart-filled.svg';

import styles from './ProductActions.module.scss';
//#endregion IMPORTS

//#region STYLES
const {
  actionsContainer,

  colorsBlock,
  colorsTitle,
  colorsList,
  colorBtn,
  colorBtnActive,

  capacityBlock,
  capacityTitle,
  capacityList,
  capacityBtn,
  capacityBtnActive,

  priceBlock,
  priceCurrent,
  priceDiscount,

  buttonsBlock,
  buttonCart,
  buttonCartActive,
  buttonFavourite,

  shortSpecsBlock,
  specBlock,
  specTitle,
  specValue,
} = styles;
//#endregion STYLES

//#region HELPERS
const normalize = (str: string) => str.toLowerCase().replace(/[\s-]/g, '');
//#endregion HELPERS

interface Props {
  product: ProductDetailsType;
}

export const ProductActions: React.FC<Props> = ({ product }) => {
  //#region HOOKS_&_DATA_FETCHING
  const { products, productsDetails } = useProducts();
  const { toggleFavourite, isFavourite } = useFavourites();
  const { addToCart, isInCart } = useCart();
  const { t } = useTranslation();
  //#endregion DATA_FETCHING

  //#region PRODUCT_CONFIGS
  const currentProduct = product.namespaceId;
  const currentColor = product.color;
  const currentCapacity = product.capacity;

  const isActiveFavourite = isFavourite(product.id);
  const isActiveCart = isInCart(product.id);

  const capacityTitleKey = product.category === 'accessories' ? 'size' : 'capacity';

  const categoryProducts = productsDetails.filter(
    item => item.category === product.category
  );

  const baseProduct = products.find(
    item => item.itemId === product.id
  );
  //#endregion PRODUCT_CONFINGS

  //#region TECH_SPECS_DATA
  const shortSpecs = {
    screen : product.screen,
    resolution: product.resolution,
    processor: product.processor,
    ram: product.ram,
  };
  //#endregion TECH_SPECS_DATA

  //#region LINK_GENERATION
  const getTargetUrl = (type: 'color' | 'capacity', value: string) => {
    const target = {
      color: currentColor,
      capacity: currentCapacity,
    };

    if (type === 'color') {
      target.color = value;
    } else {
      target.capacity = value;
    }

    const foundProduct = categoryProducts.find(
      prod =>
        prod.namespaceId === currentProduct &&
        normalize(prod.color) === normalize(target.color) &&
        normalize(prod.capacity) === normalize(target.capacity),
    );

    return foundProduct
      ? `/${product.category}/${foundProduct.id}`
      : `/${product.category}/${product.id}`;
  };
  //#endregion LINK_GENERATION

  //#region RENDER
  return (
    <div className={actionsContainer}>
      <div className={colorsBlock}>
        <p className={colorsTitle}>
          {t('productDetailsPage.actions.title.color')}
        </p>
        <div className={colorsList}>
          {product.colorsAvailable.map((color: string) => {
            const colorKey = normalize(color);
            const hexColor = COLORS[colorKey as keyof typeof COLORS];

            return (
              <Link
                key={color}
                to={getTargetUrl('color', color)}
                className={`
                  ${colorBtn}
                  ${currentColor === color ? colorBtnActive : ''}
                `}
                style={{ backgroundColor: hexColor }}
              />
            );
          })}
        </div>
      </div>

      <div className={capacityBlock}>
        <p className={capacityTitle}>
          {t(`productDetailsPage.actions.title.${capacityTitleKey}`)}
        </p>
        <div className={capacityList}>
          {product.capacityAvailable.map((capacity: string) => (
            <Link
              key={capacity}
              to={getTargetUrl('capacity', capacity)}
              className={`
                ${capacityBtn}
                ${currentCapacity === capacity ? capacityBtnActive : ''}
              `}
            >
              {capacity}
            </Link>
          ))}
        </div>
      </div>

      <div className={priceBlock}>
        <span className={priceCurrent}>{`$${product.priceDiscount}`}</span>
        <span className={priceDiscount}>{`$${product.priceRegular}`}</span>
      </div>

      <div className={buttonsBlock}>
        <Button
          variant="primary"
          isSelected={isActiveCart}
          className={`
            ${buttonCart}
            ${isActiveCart ? buttonCartActive : ''}
          `}
          onClick={() => {
            if (!isActiveCart && baseProduct) {
              addToCart(baseProduct);
            }
          }}
          aria-label={!isActiveCart ? t('productDetailsPage.actions.cart.btnAria') : ''}
        >
          {t('productDetailsPage.actions.cart.btnText', {
            context: isActiveCart ? 'active' : '',
          })}
        </Button>

        <Button
          variant="icon"
          isSelected={isActiveFavourite}
          className={buttonFavourite}
          onClick={() => baseProduct && toggleFavourite(baseProduct)}
          aria-label={t('productDetailsPage.actions.favourite.btnAria', {
            context: isActiveFavourite ? 'active' : '',
          })}
        >
          <img src={isActiveFavourite ? favouriteIconActive : favouriteIcon} />
        </Button>
      </div>

      <div className={shortSpecsBlock}>
        {Object.entries(shortSpecs).map(([key, value]) => (
          <div key={key} className={specBlock}>
            <p className={specTitle}>
              {t(`productDetailsPage.actions.shortSpecs.${key}`)}
            </p>
            <p className={specValue}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
  //#endregion RENDER
};
