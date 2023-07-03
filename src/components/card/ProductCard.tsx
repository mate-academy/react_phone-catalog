import React, { useEffect, useState } from 'react';

import styles from './ProductCard.module.scss';

import {
  removeFromFavourites,
  addToFavourites,
  getFavourites,
} from '../../helpers/Favourites';

import { addToCart, getCart, removeFromCart } from '../../helpers/Cart';
import { useCartContext } from '../../context/cartContext/CartContext';

import { useFavsContext }
  from '../../context/favouritesContext/FavoritesContext';

import { Product } from '../../types/Product';

import { ReactComponent as AddToFavourites }
  from '../../icons/Favourites (Heart Like).svg';

import { ReactComponent as Like }
  from '../../icons/Favourites Filled (Heart Like).svg';

type Props = {
  product: Product;
  discount: boolean;
  updateFavourites?: () => void;
};

export const ProductCard: React.FC<Props> = ({
  product,
  discount,
  updateFavourites,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);

  const { setAddedToCart } = useCartContext();
  const { setAddedToFavs } = useFavsContext();

  const {
    id,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const updateIsAddedState = () => {
    const updatedCart = getCart();
    const updatedIsAdded = updatedCart.some(item => item.product.id === id);

    setIsAdded(updatedIsAdded);

    if (updatedIsAdded) {
      localStorage.setItem(`isAdded_${id}`, 'true');
    } else {
      localStorage.removeItem(`isAdded_${id}`);
    }
  };

  const updateIsAddedToFavs = () => {
    const updatedFavs = getFavourites();
    const updatedIsAddedToFavs = updatedFavs.some(item => item.id === id);

    setIsAddedToFav(updatedIsAddedToFavs);

    if (updatedIsAddedToFavs) {
      localStorage.setItem(`isAddedToFavs_${id}`, 'true');
    } else {
      localStorage.removeItem(`isAddedToFavs_${id}`);
    }
  };

  useEffect(() => {
    updateIsAddedState();
    updateIsAddedToFavs();
  }, [id]);

  useEffect(() => {
    const storedIsAdded = localStorage.getItem(`isAdded_${id}`);
    const isAddedToFavs = localStorage.getItem(`isAddedToFavs_${id}`);

    if (storedIsAdded) {
      setIsAdded(storedIsAdded === 'true');
    }

    if (isAddedToFavs) {
      setIsAddedToFav(isAddedToFavs === 'true');
    }
  }, []);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const productToAdd = {
      product,
      quantity: 1,
    };

    if (isAdded) {
      removeFromCart(productToAdd);
      setAddedToCart(prev => prev - 1);
    } else {
      addToCart(productToAdd);
      setAddedToCart(prev => prev + 1);
    }

    const updatedCart = getCart();
    const updatedIsAdded = updatedCart.some(item => item.product.id === id);

    setIsAdded(updatedIsAdded);
    updateIsAddedState();
  };

  const handleAddToFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (isAddedToFav) {
      removeFromFavourites(product);
      setAddedToFavs(prev => prev - 1);
    } else {
      addToFavourites(product);
      setAddedToFavs(prev => prev + 1);
    }

    const updatedFavs = getFavourites();
    const updatedIsAddedToFavs = updatedFavs.some(item => item.id === id);

    setIsAddedToFav(updatedIsAddedToFavs);
    updateIsAddedToFavs();

    if (updateFavourites) {
      updateFavourites();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.image__container}>
        <img
          className={styles.image}
          src={`_new/${image}`}
          alt="iphone"
        />
      </div>

      <div className={styles.card__content}>
        <div className={styles.title}>
          {name}
        </div>

        <div className={styles.price}>
          {discount
            ? (
              <>
                <span className={styles.price__new}>{`$${price}`}</span>
                <span className={styles.price__current}>{`$${fullPrice}`}</span>
              </>
            ) : (
              <span className={styles.price__new}>{`$${fullPrice}`}</span>
            )}
        </div>

        <div className={styles.content}>
          <div className={styles.content__item}>
            <span className={styles.content__title}>Screen</span>
            <span className={styles.content__value}>{screen}</span>
          </div>

          <div className={styles.content__item}>
            <span className={styles.content__title}>Capacity</span>
            <span className={styles.content__value}>{capacity}</span>
          </div>

          <div className={styles.content__item}>
            <span className={styles.content__title}>RAM</span>
            <span className={styles.content__value}>{ram}</span>
          </div>
        </div>
        <div className={styles.button}>
          {isAdded
            ? (
              <button
                className={styles.button__cart_active}
                onClick={handleAddToCart}
                type="button"
              >
                Added to cart
              </button>
            ) : (
              <button
                className={styles.button__cart}
                onClick={handleAddToCart}
                type="button"
              >
                Add to cart
              </button>
            )}

          <button
            className={styles.button__favourites}
            onClick={handleAddToFavourites}
            data-cy="addToFavorite"
            type="button"
          >
            {isAddedToFav
              ? <Like className="button-favourites-icon" />
              : (
                <AddToFavourites
                  className={styles.button__favourites_icon}
                />
              )}
          </button>
        </div>
      </div>
    </div>
  );
};
