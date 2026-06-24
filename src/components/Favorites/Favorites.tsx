import React from "react";
import { Buttons } from "../Buttons/Buttons";
import { NavLink } from "react-router-dom";
import styles from './Favorites.module.scss';
import { useFavorites } from "../../context/FavoritesContext";
import products from '../../../public/api/products.json';
import HomeIcon from '../../icons/home_icon.png';
import RightArrow from '../../icons/arrows/Disabled_right.png';

export const Favorites: React.FC = () => {
  const { favItems } = useFavorites();
  const totalItems = favItems.length;

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__top_bar}>
        <div className={styles.favorites__top_bar__path}>
          <img src={HomeIcon} alt="Home page" className={styles.favorites__top_bar__path__icon} />
          <img src={RightArrow} alt="Next" className={styles.favorites__top_bar__path__arrow} />
          <p className={styles.favorites__top_bar__path__text}>Favorites</p>
        </div>

        <h2 className={styles.favorites__title}>Favorites</h2>
        <p className={styles.favorites__total}>{totalItems} items</p>
      </div>

      <div className={styles.favorites__grid}>
        {favItems.map(item => {
          const product = products.find(i => i.itemId === item.id);
          if (!product) return null;

          return (
            <div key={item.id} className={styles.favorites__item}>
              <div className={styles.favorites__item__container}>
                <NavLink
                  to={`/${product.category.toLowerCase()}/${item.id}`}
                  className={styles.favorites__item__link}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.favorites__item__img}
                  />
                  <p className={styles.favorites__item__name}>{product.name}</p>

                  <div className={styles.favorites__item__price__container}>
                    <h4 className={styles.favorites__item__price__container__main_price}>${product.price}</h4>
                    <p className={styles.favorites__item__price__container__full_price}>${product.fullPrice}</p>
                  </div>

                  <div className={styles.favorites__item__description}>
                    <p className={styles.favorites__item__description__key}>Screen:</p>
                    <p className={styles.favorites__item__description__value}>{product.screen}</p>
                  </div>
                  <div className={styles.favorites__item__description}>
                    <p className={styles.favorites__item__description__key}>Capacity:</p>
                    <p className={styles.favorites__item__description__value}>{product.capacity}</p>
                  </div>
                  <div className={styles.favorites__item__description}>
                    <p className={styles.favorites__item__description__key}>RAM:</p>
                    <p className={styles.favorites__item__description__value}>{product.ram}</p>
                  </div>
                </NavLink>

                <div className={styles.favorites__item__buttons}>
                  <Buttons productId={String(item.id)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
