/* eslint-disable no-console */
import '../../styles/pages/PhonesPage/PhonesPage.scss';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Crumbs } from '../../components/Crumbs';
import { Dropdown, Option } from '../../components/Dropdown';
import { ProductList } from '../../components/ProductList';
import { Pagination } from '../../components/Pagination';
import { Product, ProductType } from '../../types/product';
import { productApi } from '../../utils/api/productApi';
import { SortBy, productService } from '../../utils/productService';
import { getPageTitle, getQuantity } from '../../utils/getPageTitle';

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
  productType: ProductType;
};

export const ProductPage: React.FC<Props> = ({ productType }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const page = +(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || 8;
  const sortBy = searchParams.get('sortBy') as SortBy;

  useEffect(() => {
    setIsLoading(true);
    console.log(isLoading);
    console.log(errorMessage);

    productApi.getAll
      .then(setProducts)
      .catch(error => {
        setErrorMessage(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = productService.filterProducts(products, productType);

  const sortedProducts = productService.sortProducts(filteredProducts, sortBy);

  const visibleProducts = productService
    .sliceProducts(sortedProducts, page, perPage);

  const totalPages = Math.ceil(filteredProducts.length / +perPage);

  return (
    <section className="phones-page">
      <Crumbs />

      <h1 className="phones-page__title">{getPageTitle(productType)}</h1>

      <p className="phones-page__quantity">{`${filteredProducts.length} ${getQuantity(productType)}`}</p>

      <div className="phones-page__dropdown-container">
        <Dropdown title="Sort by" options={sortByOptions} />

        <Dropdown
          title="Items on page"
          options={perPageOptions}
          initialOption={1}
        />
      </div>

      <div className="phones-page__product-list">
        <ProductList
          products={visibleProducts}
          selected={[]}
          favourites={[]}
          onFavouritesClick={() => { }}
          onSelectedClick={() => { }}
        />
      </div>

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} />
      )}
    </section>
  );
};
