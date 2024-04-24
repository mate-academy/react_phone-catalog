import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Dropdown } from '../Dropdown';
import { Pagination } from '../Pagination';
import { getItemsPerPage } from '../../../services/getItemsPerPage';
import { client } from '../../../api';
import { Product } from '../../../types/Product';
import {
  optionsItemsPerPage,
  optionsSortBy,
} from '../../constants/DROPDOWN_PARAMS';
import { getSortProducts } from '../../../services/getSortProducts';
import { Loader } from '../Loader';
import { Reload } from '../Reload';

type Props = {
  title: string;
  typeOfProduct: string;
};

const PRODUCT_URL = 'products.json';

export const ProductPage: React.FC<Props> = React.memo(
  ({ title, typeOfProduct }) => {
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
      setDataLoaded(false);
      setError(false);

      client
        .get<Product[]>(PRODUCT_URL)
        .then(data => {
          const getProducts = data.filter(
            product => product.category === typeOfProduct,
          );

          const perPage = getItemsPerPage(itemsPerPage, getProducts.length);
          const start = (currentPage - 1) * perPage + 1;
          const end = Math.min(currentPage * perPage, getProducts.length);

          setProductsLength(getProducts.length);
          setProducts(
            getProducts
              .sort(getSortProducts(selectSortBy))
              .slice(start - 1, end),
          );
          setDataLoaded(true);
        })
        .catch(() => setError(true));
    }, [currentPage, itemsPerPage, selectSortBy, typeOfProduct]);

    return error ? (
      <Reload imgOfError="page-not-found.png" />
    ) : (
      <div className="product-page">
        <div className="product-page__route">
          <img src="/img/icons/home.svg" alt="home" />
          <img src="/img/icons/move-right.svg" alt="to" />
          <span className="product-page__page-name">{typeOfProduct}</span>
        </div>

        <div className="product-page__title">
          <h1 className="product-page__main-title primary-title">{title}</h1>
          {productsLength > 0 && !error && (
            <h4 className="product-page__sub-title">
              {`${productsLength} models`}
            </h4>
          )}
        </div>

        <div className="product-page__content-wrapper">
          {dataLoaded && !error ? (
            <div className="product-page__content-container">
              <div className="product-page__dropdown-container">
                <div className="product-page__dropdown-sort">
                  <Dropdown
                    title="Sort by"
                    defaultValue={selectSortBy}
                    options={optionsSortBy}
                    setSelectValue={value => setSelectSortBy(value)}
                    resetCurrentPage={() => setCurrentPage(1)}
                  />
                </div>

                <div className="product-page__dropdown-items">
                  <Dropdown
                    title="Items per page"
                    defaultValue={itemsPerPage}
                    options={optionsItemsPerPage}
                    setSelectValue={value => setItemsPerPage(value)}
                    resetCurrentPage={() => setCurrentPage(1)}
                  />
                </div>
              </div>

              <div className="product-page__product-card-container">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    hotPrice={false}
                  />
                ))}
              </div>

              {products.length !== productsLength && (
                <div className="product-page__navigation">
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
            <div className="product-page__loader">
              <Loader />
            </div>
          )}
        </div>
      </div>
    );
  },
);
