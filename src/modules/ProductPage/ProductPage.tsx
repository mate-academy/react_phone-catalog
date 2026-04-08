import React, { useCallback, useEffect, useState } from 'react';
import { CategoryTypes, Products } from '../../types/Types';
import style from './ProductPage.module.scss';
import { getCategoryProducts } from '../../api/products';
import { ProductList } from '../../components/ProductList';
import { Dropdown } from '../../components/ui/Icon/Dropdown';
import { PER_PAGE_OPTIONS, SORT_OPTION } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { Skeleton } from '../../components/Skeleton';
import { ErrorScreen } from '../../components/ErrorScreen';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  title: string;
  category: CategoryTypes[keyof CategoryTypes];
};

export const ProductPage: React.FC<Props> = ({ title, category }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || `${products.length}`;
  const query = searchParams.get('query');

  const fetchProducts = useCallback(async () => {
    setErrorMessage('');
    try {
      const data = await getCategoryProducts(category);

      setProducts(data);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sortedProducts = useCallback(() => {
    let callback: (a: Products, b: Products) => number;

    switch (sort) {
      case 'age':
        callback = (a, b) => b.year - a.year;
        break;
      case 'title':
        callback = (a, b) => a.name.localeCompare(b.name);
        break;
      default:
        callback = (a, b) => a.price - b.price;
    }

    const sorted = sort ? [...products].sort(callback) : products;

    if (query) {
      return sorted.filter(el =>
        el.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return sorted;
  }, [sort, products, query]);

  const totalCountItems = sortedProducts().length;

  const setCounItemsPerPage = () => {
    const sortedProds = [...sortedProducts()];
    const end = +page * +perPage;
    const start = end - +perPage;
    const visibleItemaPerPage = sortedProds.slice(start, end);

    return visibleItemaPerPage;
  };

  const visibleItems = setCounItemsPerPage();

  const isShowPagination = useCallback(() => {
    const countPages = Math.ceil(totalCountItems / +perPage);

    if (totalCountItems === 0 || countPages <= 1) {
      return false;
    }

    return true;
  }, [totalCountItems, perPage]);

  const categoryBreadcrumbs =
    category.toString().charAt(0).toUpperCase() + category.toString().slice(1);

  return (
    <div className={style.productPage}>
      <Breadcrumbs category={categoryBreadcrumbs} />
      {isLoading && <Skeleton />}

      {!isLoading && errorMessage && <ErrorScreen title={errorMessage} />}

      {products.length > 0 && !totalCountItems && (
        <ErrorScreen
          title={`There are no products matching the query ${query}`}
        />
      )}

      {!isLoading && !errorMessage && totalCountItems !== 0 && (
        <>
          <h1 className={style.productPage__title}>{title}</h1>
          <span
            className={style.productPage__countItems}
          >{`${totalCountItems} models`}</span>

          <div className={style.productPage__dropdownContainer}>
            <div className={style.productPage__wraperSort}>
              <Dropdown type="sort" label="Sort by" options={SORT_OPTION} />
            </div>

            <div className={style.productPage__wraperPage}>
              <Dropdown
                type="perPage"
                label="Items on page"
                options={PER_PAGE_OPTIONS}
              />
            </div>
          </div>

          <ProductList products={visibleItems} />

          <div className={style.productPage__pagination}>
            {isShowPagination() && <Pagination countItems={totalCountItems} />}
          </div>
        </>
      )}
    </div>
  );
};
