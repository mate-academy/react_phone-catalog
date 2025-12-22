import React, { useEffect, useMemo, useState } from "react";
import styles from './MobilePhones.module.scss';

import phones from '../../../public/api/phones.json';

import HomeIcon from '../../icons/home_icon.png';
import RightArrow from '../../icons/arrows/Disabled_right.png';
import FavoritesIcon from '../../icons/favorites_icon.png';

import { NavLink, useSearchParams } from "react-router-dom";

enum Sort {
  newest = 'newest',
  priceUp = 'priceUp',
  priceDown = 'priceDown'
};

export const MobilePhones: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as Sort) || Sort.newest;
  const itemsPerPage = +(searchParams.get('limit') || 16);
  const currentPage = +(searchParams.get('page') || 1);

  const visiblePhones = useMemo(() => {
    const sorted = [...phones];

    switch (sortBy) {
      case Sort.priceDown:
        sorted.sort((a, b) => b.priceDiscount - a.priceDiscount);
        break;
      case Sort.priceUp:
        sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);
        break;
      case Sort.newest:
      default:
        sorted.sort((a, b) => b.namespaceId.localeCompare(a.namespaceId));
        break;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);

  }, [sortBy, itemsPerPage, currentPage]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('limit', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }

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
            <select
              name="sort"
              id="sort-select"
              className={styles.mobile_phones__top_bar__filter__select}
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="priceUp">Price: Low to High</option>
              <option value="priceDown">Price: High to Low</option>
            </select>
          </div>
          <div className={styles.mobile_phones__top_bar__filter__items}>
            <p className={styles.mobile_phones__top_bar__filter__text}>Items on page</p>
            <select
              name="items"
              id="items-select"
              className={styles.mobile_phones__top_bar__filter__select}
              value={itemsPerPage}
              onChange={handleLimitChange}
            >
              <option value="16">16</option>
              <option value="24">24</option>
              <option value="32">32</option>
            </select>
          </div>
        </div>

        <div className={styles.mobile_phones__products}>
          {visiblePhones.map(item => (
            <div key={item.id} className={styles.mobile_phones__products__item}>
              <div className={styles.mobile_phones__products__item__container}>
                <NavLink
                  to={`/phones/${item.id}`}
                className={styles.mobile_phones__products__item__link}
                  >
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
              </NavLink>

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

    </div >
  )
}
