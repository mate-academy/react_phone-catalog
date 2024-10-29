import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { CartContext, FavouriteContext } from '../../ContextProvider';

interface Props {
  product: Product;
  isDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product: {
    images,
    name,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
    id,
  },
  isDiscount,
}) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { favouriteProducts, setFavouriteProducts } =
    useContext(FavouriteContext);

  const isAddedToCart = !!cartProducts.find(product => product?.id === id);

  const isAddedToFavourite = !!favouriteProducts.find(
    product => product?.id === id,
  );

  const screenSpec = screen.slice(0, screen.indexOf("'") + 1) + ' OLED';
  const theProduct = {
    images,
    name,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
    id,
  };

  const handleAddToCart = () => {
    // setCartProducts([
    //   ...cartProducts,
    //   {
    //     id,
    //     images,
    //     name,
    //     priceRegular,
    //     priceDiscount,
    //     screen,
    //     capacity,
    //     ram,
    //   },
    // ]);

    setCartProducts(
      isAddedToCart
        ? cartProducts.filter(product => product.id !== id)
        : [...cartProducts, theProduct],
    );
  };

  const handleAddToFavourite = () => {
    setFavouriteProducts(
      isAddedToFavourite
        ? favouriteProducts.filter(product => product.id !== id)
        : [...favouriteProducts, theProduct],
    );
  };

  return (
    <NavLink to=".." className={styles.productCardContainer}>
      <div className={styles.productImgContainer}>
        <img src={images[0]} alt={name} className={styles.productImg} />
      </div>
      <p className={styles.title}>{name}</p>
      <div className={styles.priceContainer}>
        <p className={styles.price}>{'$' + priceRegular}</p>
        {isDiscount && (
          <p className={classNames(styles.price, styles.priceDiscount)}>
            {'$' + priceDiscount}
          </p>
        )}
      </div>

      <span className={styles.line}></span>

      <ul className={styles.productInfo}>
        <li className={styles.productInfoItem}>
          <span>Screen</span>
          <span>{screenSpec}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>Capacity</span>
          <span>{capacity}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>RAM</span>
          <span>{ram}</span>
        </li>
      </ul>

      <div className={styles.btnContainer}>
        <button
          className={classNames(styles.btnCart, {
            [styles.btnCartPressed]: isAddedToCart,
          })}
          onClick={handleAddToCart}
          // disabled={isAddedToCart}
        >
          {isAddedToCart ? 'In Cart' : 'Add to Cart'}
        </button>
        <button
          className={classNames('buttonFavourite', styles.btnFavourite, {
            [styles.btnFavouritePressed]: isAddedToFavourite,
          })}
          onClick={handleAddToFavourite}
          aria-label="Add to favourite"
        ></button>
      </div>
    </NavLink>
  );
};
