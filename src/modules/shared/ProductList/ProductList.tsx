import React from 'react';
import styles from './ProductList.module.scss';
import { Product } from '../../../types/Product';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../CartContext';
import { FavouritesContext } from '../../../FavouritesContext';

type Props = {
  visibleProducts: Product[];
  itemsAreAll: boolean;
};

export const ProductList: React.FC<Props> = ({
  visibleProducts,
  itemsAreAll,
}) => {
  const cartContext = React.useContext(CartContext);
  const isInCart = (productId: string) => {
    return cartContext?.items.some(item => item.id === productId);
  };

  const favouritesContext = React.useContext(FavouritesContext);
  const isInFavourites = (productId: string) => {
    return favouritesContext?.favItems.some(item => item.itemId === productId);
  };

  return (
    <div
      className={classNames(styles['product-list'], {
        [styles['product-list--with-last-gap']]: itemsAreAll,
      })}
    >
      {visibleProducts.map(product => (
        <div key={product.id} className={styles['product-card']}>
          <div className={styles['inner-wrapper']}>
            <Link to={`/product/${product.itemId}`}>
              <img
                className={styles['product-card__image']}
                src={product.image}
                alt="model-image"
              />
            </Link>
            <Link
              to={`/product/${product.itemId}`}
              className={styles.product__link}
            >
              <h4 className={styles['product-card__name']}>{product.name}</h4>
            </Link>
          </div>
          <div className={styles['product-card__prices']}>
            <h3
              className={styles['product-card__price']}
            >{`$${product.price}`}</h3>
            <h3
              className={styles['product-card__full-price']}
            >{`$${product.fullPrice}`}</h3>
          </div>
          <div className={styles['product-card__line']}></div>
          <div className={styles['product-card__details']}>
            <h4 className={styles['product-card__details__name']}>Screen</h4>
            <h4 className={styles['product-card__details__value']}>
              {product.screen}
            </h4>
          </div>
          <div className={styles['product-card__details']}>
            <h4 className={styles['product-card__details__name']}>Capacity</h4>
            <h4 className={styles['product-card__details__value']}>
              {product.capacity}
            </h4>
          </div>
          <div className={styles['product-card__details']}>
            <h4 className={styles['product-card__details__name']}>RAM</h4>
            <h4 className={styles['product-card__details__value']}>
              {product.ram}
            </h4>
          </div>
          <div className={styles['product-card__buttons']}>
            <button
              className={styles['product-card__buttons__cart']}
              onClick={() => cartContext?.addItem(product)}
              disabled={isInCart(product.itemId)}
            >
              {isInCart(product.itemId) ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              className={classNames(
                styles['product-card__buttons__favourites'],
                {
                  [styles['product-card__buttons__favourites--red']]:
                    isInFavourites(product.itemId),
                },
              )}
              onClick={() =>
                isInFavourites(product.itemId)
                  ? favouritesContext?.deleteItem(product.itemId)
                  : favouritesContext?.addItem(product)
              }
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};
