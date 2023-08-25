/* eslint-disable max-len */
import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { Product } from '../types/Phone';
// import { ProductType, getProductsWithType } from '../api/getProducts';
import ProductCard from './ProductCard';
import { IconSlideLeft, IconSlideRight } from '../utils/Icons';
import { SortType } from '../types/SortType';
import AsideRoute from './AsideRoute';
// import { ProductType } from '../api/getProducts';

interface Props {
  title: string;
  products: Product[];
}

const {
  NEWEST,
  NAME,
  PRICE_ASC,
  PRICE_DESC,
} = SortType;

const ProductsCatalog: React.FC<Props> = ({ products, title }) => {
  const [productsPerPage, setProductsPerPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortQuery, setSortQuery] = useState<SortType>(NEWEST);

  const currentIndex = useMemo(() => {
    if (currentPage === 1) {
      return 0;
    }

    return (currentPage - 1) * productsPerPage;
  }, [currentPage, productsPerPage]);

  const visibleProducts = useMemo(() => {
    const productsOnPage = products.slice(currentIndex, currentIndex + productsPerPage);

    return [...productsOnPage].sort((product1: Product, product2: Product) => {
      switch (sortQuery) {
        case NEWEST: {
          return product1[sortQuery] - product2[sortQuery];
        }

        case NAME: {
          return product1.name.localeCompare(product2.name);
        }

        case PRICE_ASC: {
          return product1.price - product2.price;
        }

        case PRICE_DESC: {
          return product2.price - product1.price;
        }

        default:
          return 0;
      }
    });
  },
  [sortQuery, products, currentPage, productsPerPage]);

  // const routeTitle = useMemo(() => {
  //   if (products[0].type === ProductType.PHONE) {
  //     return 'Phones';
  //   }

  //   if (products[0].type === ProductType.TABLET) {
  //     return 'Tablets';
  //   }

  //   return 'Accessories';
  // }, [products]);

  const buttons = useMemo(() => {
    const totalPages = Math.ceil(products.length / productsPerPage);

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [products, productsPerPage]);

  return (
    <main className="main-catalog container">
      {products.length > 0 && <AsideRoute product={products[0]} />}

      <section className="section-catalog">

        <h1 className="section-catalog__title">
          {title}
        </h1>

        <p className="section-catalog__caption">
          {`${products.length} models`}
        </p>

        <div className="section-catalog__items-displaying">
          <label htmlFor="sort" className="section-catalog__items-displaying--wrapper">
            Sort by

            <select
              name="sort-order"
              id="sort"
              className="section-catalog__items-displaying--select"
              onChange={(event) => setSortQuery(event.target.value as SortType)}
            >
              <option value="age">Newest</option>
              <option value="name">Alphabetically</option>
              <option value="price-asc">Cheapest</option>
              <option value="price-desc">Most expensive</option>
            </select>
          </label>

          <label htmlFor="amount" className="section-catalog__items-displaying--wrapper">
            Items on page

            <select
              name="amount"
              id="amount"
              className="section-catalog__items-displaying--select"
              defaultValue={productsPerPage.toString()}
              onChange={(event) => setProductsPerPage(+event.target.value || products.length)}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="All ">All</option>
            </select>
          </label>
        </div>

        <div className="section-catalog__products catalog">
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {buttons.length > 1
        && (
          <div className="section-catalog__pagination">
            <button
              className="slider-button"
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <IconSlideLeft />
            </button>

            <div className="section-catalog__pagination--wrapper">
              {buttons.map(button => (
                <button
                  key={button}
                  type="button"
                  onClick={() => setCurrentPage(button)}
                  className={`page-button${classNames({ ' button-is-active': currentPage === button })}`}
                >
                  {button}
                </button>
              ))}
            </div>

            <button
              className="slider-button"
              type="button"
              disabled={currentPage === buttons.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <IconSlideRight />
            </button>
          </div>
        )}

      </section>
    </main>
  );
};

export default ProductsCatalog;
