/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Product } from './types/Product';
import style from './ProductItem.module.scss';
import { useFavourites } from './context/FavouritesContext';
import { Gadget } from './types/Gadget';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { useTheme } from './context/ThemeContext';
import { useTranslation } from 'react-i18next';
type Props = {
  product: Product | Gadget;
  discount?: boolean;
  styles?: React.CSSProperties;
};
export const ProductItem: React.FC<Props> = ({ product, discount, styles }) => {
  const { favourites, toggleFavourite } = useFavourites();
  const { t } = useTranslation();
  const { addProduct, isInCart } = useCart();
  const handleAddProduct = (productId: string) => {
    addProduct(productId);
  };

  const { theme } = useTheme();

  return (
    <div className={style.product} style={styles}>
      <div className={style.product__top}>
        <Link
          to={`/product/${'itemId' in product ? product.itemId : product.id}`}
        >
          <img
            className={style.product__image}
            src={`./${'image' in product ? product.image : product.images?.[0]}`}
            alt={product.name}
          />
        </Link>
        <h3>
          <Link
            to={`/product/${'itemId' in product ? product.itemId : product.id}`}
            className={style.product__name}
          >
            {product.name}
          </Link>
        </h3>
      </div>
      <div className={style.product__bottom}>
        <div className={style.product__buy}>
          {discount ? (
            <p className={style.product__price}>
              ${'price' in product ? product.price : product.priceDiscount}
              <span className={style.product__discount}>
                $
                {'fullPrice' in product
                  ? product.fullPrice
                  : product.priceRegular}
              </span>
            </p>
          ) : (
            <p className={style.product__price}>
              $
              {'fullPrice' in product
                ? product.fullPrice
                : product.priceRegular}
            </p>
          )}
        </div>
        <div className={style.product__description}>
          <div className={style.product__key}>
            <p>{t('screen')}</p>
            <p>{t('capacity')}</p>
            <p>{t('RAM')}</p>
          </div>
          <div className={style.product__value}>
            <p>{product.screen}</p>
            <p>{product.capacity}</p>
            <p>{product.ram}</p>
          </div>
        </div>
        <div className={style.product__like}>
          <button
            className={
              isInCart('itemId' in product ? product.itemId : product.id)
                ? style.product__added
                : style.product__add
            }
            disabled={isInCart(
              'itemId' in product ? product.itemId : product.id,
            )}
            onClick={() =>
              handleAddProduct(
                'itemId' in product ? product.itemId : product.id,
              )
            }
          >
            {isInCart('itemId' in product ? product.itemId : product.id)
              ? t('added')
              : t('add')}
          </button>
          <div
            className={style.product__heart}
            onClick={() => toggleFavourite(product.id)}
          >
            <img
              src={
                favourites.includes(product.id)
                  ? './icons/heart-red.png'
                  : theme === 'light'
                    ? './icons/heart.png'
                    : './icons/heart-dark-theme.png'
              }
              alt="Like"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
