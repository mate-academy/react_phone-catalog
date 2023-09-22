/* eslint-disable no-console */
import '../../styles/pages/ProductsPage/ProductsPage.scss';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Crumbs } from '../../components/Crumbs';
import { Dropdown, Option } from '../../components/Dropdown';
import { ProductList } from '../../components/ProductList';
import { Pagination } from '../../components/Pagination';
import { Product, ProductType } from '../../types/product';
import { productApi } from '../../utils/api/productApi';
import { SortBy, productService } from '../../utils/productService';
import { getPageTitle, getQuantity } from '../../utils/getPageTitle';
import { Loader } from '../../components/Loader';
import { Item } from '../../types/storageItem';

const sortByOptions: Option[] = [
  { name: 'Newest', property: { sortBy: 'id' } },
  { name: 'Cheapest', property: { sortBy: 'price' } },
  { name: 'Alphabetically', property: { sortBy: 'name' } },
];

const perPageOptions: Option[] = [
  { name: '4', property: { perPage: '4' } },
  { name: '8', property: { perPage: '8' } },
  { name: '16', property: { perPage: '16' } },
  { name: 'All', property: { perPage: 'all' } },
];

type Props = {
  query: string;
  productType: ProductType;
  isIncluded: (items: Item<Product>[], value: Product) => boolean;
  cart: Item<Product>[];
  fav: Item<Product>[];
  onSelectedClick: (value: Product) => void;
  onFavClick: (value: Product) => void;
};

export const ProductPage: React.FC<Props> = ({
  query,
  productType,
  isIncluded,
  cart,
  fav,
  onSelectedClick,
  onFavClick,
}) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const page = +(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || 8;
  const sortBy = searchParams.get('sortBy') as SortBy;

  useEffect(() => {
    setIsLoading(true);

    productApi.getAll
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return productService.filterProducts(products, productType);
  }, [products, productType]);

  const filteredByQuery = useMemo(() => {
    return productService.filterProducts(filteredProducts, productType, query);
  }, [filteredProducts, query]);

  const sortedProducts = useMemo(() => {
    return productService.sortProducts(filteredByQuery, sortBy);
  }, [filteredByQuery, sortBy]);

  const visibleProducts
    = productService.sliceProducts(sortedProducts, page, perPage);

  const totalPages = Math.ceil(filteredProducts.length / +perPage);

  return (
    <main className="products-page">
      <Crumbs />

      <h1 className="products-page__title">{getPageTitle(productType)}</h1>

      <p className="products-page__quantity">{`${filteredProducts.length} ${getQuantity(productType)}`}</p>

      {isLoading && (
        <div className="products-page__loader-container">
          <Loader />
        </div>
      )}

      {!isLoading && filteredProducts.length < 1 && (
        <h1 className="products-page__sad-message">{`No ${getPageTitle(productType)} found`}</h1>
      )}

      {!isLoading
        && filteredProducts.length >= 1
        && filteredByQuery.length < 1 && (
        <h1 className="products-page__sad-message">{`No ${getPageTitle(productType)} found by given criteria`}</h1>
      )}

      {!isLoading && visibleProducts.length > 0 && (
        <>
          <div className="products-page__dropdown-container">
            <Dropdown title="Sort by" options={sortByOptions} />

            <Dropdown
              title="Items on page"
              options={perPageOptions}
              initialOption={1}
            />
          </div>

          <div className="products-page__product-list">
            <ProductList
              products={visibleProducts}
              isIncluded={isIncluded}
              onSelectedClick={onSelectedClick}
              onFavClick={onFavClick}
              cart={cart}
              fav={fav}
            />
          </div>

          {totalPages > 1 && (
            <Pagination totalPages={totalPages} />
          )}
        </>
      )}
    </main>
  );
};
