import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Phone';
import ProductCard from './ProductCard';
import {
  IconSlideLeft, IconSlideRight,
} from '../utils/Icons';
import { SortType } from '../types/SortType';
import AsideRoute from './AsideRoute';
import { selectAmountLink, selectSortLink } from '../utils/selectLinks';
import CustomSelect from './CustomSelect';

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
  const [searchParams] = useSearchParams();
  const initialAmount = searchParams.get('items-per-page');
  const initialSortQuery = searchParams.get('sort');

  const [
    productsPerPage,
    setProductsPerPage,
  ] = useState<number>(initialAmount ? +initialAmount : 4);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [
    sortQuery, setSortQuery,
  ] = useState<SortType>(initialSortQuery as SortType || NEWEST);

  const currentIndex = useMemo(() => {
    if (currentPage === 1) {
      return 0;
    }

    return (currentPage - 1) * productsPerPage;
  }, [currentPage, productsPerPage]);

  const visibleProducts = useMemo(() => {
    const productsOnPage = products.slice(
      currentIndex, currentIndex + (productsPerPage || -1),
    );

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

  const buttons = useMemo(() => {
    const totalPages = Math.ceil(products.length / productsPerPage);

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [products, productsPerPage]);

  return (
    <main className="main-catalog container" data-cy="productList">
      {products.length > 0 && <AsideRoute product={products[0]} />}

      <section className="section-catalog">

        <h1 className="section-catalog__title">
          {title}
        </h1>

        <p className="section-catalog__caption">
          {`${products.length} models`}
        </p>

        <div className="section-catalog__items-displaying">
          <CustomSelect
            title="Sort by"
            searchParam="sort"
            selectSortLink={selectSortLink}
            setSortQuery={setSortQuery}
            setProductsPerPage={null}
            sortQuery={sortQuery}
            productsPerPage={productsPerPage}
          />

          <CustomSelect
            title="Items on page"
            searchParam="items-per-page"
            selectSortLink={selectAmountLink}
            setSortQuery={null}
            setProductsPerPage={setProductsPerPage}
            sortQuery={sortQuery}
            productsPerPage={productsPerPage}
          />
        </div>

        <div className="section-catalog__products catalog">
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {buttons.length > 1
        && (
          <div className="section-catalog__pagination" data-cy="pagination">
            <button
              className="slider-button"
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              data-cy="paginationLeft"
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
              data-cy="paginationRight"
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
