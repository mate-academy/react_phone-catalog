import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import './Accessories.scss';
import { BreadCrambs } from '../../components/BreadCrambs';
import { Filter } from '../../helpers/Filters';
import { getAccessories } from '../../api/productsApi';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { NoResult } from '../../components/NoResults';
import { SelectSortBy } from '../../components/SelectSortBy';
import { SelectItems } from '../../components/SelectItems';
import { ProductList } from '../../components/ProductList';
import { Pagination } from '../../components/Pagination';

export const AccessoriesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const filteredProducts = useMemo(() => {
    return Filter(products, searchParams);
  }, [products, searchParams]);
  const total = filteredProducts.length;
  const currentPage = +(searchParams.get('page') || '1');
  const perPage = +(searchParams.get('perPage') || '') || total;
  const pagesAmount = Math.ceil(total / perPage);
  // const query = searchParams.get('query' || '');

  const firstItem = (currentPage * +perPage) - perPage;
  const lastItem = (perPage * currentPage) < total
    ? perPage * currentPage
    : total;

  const currentItems = useMemo(() => {
    return filteredProducts.slice(firstItem, lastItem);
  }, [filteredProducts, firstItem, lastItem]);

  useEffect(() => {
    setIsLoading(true);
    getAccessories()
      .then(setProducts)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="accessoriesPage">
      <BreadCrambs />
      <h1 className="accessoriesPage__title">Accessories</h1>
      {isLoading && <Loader />}
      {!products.length && !isLoading && <NoResult />}

      {!isLoading && !isError && products.length > 0 && (
        <div className="accessoriesPage__content">
          <p className="accessoriesPage__amount">
            {`${products.length} models`}
          </p>
        </div>
      )}

      {products.length > 0 && (
        <div className="accessoriesPage__select">
          <SelectSortBy />
          <SelectItems />
        </div>

      )}

      {currentItems.length ? (
        <ProductList products={currentItems} />
      ) : (
        (!!searchParams.toString().length && (
          <p className="NoSearchResults">
            No search results...
          </p>
        ))
      )}

      {!!filteredProducts.length && pagesAmount !== 1 && (
        <Pagination
          currentPage={currentPage}
          pageAmount={pagesAmount}
        />
      )}
    </div>
  );
};
