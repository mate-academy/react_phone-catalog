import { useEffect } from 'react';
import { Products } from './components/Products/Products';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  subtitle: string;
  sortBy: string;
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  fetchData: () => void;
};

export const ProductsPage: React.FC<Props> = ({
  title,
  subtitle,
  sortBy,
  products,
  isLoading,
  isError,
  fetchData,
}) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <h1 className="page-title">{title}</h1>
        <div className="page-subtitle">{subtitle}</div>
        {isLoading && <Loader />}
        {isError && (
          <>
            <h1 className="ErrorMessage">Something went wrong</h1>
            <button className="ReloadButton" onClick={fetchData}>
              Reload
            </button>
          </>
        )}
        {!isLoading && !isError && products.length === 0 && (
          <div className="ErrorMessage">{`There are no ${sortBy} yet`}</div>
        )}
        {!isLoading && !isError && (
          <Products products={products} sortBy={sortBy} />
        )}
      </div>
    </>
  );
};
