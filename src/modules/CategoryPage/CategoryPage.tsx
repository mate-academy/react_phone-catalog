import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../shared/ProductCard';
import { Dropdown } from './Dropdown';
import { getItemsPerPage } from '../../services/getItemsPerPage';
import { client } from '../../api';
import { Product } from '../../types/Product';
import {
  optionsItemsPerPage,
  optionsSortBy,
} from '../constants/DROPDOWN_PARAMS';
import { getSortProducts } from '../../services/getSortProducts';
import { Loader } from '../shared/Loader';
import { Reload } from '../shared/Reload';
import { Route } from '../shared/Route';
import { PRODUCT_URL } from "../constants/URL's/URL's";
import { Pagination } from './Pagination';
import { scrollToTop } from '../../services/scrollToTop';

type Props = {
  title: string;
};

export const CategoryPage: React.FC<Props> = React.memo(({ title }) => {
  const { pathname } = useLocation();
  const category = pathname.slice(1);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLength, setProductsLength] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectSortBy, setSelectSortBy] = useState(optionsSortBy[0].value);
  const [itemsPerPage, setItemsPerPage] = useState(
    optionsItemsPerPage[1].value,
  );

  useEffect(() => {
    if (products.length && products[0].category !== category) {
      setSelectSortBy(optionsSortBy[0].value);
      setItemsPerPage(optionsItemsPerPage[1].value);
      setCurrentPage(1);
    }
  }, [products, category]);

  useEffect(() => {
    setDataLoaded(false);
    setError(false);

    client
      .get<Product[]>(PRODUCT_URL)
      .then(data => {
        const getProducts = data.filter(
          product => product.category === category,
        );

        const perPage = getItemsPerPage(itemsPerPage, getProducts.length);
        const start = (currentPage - 1) * perPage + 1;
        const end = Math.min(currentPage * perPage, getProducts.length);

        setProductsLength(getProducts.length);
        setProducts(
          getProducts.sort(getSortProducts(selectSortBy)).slice(start - 1, end),
        );
        setDataLoaded(true);
        scrollToTop(false);
      })
      .catch(() => setError(true));
  }, [currentPage, itemsPerPage, selectSortBy, category]);

  return error ? (
    <Reload imgOfError="page-not-found.png" />
  ) : (
    <div className="category-page">
      <div className="category-page__route">
        <Route category={category} />
      </div>

      <div className="category-page__title">
        <h1 className="category-page__main-title primary-title">{title}</h1>
        {productsLength > 0 && !error && (
          <h4 className="category-page__sub-title">
            {`${productsLength} models`}
          </h4>
        )}
      </div>

      <div className="category-page__content-wrapper">
        {dataLoaded && !error ? (
          <div className="category-page__content-container">
            <div className="category-page__dropdown-container">
              <div className="category-page__dropdown-sort">
                <Dropdown
                  title="Sort by"
                  defaultValue={selectSortBy}
                  options={optionsSortBy}
                  setSelectValue={value => setSelectSortBy(value)}
                  resetCurrentPage={() => setCurrentPage(1)}
                />
              </div>

              <div className="category-page__dropdown-items">
                <Dropdown
                  title="Items per page"
                  defaultValue={itemsPerPage}
                  options={optionsItemsPerPage}
                  setSelectValue={value => setItemsPerPage(value)}
                  resetCurrentPage={() => setCurrentPage(1)}
                />
              </div>
            </div>

            <div className="category-page__product-card-container">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  discount={false}
                />
              ))}
            </div>

            {products.length !== productsLength && (
              <div className="category-page__navigation">
                <Pagination
                  total={productsLength}
                  perPage={getItemsPerPage(itemsPerPage, productsLength)}
                  currentPage={currentPage}
                  onPageChange={page => setCurrentPage(page)}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="category-page__loader">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
});
