import { useMemo } from 'react';
import classNames from 'classnames';
import { /* useOutletContext, */ useSearchParams } from 'react-router-dom';
import './ProductsPage.scss';

// import { Product } from '../../types/Product';

import { ProductsList } from '../../components/ProductsList/ProductsList';
import { DropdownSelect } from '../../components/DropdownSelect/DropdownSelect';
import { Pagintaion } from '../../components/Pagination/Pagination';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';

import { getItemsPerPage } from '../../helpers/getItemsPerPage';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { normalizeValue } from '../../helpers/normalizeValue';
import { getTitle } from '../../helpers/getTitle';
import { NoResults } from '../../components/NoResults/NoResults';
import { ProductType } from '../../types/ProductType';
import { getCategoryName } from '../../helpers/getCategoryName';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import { Loader } from '../../components/Loader';

enum SortValue {
  age = 'age',
  name = 'name',
  price = 'price',
}

type Props = {
  productType: ProductType;
};

export const ProductsPage: React.FC<Props> = ({ productType }) => {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const currentPage = +(searchParams.get('page') || '') || 1;
  const query = searchParams.get('query') || '';

  const title = getTitle(productType);
  const categoryName = getCategoryName(productType);

  const productsByType = useMemo(() => {
    return products.filter(product => product.type === productType);
  }, [products, productType]);

  const filteredProducts = useMemo(() => {
    return productsByType.filter(product => {
      const normalizedQuery = normalizeValue(query);
      const normalizedName = normalizeValue(product.name);

      return normalizedName.includes(normalizedQuery);
    });
  }, [productsByType, query]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];

    switch (sortBy) {
      case SortValue.age:
        return copy.sort((a, b) => a.age - b.age);

      case SortValue.name:
        return copy.sort((a, b) => a.name.localeCompare(b.name));

      case SortValue.price:
        return copy
          .sort((a, b) => calculateDiscount(a) - calculateDiscount(b));

      default:
        return filteredProducts;
    }
  }, [sortBy, filteredProducts]);

  const totalItemsCount = sortedProducts.length;
  const itemsPerPage = getItemsPerPage(perPage, totalItemsCount);
  const itemsFrom = itemsPerPage * currentPage - (itemsPerPage - 1);
  const itemsTo = Math.min(itemsPerPage * currentPage, totalItemsCount);

  const visibleItems = useMemo(() => {
    return sortedProducts.slice(itemsFrom - 1, itemsTo);
  }, [sortBy, itemsFrom, itemsTo, sortedProducts]);

  return (
    <div className="ProductsPage container">
      <div className="ProductsPage__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="ProductsPage__title">
        <h1>{title}</h1>
        <p>{`${totalItemsCount} models`}</p>
      </div>

      <div className={classNames(
        'ProductsPage__actions',
        { disabled: !totalItemsCount },
      )}
      >
        <DropdownSelect
          paramName="sort"
          label="Sort by"
        >
          <option value="age">Newest</option>
          <option value="name">Alphabetically</option>
          <option value="price">Cheapest</option>
        </DropdownSelect>

        <DropdownSelect
          paramName="perPage"
          label="Items on page"
        >
          <option value="all">All</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </DropdownSelect>
      </div>

      {!totalItemsCount && query && (
        <NoSearchResults category={categoryName} />
      )}

      {!totalItemsCount && !query && !isLoading && (
        <NoResults category={categoryName} />
      )}

      {isLoading && <Loader />}

      {!!totalItemsCount && !isLoading && (
        <section>
          <div className="ProductsPage__product-list">
            <ProductsList items={visibleItems} />
          </div>

          {totalItemsCount > 3 && (
            <Pagintaion
              total={totalItemsCount}
              perPage={itemsPerPage}
              currentPage={currentPage}
            />
          )}
        </section>
      )}
    </div>
  );
};
