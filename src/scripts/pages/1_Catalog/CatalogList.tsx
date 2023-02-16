/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import { Context } from '../../helpers/context/context';

import { ProductsList } from '../../components/3_ProductsList/ProductsList';
import { CartList } from '../../components/5_CartList/CartList';

import './catalogList.scss';

export const CatalogList: React.FC = () => {
  const titleName = useParams().product;

  const {
    goods,
    favList,
    cartList,
    filterWord,
  } = useContext(Context);

  const [typeSort, setTypeSort] = useState('price');
  const [onPage, setOnPage] = useState(8);
  const [fitered, setFilter] = useState([]);
  const pages = fitered.length / onPage;
  const currentPage = 1;

  useEffect(() => {
    let fiteredItem = goods
      .filter((item: { type: string | undefined; }) => item.type === titleName)
      .sort((a: { price: number; }, b: { price: number }) => b.price - a.price);

    if (filterWord.length > 0) {
      fiteredItem = fiteredItem
        .filter((item: { name: string; }) => item.name.includes(filterWord)
        || item.name.toLowerCase().includes(filterWord));
    }

    const currentPages = fiteredItem.slice((currentPage - 1) * pages, onPage);

    return setFilter(currentPages);
  }, [titleName, onPage, typeSort, filterWord]);

  return (
    <div className="catalog">
      <div className="catalog__header">
        <NavLink
          to="/"
          className="catalog__home-button"
          title="home icon"
        >
          <span className="catalog__home-icon" />
        </NavLink>
        <div className="catalog__header-container">
          <span className="catalog__header-arrow" />
        </div>
        <p className="catalog__title">{titleName}</p>
      </div>

      <h1>
        {
          (titleName === 'phone') ? 'Mobile phones'
            : (titleName === 'tablet') ? 'Tablets'
              : (titleName === 'accessories') ? 'Accessories'
                // eslint-disable-next-line no-nested-ternary
                : (titleName === 'favourites') ? 'Favorites'
                  : (titleName === 'cart') ? 'Cart'
                    : 'No name'
        }
      </h1>

      <p className="catalog__quantity">{`${fitered.length} models`}</p>

      {(fitered.length > 0 && titleName !== 'favourites') || (
        fitered.length > 0 && titleName !== 'cart') ? (
          <>
            <div className="catalog__select-container">
              <div className="catalog__select1-container">
                <p>Sort by</p>
                <select
                  title="sort"
                  className="select__select-group"
                  value={typeSort}
                  onChange={e => setTypeSort(e.target.value)}
                >
                  <option value="age">Newest</option>
                  <option value="discount">Hot prices</option>
                  <option value="price">Chipest</option>
                </select>
              </div>

              <div className="catalog__select1-container">
                <p>Items on page</p>
                <select
                  title="sort"
                  className="select__select-group"
                  value={onPage}
                  onChange={e => setOnPage(+e.target.value)}
                >
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                </select>
              </div>
            </div>

            <ProductsList goods={fitered} />
          </>
        ) : (
          <>
            {(titleName === 'cart' && cartList.length > 0) ? (<CartList />)
              : (titleName === 'favourites' && favList.length > 0)
                ? (<ProductsList goods={favList} />)
                : (
                  <h1>Sorry, we don`t have a such goods for you!</h1>
                )}
          </>
        )}

    </div>
  );
};
