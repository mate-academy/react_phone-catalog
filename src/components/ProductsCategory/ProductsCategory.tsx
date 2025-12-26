import React, { useMemo } from "react";
import styles from './ProductsCategory.module.scss';

import HomeIcon from '../../icons/home_icon.png';
import RightArrow from '../../icons/arrows/Disabled_right.png';
import ActiveLeft from '../../icons/arrows/Active_left.png';
import ActiveRight from '../../icons/arrows/Active_right.png';
import FavoritesIcon from '../../icons/favorites_icon.png';

import { NavLink, useSearchParams } from "react-router-dom";

interface Product {
  id: string;
  images: string[];
  name: string;
  priceDiscount: number;
  priceRegular: number;
  screen: string;
  capacity: string;
  ram: string;
  namespaceId: string;
}

interface Props {
  products: Product[];
  title: string;
  categoryName: string;
}

enum Sort {
  newest = 'newest',
  priceUp = 'priceUp',
  priceDown = 'priceDown'
};

export const ProductsCategory: React.FC<Props> = ({ products, title, categoryName }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as Sort) || Sort.newest;
  const itemsPerPage = +(searchParams.get('limit') || 16);
  const currentPage = +(searchParams.get('page') || 1);

  const visibleProducts = useMemo(() => {
    const sorted = [...products];

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

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxVisiblePages = 4;

  const visiblePageNumbers = useMemo(() => {
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return pageNumbers.slice(start - 1, end);
  }, [currentPage, totalPages, pageNumbers]);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.products_category__container}>
      <div className={styles.products_category__top_bar}>
        <div className={styles.products_category__top_bar__path}>
          <img src={HomeIcon} alt="Home page" className={styles.products_category__top_bar__path__icon} />
          <img src={RightArrow} alt="Next" className={styles.products_category__top_bar__path__arrow} />
          <p className={styles.products_category__top_bar__path__text}>{categoryName}</p>
        </div>

        <h1 className={styles.products_category__top_bar__title}>{title}</h1>
        <p className={styles.products_category__top_bar__description}>{products.length} models</p>

        <div className={styles.products_category__top_bar__filter}>
          <div className={styles.products_category__top_bar__filter__sort}>
            <p className={styles.products_category__top_bar__filter__text}>Sort by</p>
            <select
              name="sort"
              id="sort-select"
              className={styles.products_category__top_bar__filter__select}
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="priceUp">Price: Low to High</option>
              <option value="priceDown">Price: High to Low</option>
            </select>
          </div>
          <div className={styles.products_category__top_bar__filter__items}>
            <p className={styles.products_category__top_bar__filter__text}>Items on page</p>
            <select
              name="items"
              id="items-select"
              className={styles.products_category__top_bar__filter__select}
              value={itemsPerPage}
              onChange={handleLimitChange}
            >
              <option value="16">16</option>
              <option value="24">24</option>
              <option value="32">32</option>
            </select>
          </div>
        </div>

        <div className={styles.products_category__products}>
          {visibleProducts.map(item => (
            <div key={item.id} className={styles.products_category__products__item}>
              <div className={styles.products_category__products__item__container}>
                <NavLink
                  to={`/${categoryName.toLowerCase()}/${item.id}`}
                  className={styles.products_category__products__item__link}
                >
                  <img
                    src={item.images[0]}
                    alt='Item Main Image'
                    className={styles.products_category__products__item__img}
                  />
                  <p className={styles.products_category__products__item__name}>{item.name}</p>
                  <div className={styles.products_category__products__item__price__container}>
                    <h4 className={styles.products_category__products__item__price__container__main_price}>${item.priceDiscount}</h4>
                    <p className={styles.products_category__products__item__price__container__full_price}>${item.priceRegular}</p>
                  </div>
                  <div className={styles.products_category__products__item__description}>
                    <p className={styles.products_category__products__item__description__key}>Screen:</p>
                    <p className={styles.products_category__products__item__description__value}>{item.screen}</p>
                  </div>
                  <div className={styles.products_category__products__item__description}>
                    <p className={styles.products_category__products__item__description__key}>Capacity:</p>
                    <p className={styles.products_category__products__item__description__value}>{item.capacity}</p>
                  </div>
                  <div className={styles.products_category__products__item__description}>
                    <p className={styles.products_category__products__item__description__key}>RAM:</p>
                    <p className={styles.products_category__products__item__description__value}>{item.ram}</p>
                  </div>
                </NavLink>

                <div className={styles.products_category__products__item__buttons}>
                  <button className={styles.products_category__products__item__buttons__cart}>Add to cart</button>
                  <button className={styles.products_category__products__item__buttons__fav}>
                    <img src={FavoritesIcon} alt='Add to favorites' className={styles.products_category__products__item__buttons__fav__icon} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.products_category__bottom_buttons}>
          <div className={styles.products_category__bottom_buttons__navigation}>
            <button
              className={styles.products_category__bottom_buttons__navigation__arrow}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <img
                src={ActiveLeft}
                alt="Previous products"
                className={styles.products_category__bottom_buttons__navigation__img}
              />
            </button>
          </div>

          <div className={styles.products_category__bottom_buttons__navigation}>
            <div className={styles.products_category__bottom_buttons__navigation__numbers}>
              {visiblePageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`${styles.products_category__bottom_buttons__navigation__number} ${currentPage === number ? styles['is-active'] : ''
                    }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.products_category__bottom_buttons__navigation}>
            <button
              className={styles.products_category__bottom_buttons__navigation__arrow}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <img
                src={ActiveRight}
                alt="Next products"
                className={styles.products_category__bottom_buttons__navigation__img}
              />
            </button>
          </div>
        </div>
      </div>

    </div >
  )
}
