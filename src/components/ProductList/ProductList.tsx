import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { sortProducts } from '../../helpers/sortHelper';
import { Dropdown } from '../Dropdown/Dropdown';
import { SortTypeForDropdown } from '../../types/SortType';
import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';
import './productList.scss';
import { Loader } from '../Loader';

export type Props = {
  products: Product[],
  isSortDropdownShown?: boolean,
  isPaginationShown?: boolean,
  handleVisibleProductsNumber:(number: number) => void,
};

export const itemsOptions = ['4', '8', '16', 'All'];

export const ProductList: React.FC<Props> = ({
  products,
  isSortDropdownShown,
  isPaginationShown,
  handleVisibleProductsNumber,
}) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const itemsOnPage = Number(searchParams.get('itemsOnPage'))
    || products.length;
  const sortBy = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const start = (page - 1) * itemsOnPage;
  const end = start + itemsOnPage;
  const isPaginationBarShown = isPaginationShown
    && itemsOnPage !== products.length;

  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);

  const productsByQuery = (inputQuery: string) => {
    const queryNormalized = inputQuery.trim().toLowerCase();

    return products.filter(item => {
      return item.name.toLowerCase().includes(queryNormalized);
    });
  };

  const sortedProducts = useMemo(
    () => sortProducts(productsByQuery(query), sortBy),
    [sortBy, products, query],
  );

  useEffect(() => {
    setIsLoading(true);

    if (handleVisibleProductsNumber) {
      handleVisibleProductsNumber(sortedProducts.length);
    }

    setVisibleProducts(sortedProducts.slice(start, end));

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [products, sortBy, itemsOnPage, page, query]);

  const startSortValue = sortBy.length === 0 ? 'Choose an option' : sortBy;
  const startItemsValue = itemsOnPage === products.length
    ? 'All'
    : itemsOnPage.toString();

  return (
    <>
      {isLoading && <Loader />}

      {visibleProducts.length > 0 && !isLoading && (
        <div className="product-list">
          {(isPaginationShown || isSortDropdownShown) && (
            <div className="product-list__container">
              {isSortDropdownShown && (
                <div className="product-list__dropdowns">
                  <Dropdown
                    label="Sort by"
                    classModificator="sort"
                    options={Object.values(SortTypeForDropdown)}
                    startValue={startSortValue}
                    searchParamsKey="sort"
                  />
                  <Dropdown
                    label="Items on page"
                    classModificator="items"
                    options={itemsOptions}
                    startValue={startItemsValue}
                    searchParamsKey="itemsOnPage"
                  />
                </div>
              )}
            </div>
          )}

          {visibleProducts && (
            <ul data-cy="cardsContainer" className="product-list__content">
              {visibleProducts.map((product: Product) => (
                <li
                  key={product.id}
                  data-cy="cardsContainer"
                  className="product-list__item"
                >
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}

          {isPaginationBarShown && (
            <div className="product-list__pagination">
              <Pagination
                total={sortedProducts.length}
                itemsOnPage={itemsOnPage}
                currentPage={page}
              />
            </div>
          )}
        </div>
      )}

      {productsByQuery(query).length === 0 && !isLoading && (
        <NoSearchResults />
      )}
    </>
  );
};

ProductList.defaultProps = {
  isSortDropdownShown: false,
  isPaginationShown: false,
};
