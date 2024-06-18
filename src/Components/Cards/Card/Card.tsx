import React, { useContext } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { Products } from '../../../type/Products';
import { Context } from '../../../Store/Store';
import { NavLink } from 'react-router-dom';

interface Props {
  product: Products;
  discount?: boolean;
}

export const Card: React.FC<Props> = ({ product, discount }) => {
  const { products, favorite, setFavorite, carts, setCarts } =
    useContext(Context);

  const HanderAddFavorite = () => {
    const isFavorite = favorite.some(fav => fav.id === product.id);

    if (isFavorite) {
      const updatedFavorites = favorite.filter(fav => fav.id !== product.id);

      setFavorite(updatedFavorites);
    } else {
      const productToAdd = products.find(prod => prod.id === product.id);

      if (productToAdd) {
        setFavorite(prevFavorites => [...prevFavorites, productToAdd]);
      }
    }
  };

  const HanderAddCart = () => {
    const inCartIndex = carts.findIndex(cart => cart.id === product.id);

    if (inCartIndex !== -1) {
      const updatedCarts = [...carts];

      updatedCarts.splice(inCartIndex, 1);
      setCarts(updatedCarts);
      localStorage.setItem('carts', JSON.stringify(updatedCarts));
    } else {
      const productToAdd = products.find(prod => prod.id === product.id);

      if (productToAdd) {
        setCarts(prevCarts => [...prevCarts, { count: 1, ...productToAdd }]);
      }
    }
  };

  const inFavorite = () => {
    return favorite.some(fav => {
      return fav.id === product.id;
    });
  };

  const inCart = () => {
    return carts.some(cart => {
      return cart.id === product.id;
    });
  };

  return (
    <div className={styles.container}>
      <NavLink to={`/info/products/${product.itemId}`} className={styles.image}>
        <img
          className={styles.normaliz}
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${product.image}`}
          alt="#"
        />
      </NavLink>
      <div className="full">
        <h2 className="product-name">{product.name}</h2>

        {discount ? (
          <div className={styles.productPrice}>
            <h2 className={styles.priceFull}>{`$${product.price}`}</h2>
            <h2 className={styles.priceDiscount}>{`$${product.fullPrice}`}</h2>
          </div>
        ) : (
          <div className={styles.productPrice}>
            <h2 className={styles.priceFull}>{`$${product.fullPrice}`}</h2>
          </div>
        )}
        <div className={styles.infoContainer}>
          <div className={styles.infoScreen}>
            <p className={styles.infoName}>Screen</p>
            <p className={styles.infoOption}>{product.screen}</p>
          </div>
          <div className={styles.infoCapacity}>
            <p className={styles.infoName}>Capacity</p>
            <p className={styles.infoOption}>{product.capacity}</p>
          </div>
          <div className={styles.infoRam}>
            <p className={styles.infoName}>RAM</p>
            <p className={styles.infoOption}>{product.ram}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            className={classNames([styles.button], {
              [styles.isUnadd]: !inCart(),
              [styles.isAdd]: inCart(),
            })}
            onClick={HanderAddCart}
          >
            {!inCart() ? 'Add to card' : 'Added'}
          </button>
          <button
            className={classNames(
              [styles.button],
              [styles.isFavorite],
              'fa-heart',
              {
                'fa-regular': !inFavorite(),
                'fa-solid': inFavorite(),
                [styles.red]: inFavorite(),
              },
            )}
            onClick={HanderAddFavorite}
          ></button>
        </div>
      </div>
    </div>
  );
};
