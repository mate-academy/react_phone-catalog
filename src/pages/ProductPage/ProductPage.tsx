import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { getProducts } from '@api/productsApi';
import { ProductType } from 'types/productTypes';
import { ProductCard } from '@components/ProductCard';
import { Dropdown } from '@components/Dropdown';
import { Pagination } from '@components/Pagination';
import { sortProducts } from '@utils/sortProducts';
import { getCategoryTitle } from '@utils/getCategoryTitle';
import { updateParams } from '@utils/updateParams';
import { Loader } from '@components/Loader';

import cn from 'classnames';
import styles from './ProductPage.module.scss';

interface ProductPageProps {
  category: string;
}

export const ProductPage: React.FC<ProductPageProps> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultPage = 1;
  const defaultPerPage = 'All';
  const defaultSort = 'Newest';

  const currentPage = Number(searchParams.get('page')) || defaultPage;
  const perPage = searchParams.get('perPage') || defaultPerPage;
  const sort = searchParams.get('sort') || defaultSort;

  const totalProducts = products.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getProducts();

        setProducts(fetchedProducts);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(
    product => product.category === category,
  );

  const sortedProducts = sortProducts(filteredProducts, sort);

  const itemsPerPage =
    perPage === 'All' ? totalProducts : Number(perPage) || totalProducts;

  const totalPages =
    perPage === 'All' ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    updateParams(
      setSearchParams,
      { page },
      { page: currentPage, perPage, sort },
    );
  };

  const title = getCategoryTitle(category);

  return (
    <section className={cn(styles.product_page, 'section')}>
      <Breadcrumbs />

      <div className={styles.product_page__content}>
        <h1 className={cn(styles.product_page__content_title, 'main-title')}>
          {title}
        </h1>

        <p className={styles.product_page__content_total}>
          {sortedProducts.length} items
        </p>

        <div className={styles.product_page__filters}>
          <Dropdown
            options={['Newest', 'Alphabetically', 'Cheapest']}
            selected={sort}
            onChange={value =>
              updateParams(
                setSearchParams,
                { sort: value },
                { page: currentPage, perPage, sort },
              )
            }
          />

          <Dropdown
            options={['4', '8', '16', 'All']}
            selected={perPage}
            onChange={value =>
              updateParams(
                setSearchParams,
                { perPage: value },
                { page: currentPage, perPage, sort },
              )
            }
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ul className={styles.product_page__list}>
          {currentProducts.map(product => (
            <li key={product.id} className={styles.product_page__item}>
              <ProductCard card={product} />
            </li>
          ))}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </section>
  );
};
