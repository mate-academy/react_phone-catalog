/* eslint-disable jsx-a11y/control-has-associated-label */

import { Link } from 'react-router-dom';
import './phones-page.scss';
import { useState, useEffect } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { getProducts } from '../../services/getProducts';
import { Product } from '../../types/Product';
import { Pagination } from '../../components/Pagination/Pagination';

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProductsFromServer = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch {
      // eslint-disable-next-line no-console
      console.warn('products loading error!');
    }
  };

  useEffect(() => {
    getProductsFromServer();
  }, []);

  return (
    <div className="phone__page">
      <div className="path-box">
        <Link
          to="/home"
          className="home__link icon"
        />
        <div className="arrow-path icon" />
        <p className="current-page">Phones</p>
      </div>
      <h1 className="page__title">Mobile phones</h1>
      <p className="phones-range">95 models</p>
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
      <div className="phone-list__wrapper">
        <ProductsList products={products} />
      </div>
      <Pagination />
    </div>
  );
};
