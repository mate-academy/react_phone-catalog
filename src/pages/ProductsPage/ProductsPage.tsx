import { useMemo } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import './ProductsPage.scss';

import { ProductsList } from '@/components/ProductsList';
import { DropdownSelect } from '@/components/DropdownSelect';
import { Pagintaion } from '@/components/Pagination';
import { NoSearchResults } from '@/components/NoSearchResults';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { NoResults } from '@/components/NoResults';
import { Loader } from '@/components/Loader';

import { calculateDiscount } from '@/helpers/calculateDiscount';
import { normalizeValue } from '@/helpers/normalizeValue';
import { ProductType } from '@/types/ProductType';
import { useGetProductsQuery } from '@/features/api/apiSlice';

enum SortValue {
  Age = 'age',
  Name = 'name',
  Price = 'price',
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
  const minimalItemsCount = 3;

  const title = {
    [ProductType.Phone]: 'Mobile phones',
    [ProductType.Tablet]: 'Tablets',
    [ProductType.Accessory]: 'Accessories',
  };
  const categoryName = {
    [ProductType.Phone]: 'phones',
    [ProductType.Tablet]: 'tablets',
    [ProductType.Accessory]: 'accessories',
  };

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
      case SortValue.Age:
        return copy.sort((a, b) => a.age - b.age);

      case SortValue.Name:
        return copy.sort((a, b) => a.name.localeCompare(b.name));

      case SortValue.Price:
        return copy
          .sort((a, b) => calculateDiscount(a) - calculateDiscount(b));

      default:
        return filteredProducts;
    }
  }, [sortBy, filteredProducts]);

  const totalItemsCount = sortedProducts.length;
  const itemsPerPage: { [key: string]: number } = {
    all: totalItemsCount,
    4: 4,
    16: 16,
    8: 8,
    '': 8,
  };

  const itemsFrom = useMemo(() => {
    return itemsPerPage[perPage] * currentPage - (itemsPerPage[perPage] - 1);
  }, [currentPage, perPage]);

  const itemsTo = useMemo(() => {
    return Math.min(itemsPerPage[perPage] * currentPage, totalItemsCount);
  }, [perPage, currentPage, totalItemsCount]);

  const visibleItems = useMemo(() => {
    return sortedProducts.slice(itemsFrom - 1, itemsTo);
  }, [sortBy, itemsFrom, itemsTo, sortedProducts]);

  return (
    <div className="ProductsPage container">
      <div className="ProductsPage__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="ProductsPage__title">
        <h1>{title[productType]}</h1>
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

      {!totalItemsCount && (
        query
          ? <NoSearchResults category={categoryName[productType]} />
          : !isLoading && <NoResults category={categoryName[productType]} />
        )}

      {isLoading
        ? <Loader />
        : (
          !!totalItemsCount && (
            <>
              <div className="ProductsPage__product-list">
                <ProductsList items={visibleItems} />
              </div>

              {totalItemsCount > minimalItemsCount && (
                <Pagintaion
                  total={totalItemsCount}
                  perPage={itemsPerPage[perPage]}
                  currentPage={currentPage}
                />
              )}
            </>
          )
        )}
    </div>
  );
};
