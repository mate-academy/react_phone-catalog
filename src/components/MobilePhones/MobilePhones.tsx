import React from "react";
import styles from './MobilePhones.module.scss';

import phones from '../../../public/api/phones.json';

import HomeIcon from '../../icons/home_icon.png';
import RightArrow from '../../icons/arrows/Disabled_right.png';
import FavoritesIcon from '../../icons/favorites_icon.png';

import { NavLink } from "react-router-dom";

export const MobilePhones: React.FC = () => {
  return (
    <div className={styles.mobile_phones__container}>
      <div className={styles.mobile_phones__top_bar}>
        <div className={styles.mobile_phones__top_bar__path}>
          <img src={HomeIcon} alt="Home page" className={styles.mobile_phones__top_bar__path__icon} />
          <img src={RightArrow} alt="Next" className={styles.mobile_phones__top_bar__path__arrow} />
          <p className={styles.mobile_phones__top_bar__path__text}>Phones</p>
        </div>

        <h1 className={styles.mobile_phones__top_bar__title}>Mobile phones</h1>
        <p className={styles.mobile_phones__top_bar__description}>{phones.length} models</p>

        <div className={styles.mobile_phones__top_bar__filter}>
          <div className={styles.mobile_phones__top_bar__filter__sort}>
            <p className={styles.mobile_phones__top_bar__filter__text}>Sort by</p>
            <select name="sort" id="sort-select" className={styles.mobile_phones__top_bar__filter__select}>
              <option value="newest">Newest</option>
              <option value="priceUp">Price - lower to higher</option>
              <option value="priceDown">Price - higher to lower</option>
            </select>
          </div>
          <div className={styles.mobile_phones__top_bar__filter__items}>
            <p className={styles.mobile_phones__top_bar__filter__text}>Items on page</p>
            <select name="items" id="items-select" className={styles.mobile_phones__top_bar__filter__select}>
              <option value="16">16</option>
              <option value="24">24</option>
              <option value="32">32</option>
            </select>
          </div>
        </div>

        <div className={styles.mobile_phones__products}>
          {phones.map(item => (
            <div key={item.id} className={styles.mobile_phones__products__item}>
              <div className={styles.mobile_phones__products__item__container}>
                <img
                  src={item.images[0]}
                  alt='Item Main Image'
                  className={styles.mobile_phones__products__item__img}
                />
                <p className={styles.mobile_phones__products__item__name}>{item.name}</p>
                <div className={styles.mobile_phones__products__item__price__container}>
                  <h4 className={styles.mobile_phones__products__item__price__container__main_price}>${item.priceDiscount}</h4>
                  <p className={styles.mobile_phones__products__item__price__container__full_price}>${item.priceRegular}</p>
                </div>
                <div className={styles.mobile_phones__products__item__description}>
                  <p className={styles.mobile_phones__products__item__description__key}>Screen:</p>
                  <p className={styles.mobile_phones__products__item__description__value}>{item.screen}</p>
                </div>
                <div className={styles.mobile_phones__products__item__description}>
                  <p className={styles.mobile_phones__products__item__description__key}>Capacity:</p>
                  <p className={styles.mobile_phones__products__item__description__value}>{item.capacity}</p>
                </div>
                <div className={styles.mobile_phones__products__item__description}>
                  <p className={styles.mobile_phones__products__item__description__key}>RAM:</p>
                  <p className={styles.mobile_phones__products__item__description__value}>{item.ram}</p>
                </div>
                <div className={styles.mobile_phones__products__item__buttons}>
                  <button className={styles.mobile_phones__products__item__buttons__cart}>Add to cart</button>
                  <button className={styles.mobile_phones__products__item__buttons__fav}>
                    <img src={FavoritesIcon} alt='Add to favorites' className={styles.mobile_phones__products__item__buttons__fav__icon} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
