import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './PhonesPage.scss';
import { Product } from '../../types/Product';
import { getPhones } from '../../api/productsApi';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import { SelectSortBy } from '../../components/SelectSortBy';
import { Filter } from '../../helpers/Filters';
import { SelectItems } from '../../components/SelectItems';
import { BreadCrambs } from '../../components/BreadCrambs';

export const PhonesPage: React.FC = () => {
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
    getPhones()
      .then(setProducts)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="productPage">
      <BreadCrambs />
      <h1 className="productPage__title">Mobile phones</h1>
      {isLoading && <Loader />}
      {!isLoading && isError && (
        <p>
          Error: Unable to load data from server!
        </p>
      )}
      {!isLoading && !isError && (
        <div className="productPage__content">
          <p className="productPage__amount">
            {`${products.length} models`}
          </p>
        </div>
      )}

      {!!products.length && (
        <div className="productPage__select">
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
