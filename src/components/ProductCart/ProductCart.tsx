import React from 'react';
import styles from './ProductCart.module.scss';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

interface ProductCartProps {
  item: Product;
  hideFullPrice?: boolean;
}

export const ProductCart: React.FC<ProductCartProps> = ({
  item,
  hideFullPrice,
}) => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();
  const isFavorite = favoritesState.items.some(
    favoriteItem => favoriteItem.product.id === item.id,
  );

  const handleAddToCart = (product: Product) => {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        product,
        quantity: 1,
      },
    });
  };

  const isInCart = cartState.items.some(cartItem => cartItem.id === item.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      favoritesDispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
    } else {
      favoritesDispatch({ type: 'ADD_ITEM', payload: { product: item } });
    }
  };

  const generateLink = () => {
    return `/${item.category}/${item.itemId}`;
  };

  return (
    <div className={styles.cart} key={item.id}>
      <NavLink className={styles.cart__img} to={generateLink()}>
        <img src={item.image} alt={item.name} />
      </NavLink>
      <NavLink className={styles.cart__name} to={generateLink()}>
        {item.name}
      </NavLink>
      <div className={styles.box}>
        <h3 className={styles.box__price}>${item.price}</h3>
        {!hideFullPrice && (
          <h3 className={styles.box__fullPrice}>{item.fullPrice}</h3>
        )}
      </div>
      <hr />
      <div className={styles.cart__parameters}>
        <div className={styles['cart__parameters--field']}>
          <p>Screen</p>
          <p>{item.screen}</p>
        </div>
        <div className={styles['cart__parameters--field']}>
          <p>Capacity</p>
          <p>{item.capacity}</p>
        </div>
        <div className={styles['cart__parameters--field']}>
          <p>RAM</p>
          <p>{item.ram}</p>
        </div>
      </div>
      <div className={styles.cart__buttons}>
        <button
          className={
            !isInCart
              ? `${styles.add} ${styles.button}`
              : `${styles.added} ${styles.button}`
          }
          onClick={!isInCart ? () => handleAddToCart(item) : undefined}
        >
          {!isInCart ? 'Add to cart' : 'Added'}
        </button>

        <button
          className={`${styles.favorite} ${isFavorite ? styles.active : ''}`}
          onClick={() => toggleFavorite()}
        >
          <img
            src={isFavorite ? './icons/heartAdd.png' : './icons/heart.png'}
            alt="favorite icon"
          />
        </button>
      </div>
    </div>
  );
};
