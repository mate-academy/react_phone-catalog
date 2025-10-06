import React, { useContext } from "react";
import styles from './ProductItem.module.scss';
import favourites from '../../../shared/images/icones/header-favourites-icon-3x.png';
import favouritesActive from '../../../shared/images/icones/favorites-active.png';
import { Link, useLocation } from "react-router-dom";
import { Product } from "../../../../types/Product";
import { findFullProduct } from "../../../shared/components/utils/findFullProduct";
import { CartContext } from "../../../context/CartContext";
import { FavoritesContext } from "../../../context/FavoritesContext";

type Props = {
  product: Product;
  fullPrice?: boolean;
  widthItem: 'homePage' | 'catalog';
  find: boolean;
};

export const ProductItem: React.FC<Props> = ({
  product,
  fullPrice,
  widthItem,
  find,
}) => {
  const { pathname } = useLocation();
  const fullProduct = find ? findFullProduct(product.itemId) : product;
  const { toggleToCart, items: cartItems } = useContext(CartContext);
  const { toggleFavorites, items: favoritesItems } =
    useContext(FavoritesContext);

  const inCart = cartItems.some(item => item.product.id === fullProduct?.id);
  const inFavorites = favoritesItems.some(item => item.id === fullProduct?.id);

  return (
    <>
      {fullProduct && (
        <article
          className={`${styles.product} ${widthItem === 'homePage' ? styles.home : styles.catalog}`}
        >
          <Link
            to={`/product/${fullProduct.id}`}
            state={{ from: pathname }}
            className={`${styles['product__image-container']} ${widthItem === 'homePage' ? styles['product__image-container--home'] : styles['product__image-container--catalog']}`}>
            <img
              src={fullProduct.images[0]}
              alt={product.name}
              className={styles.product__image}
            />
          </Link>
          <Link
            to={`/product/${fullProduct.id}`}
            state={{ from: pathname }}
            style={{ paddingTop: '16px' }}
            className={`${styles.product__name} body-text`}
          >
            {product.name}
          </Link>
          <div className={styles.product__prices}>
            <h3 style={{ fontWeight: '800' }}>
              {`$${fullProduct.priceDiscount}`}
            </h3>
            {fullPrice && (
              <h3
                style={{
                  fontWeight: '600',
                  textDecoration: 'line-through',
                  color: '#89939A',
                }}
              >
                {`$${fullProduct.priceRegular}`}
              </h3>
            )}
          </div>
          <div className={styles.product__line}></div>
          <div className={styles.product__description}>
            <div className={styles.product__info}>
              <p className="small-text">Screen</p>
              <p className={`${styles['product__info-screen']} small-text`}>
                {fullProduct.screen}
              </p>
            </div>
            <div className={styles.product__info}>
              <p className="small-text">Capacity</p>
              <p className="small-text">{fullProduct.capacity}</p>
            </div>
            <div className={styles.product__info}>
              <p className="small-text">RAM</p>
              <p className="small-text">{fullProduct.ram}</p>
            </div>
          </div>
          <div className={styles.product__buttons}>
            <button
              onClick={() => toggleToCart(fullProduct)}
              className={`${styles.product__button} ${widthItem === 'homePage' ? styles['product__button--home'] : styles['product__button--catalog']} ${inCart ? styles['pulse-add'] : ''}`}
            >
              {`${inCart ? 'Added' : 'Add to cart'}`}
            </button>
            <button
              className={styles['product__button-fav']}
              onClick={() => toggleFavorites(fullProduct)}
            >
              <img
                src={inFavorites ? favouritesActive : favourites}
                alt="favourites"
                className={`${styles.product__icon} ${inFavorites ? styles['pulse-fav'] : ''}`}
              />
            </button>
          </div>
        </article>
      )}
    </>
  );
};
