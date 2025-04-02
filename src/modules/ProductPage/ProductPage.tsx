import React, { useCallback, useEffect, useMemo, useState } from 'react';
import productPageStyles from './ProductPage.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../helpers/productHelper';
import { ProductList } from '../../components/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Pagination } from '../../components/Pagination';
import { getSearchWith, SearchParams } from '../../helpers/searchHelper';
import { Option } from '../../types/Option';
import { getNolmalizedTitle } from '../../helpers/stringHelper';
import { Loader } from '../../components/Loader';
import isEqual from 'lodash.isequal';
import { GoBack } from '../../components/GoBack';

const SORT_OPTIONS: Option[] = [
  { label: 'Newest', value: null },
  { label: 'Alphabetically', value: 'name' },
  { label: 'Cheapest', value: 'price' },
];
const PER_PAGE_OPTIONS: Option[] = [
  { label: 'All', value: null },
  { label: '4', value: 4 },
  { label: '8', value: 8 },
  { label: '16', value: 16 },
];

export const ProductPage = React.memo(() => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage')
    ? Number(searchParams.get('perPage'))
    : null;
  const currentPage = +(searchParams.get('page') || 1);
  const { category } = useParams();

  const updateProducts = useCallback(
    (newProducts: Product[]) => {
      if (!isEqual(products, newProducts)) {
        setProducts(newProducts);
      }
    },
    [products],
  );

  useEffect(() => {
    if (!category) {
      return;
    }

    setIsLoading(true);
    getProductsByCategory(category)
      .then(updateProducts)
      .finally(() => setIsLoading(false));
  }, [category, updateProducts]);

  const setSearchWith = useCallback(
    (params: SearchParams) => {
      setSearchParams(getSearchWith(searchParams, params));
    },
    [searchParams, setSearchParams],
  );

  const firstIndex = useMemo(
    () => (perPage ? (currentPage - 1) * perPage : 0),
    [currentPage, perPage],
  );

  const lastIndex = useMemo(
    () => (perPage ? firstIndex + perPage : products.length),
    [firstIndex, perPage, products],
  );

  const visibleProducts = useMemo(
    () =>
      [...products]
        .sort((product1, product2) => {
          switch (sort?.toLowerCase()) {
            case 'price':
              return product1.price - product2.price;

            case 'name':
              return product1.name.localeCompare(product2.name);

            default:
              return product2.year - product1.year;
          }
        })
        .slice(firstIndex, lastIndex),
    [products, sort, firstIndex, lastIndex],
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={productPageStyles.productPage}>
          <Breadcrumbs />
          <div className="">
            <h1 className={productPageStyles.productPage__title}>
              {getNolmalizedTitle(category)}
            </h1>
            <p
              className={productPageStyles.productPage__subtitle}
            >{`${products.length} models`}</p>
          </div>
          <div className={productPageStyles.productPage__products}>
            <div className={productPageStyles.productPage__dropdowns}>
              <Dropdown
                options={SORT_OPTIONS}
                label="Sort by"
                defaultValue={sort}
                onSelect={option =>
                  setSearchWith(
                    perPage ? { sort: option, page: 1 } : { sort: option },
                  )
                }
              />
              <Dropdown
                options={PER_PAGE_OPTIONS}
                label="Items on page"
                defaultValue={perPage}
                onSelect={option =>
                  setSearchWith(
                    !option
                      ? { page: null, perPage: option }
                      : { page: 1, perPage: option },
                  )
                }
              />
            </div>
            <ProductList products={visibleProducts} />
          </div>
          {perPage && (
            <Pagination
              totalProducts={products.length}
              perPage={perPage}
              currentPage={currentPage}
              maxVisiblePages={4}
              onPageChange={page => setSearchWith({ page: page.toString() })}
            />
          )}
        </section>
      )}
    </>
  );
});

ProductPage.displayName = 'ProductPage';
