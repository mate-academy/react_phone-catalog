import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Phone';
import ProductCard from './ProductCard';
import { SortType } from '../../types/SortType';
import AsideRoute from './AsideRoute';
import { selectAmountLink, selectSortLink } from '../../utils/selectLinks';
import CustomSelect from './CustomSelect';
import Pagination from './Pagination';
import NoSearchResults from './NoSearchResult';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAmount = searchParams.get('items-per-page');
  const initialSortQuery = searchParams.get('sort');
  const initialPageNumber = searchParams.get('page');

  const [
    productsPerPage,
    setProductsPerPage,
  ] = useState<number>(initialAmount ? +initialAmount : products.length);

  const [
    currentPage, setCurrentPage,
  ] = useState<number>(initialPageNumber ? +initialPageNumber : 1);

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
    const sortedProducts = [...products].sort(
      (product1: Product, product2: Product) => {
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
      },
    );

    return sortedProducts.slice(
      currentIndex, currentIndex + (productsPerPage || -1),
    );
  },
  [sortQuery, products, currentPage, productsPerPage]);

  const buttons = useMemo(() => {
    const totalPages = Math.ceil(products.length / productsPerPage);

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [products, productsPerPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const updatedSearchParams = new URLSearchParams(searchParams);

    updatedSearchParams.set('page', currentPage.toString());

    setSearchParams(updatedSearchParams);
  }, [currentPage]);

  return (
    <main className="main-catalog container" data-cy="productList">
      {products.length > 0 && <AsideRoute product={products[0]} />}

      <section className="section-catalog">
        <h1 className="section-catalog__title">
          {title}
        </h1>

        {visibleProducts.length > 0
          ? (
            <>
              <p className="section-catalog__caption">
                {`${products.length} models`}
              </p>

              <div className="section-catalog__items-displaying">
                <CustomSelect
                  title="Sort by"
                  searchParam="sort"
                  selectSortLink={selectSortLink}
                  setSortQuery={setSortQuery}
                  sortQuery={sortQuery}
                />

                <CustomSelect
                  title="Items on page"
                  searchParam="items-per-page"
                  selectSortLink={selectAmountLink}
                  setProductsPerPage={setProductsPerPage}
                  sortQuery={sortQuery}
                  productsLength={products.length}
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
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    buttons={buttons}
                  />

                )}
            </>
          ) : (
            <NoSearchResults />
          )}
      </section>
    </main>
  );
};

export default ProductsCatalog;
