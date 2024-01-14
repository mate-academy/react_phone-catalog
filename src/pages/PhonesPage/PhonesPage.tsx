/* eslint-disable jsx-a11y/control-has-associated-label */
import './phones-page.scss';
// import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ProductsList } from '../../components/ProductsList';
// import { getProducts } from '../../services/getProducts';
// import { Product } from '../../types/Product';
import { Pagination } from '../../components/Pagination';
import { PathBlock } from '../../components/PathBlock';
import { MainContext } from '../../context';

export const PhonesPage = () => {
  const {
    phones,
  } = useContext(MainContext);

  return (
    <div className="product__page">
      <PathBlock currentPage="Phones" />
      <h1 className="page__title">Mobile phones</h1>
      <p className="products-range">{`${phones.length} models`}</p>
      <div className="selectors__wrapper">
        <div className="select__sort-by">
          <p className="selector__title">Sort by</p>
          <select
            name="sort-by"
            className="select__field select__field--sort"
          >
            <option value="No sorting">No sorting</option>
            <option value="Newest">Newest</option>
            <option value="Alphabetically">Alphabetically</option>
            <option value="Cheapest">Cheapest</option>
          </select>
        </div>
        <div className="select__items-on-page">
          <p className="selector__title">Items on page</p>
          <select
            name="items-on-page"
            className="select__field select__field--items"
          >
            <option value="All">All</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>
      <div className="product-list__wrapper">
        <ProductsList products={phones} />
      </div>
      <Pagination />
    </div>
  );
};
