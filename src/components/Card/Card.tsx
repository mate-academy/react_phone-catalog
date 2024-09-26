import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/icons/card_icons/heart_icon.svg';
import FilledHeart from '../../assets/icons/card_icons/filled_heart_icon.svg';
import styles from './Card.module.scss';
import { Product } from '../../api/type/ProductCart';
import { FavoritesContext } from '../../context/FavoritesContext';
import { useCart } from '../../hooks/useCart';
import { Link, useLocation } from 'react-router-dom';
//import { RoutesPathes } from '../../utils/RoutesPathes';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { RoutesPathes } from '../../utils/RoutesPathes';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const { favoriteProducts, addToFavorites, setFavoriteProducts } = useContext(FavoritesContext);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const location = useLocation();

  const root = location.pathname.split('/')[1];

  //const linkToItem = root !== 'favourites'  ? `/${root}/${product.itemId}` : `/${product.category}/${product.itemId}`;

  const createLinkToItem = () => {
    if (!root) {
      return `${RoutesPathes.PHONES}/${product.itemId}`;
    }
  
    return root === 'favourites' 
      ? `/${product.category}/${product.itemId}` 
      : `/${root}/${product.itemId}`;
  };

  const { t } = useTranslation();

  useEffect(() => {
    setIsHeartActive(favoriteProducts.some((p) => p.name === product.name));
    setIsAdded(cartItems.some((item) => item.product.name === product.name));
  }, [favoriteProducts, cartItems, product.name]);

  const handleFavoriteClick = () => {
    if (isHeartActive) {
      setFavoriteProducts((prevFavorites) => prevFavorites.filter((p) => p.name !== product.name));
    } else {
      addToFavorites(product);
    }
    setIsHeartActive(!isHeartActive);
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.product.name === product.name);

    if (existingItem) {
      removeFromCart(existingItem.product.id.toString());
      setIsAdded(false);
    } else {
      addToCart(product);
      setIsAdded(true);
    }
  };

  return (
    <article className={styles.card}>
      <Link to={createLinkToItem()}>
        <img src={product.image} alt="iphone" className={styles.image} />
      </Link>

      <Link to={createLinkToItem()} className={styles.link}>
        <h3 className={styles.text}>{product.name}</h3>
      </Link>

      <div className={styles.price}>
        <h3 className={styles.priceRegular}>${product.price}</h3>
        <h3 className={styles.priceDiscount}>${product.fullPrice}</h3>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.specs}>
        <div className={styles.screen}>
          <p className={styles.left}>{t('screen')}</p>
          <p className={styles.right}>{product.screen}</p>
        </div>

        <div className={styles.memory}>
          <p className={styles.left}>{t('capacity')}</p>
          <p className={styles.right}>{product.capacity}</p>
        </div>

        <div className={styles.ram}>
          <p className={styles.left}>{t('ram')}</p>
          <p className={styles.right}>{product.ram}</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={classNames(styles.add, { [styles.added]: isAdded })}
          onClick={handleAddToCart}
        >
          {isAdded ? t('added') : t('addToCart')}
        </button>
        <button className={styles.heart} onClick={handleFavoriteClick}>
          {isHeartActive ? (
            <img src={FilledHeart} alt="Added to favorites" />
          ) : (
            <img src={Heart} alt="Add to favorites" />
          )}
        </button>
      </div>
    </article>
  );
};
