import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductsFilters } from '../../components/ProductsFilters';
import { ProductsList } from '../../components/ProductsList';
import { useProducts } from '../../store/ProductsContext';
import { Category } from '../../types/Category';
import { SortTypes } from '../../types/SortTypes';
import styles from './ProductPages.module.scss';

interface Props {
  category: Category;
}

export const ProductPages: React.FC<Props> = ({ category }) => {
  const { title, name } = category;
  const { products, loading } = useProducts();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const currentPage = searchParams.get('page') || '';
  const prePage = searchParams.get('prePage') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => product.category === name);
  }, [products, name]);

  const sortedProducts = useMemo(() => {
    const updatedProducts = [...filteredProducts];

    if (sort === SortTypes.Price) {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === SortTypes.Title) {
      updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      updatedProducts.sort((a, b) => b.year - a.year);
    }

    return updatedProducts;
  }, [filteredProducts, sort]);

  const slicedProducts = useMemo(() => {
    let updatedProducts = [...sortedProducts];

    const end = (+currentPage || 1) * +prePage;
    const start = end - +prePage;

    updatedProducts = updatedProducts.slice(start, end);

    return updatedProducts;
  }, [currentPage, prePage, sortedProducts]);

  const quantity = sortedProducts.length;

  return (
    <div className={styles['product-pages']}>
      <Breadcrumbs />
      <div className={styles['product-pages__content']}>
        <div className={styles['product-pages__header']}>
          <h1 className={styles['product-pages__title']}>{title}</h1>
          <p className={styles['product-pages__info']}>
            {quantity + ' models'}
          </p>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className={styles['product-pages__products']}>
            <ProductsFilters
              searchParams={searchParams}
              sort={sort}
              prePage={prePage}
            />

            <ProductsList
              products={+prePage ? slicedProducts : sortedProducts}
            />
          </div>
        )}

        <div className={styles['product-pages__pagination']}>
          <Pagination
            searchParams={searchParams}
            total={quantity}
            prePage={!isNaN(+prePage) && +prePage !== 0 ? +prePage : quantity}
            currentPage={
              !isNaN(+currentPage) && +currentPage !== 0 ? +currentPage : 1
            }
          />
        </div>
      </div>
    </div>
  );
};
