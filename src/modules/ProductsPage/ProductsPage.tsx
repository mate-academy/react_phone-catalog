import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { SortAndPaginationMenu } from '../../ui/SortAndPaginationMenu';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductList } from '../../components/ProductList';

import { DEFAULT_PAGE } from '../../constants/default-values';
import { getProducts } from '../../services/products';
import { Categories } from '../../types/Categories';
import { Product } from '../../types/Product';
import { Sorts, SortsType } from '../../types/Sorts';
import { capatalize } from '../../utils';

import { getSortedProducts } from '../../utils/getSortedProducts';
import styles from './PhonesPage.module.scss';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const sortQuery = searchParams.get('sort') || Sorts.age;
  const perPage = +(searchParams.get('perPage') || products.length);
  const currentPage = +(searchParams.get('page') || DEFAULT_PAGE);

  const sortedPhones = getSortedProducts(products, sortQuery as SortsType);

  const allItems = currentPage * perPage;
  const prevPage = (currentPage - 1) * perPage;

  const totalProducts = sortedPhones.slice(prevPage, allItems);

  useEffect(() => {
    setLoading(true);

    getProducts(category as Categories)
      .then(items => {
        setProducts(items);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [category]);

  return (
    <>
      <Breadcrumbs category={category} />

      <p className={styles.Title}>{category && capatalize(category)}</p>
      <p className={styles.Subtitle}>{products.length} models</p>

      {loading && <Loader />}

      {products.length ? (
        <>
          <SortAndPaginationMenu />

          <ProductList
            products={totalProducts}
            isHaveSlider={false}
            isHotPrice={true}
          />
          <Pagination
            total={products.length}
            perPage={perPage}
            defaultPage={DEFAULT_PAGE}
          />
        </>
      ) : (
        <p>Products not found</p>
      )}
    </>
  );
};
