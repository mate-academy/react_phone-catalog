import { useEffect, useMemo, useState } from 'react';
import s from './ProductsPageLayout.module.scss';
import { getProductByCategory } from '../../services/dataService';
import { useSearchParams } from 'react-router-dom';
import { Products } from '../../types/Product';
import { Loader } from '../../shared/components/Loader/Loader';
import { ProductFilters } from '../ProductFilters/ProductFilters';
import { ProductsList } from '../ProductsList/ProductsList';
import { Pagination } from '../Pagination/Pagination';
import { getSearchWith } from '../../utils/searchHelper';
import { ReloadButton } from '../ReloadButton/ReloadButton';

type AllProduct = 'phones' | 'tablets' | 'accessories';

type Props = {
  type: AllProduct;
  pageTitle: string;
};

export const ProductsPageLayout: React.FC<Props> = ({ type, pageTitle }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError('');
    getProductByCategory(type)
      .then(setProducts)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, [type, reload]);

  const perPageParam = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';

  const filterProducts = useMemo(() => {
    const normalizeQuery = query.toLowerCase().trim();

    return products.filter((product) => product.name.toLowerCase().includes(normalizeQuery));
  }, [query, products]);

  const visibleProductsCount = filterProducts.length;

  const productsCount = products.length;

  const perPage = perPageParam === 'all' ? visibleProductsCount : Number(perPageParam);

  const sortedProducts = useMemo(() => {
    return [...filterProducts].sort((product1, product2) => {
      switch (sortBy) {
        case 'age':
          return product2.year - product1.year;

        case 'title':
          return product1.name.localeCompare(product2.name);

        case 'price':
          return product1.price - product2.price;
        default:
          return 0;
      }
    });
  }, [sortBy, filterProducts]);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  const handleReset = () => {
    setSearchParams((prevParams) => {
      return getSearchWith(prevParams, { query: null });
    });
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>{pageTitle}</h1>

      {loading && <Loader />}

      {!loading && error && (
        <ReloadButton
          title="Something went wrong"
          onChange={() => setReload(!reload)}
          buttonName="Reload"
        />
      )}

      {!loading && !error && productsCount === 0 && <p>There are no {type} yet</p>}

      {!loading && !error && productsCount > 0 && visibleProductsCount === 0 && (
        <ReloadButton
          title={`There are no ${type} products matching the query`}
          onChange={handleReset}
          buttonName="Reset"
        />
      )}

      {!loading && !error && productsCount > 0 && visibleProductsCount > 0 && (
        <>
          <div className={s.counter}>{query ? visibleProductsCount : productsCount} models</div>
          <ProductFilters />
          <ProductsList products={visibleProducts} />
          {visibleProductsCount > perPage && (
            <Pagination total={visibleProductsCount} currentPage={currentPage} perPage={perPage} />
          )}
        </>
      )}
    </div>
  );
};
