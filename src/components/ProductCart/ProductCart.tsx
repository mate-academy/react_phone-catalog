import React from 'react';
import { Product } from '../../types/Product';
import { useCartDispatch, useCartState } from '../../contexts/CartContext';
import styles from './ProductCart.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  product: Product;
};

export const ProductCart: React.FC<Props> = ({ product }) => {
  const dispatch = useCartDispatch();
  const { favorites, cart } = useCartState();

  const isLiked = favorites.some(fav => fav.id === product.id);
  const isInCart = cart.some(item => item.product.id === product.id);

  const addToFav = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch({ type: 'TOGGLE_FAV', payload: product });
  };

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!isInCart) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  return (
    <article className={styles.productCard}>
      <NavLink relative="path" to={`/${product.category}/${product.itemId}`}>
        <img
          className={styles.productCard__img}
          src={product.image}
          alt={product.category}
        />
        <h2 className={styles.productCard__title}>{product.name}</h2>

        <div className={styles.productCard__priceBlock}>
          <span className={styles.productCard__priceOld}>${product.price}</span>
          <span className={styles.productCard__priceSale}>
            ${product.fullPrice}
          </span>
        </div>

        <ul className={styles.productCard__info}>
          <li className={styles.productCard__infoItem}>
            <p className={styles.productCard__property}>
              Screen <span>{product.screen}</span>
            </p>
          </li>
          <li className={styles.productCard__infoItem}>
            <p className={styles.productCard__property}>
              Capacity <span>{product.capacity}</span>
            </p>
          </li>
          <li className={styles.productCard__infoItem}>
            <p className={styles.productCard__property}>
              RAM <span>{product.ram}</span>
            </p>
          </li>
        </ul>

        <div className={styles.productCard__btns}>
          <button
            onClick={handleAddToCart}
            className={classNames(styles.productCard__add, {
              [styles.productCard__addActive]: isInCart,
            })}
            disabled={isInCart}
          >
            {isInCart ? 'Added' : 'Add to cart'}
          </button>

          <button
            onClick={addToFav}
            className={classNames(
              styles.productCard__like,

              { [styles.productCard__likeActive]: isLiked },
            )}
          ></button>
        </div>
      </NavLink>
    </article>
  );
};
