import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdowns } from '../../components/Dropdowns';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header';
import { Productlist } from '../../components/ProductList';
import { SortProducts } from '../../utils/sortProducts';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/getProducts';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage';
import cn from 'classnames';

export const TabletsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    setReload(false);

    getProducts()
      .then(array => array.filter(product => product.category === 'tablets'))
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [reload]);

  const showPage = !isLoading && !error;

  const currentproducts = SortProducts(products);

  const [searchParams] = useSearchParams();
  const perpage = searchParams.get('perpage') || '';
  const total = currentproducts.length;
  let totalPages = 0;

  if (perpage) {
    totalPages = Math.ceil(total / +perpage);
  }

  return (
    <div className="tabletspage" id="tablets">
      <Header search={true} />
      {isLoading && <Loader />}
      {error && <ErrorMessage reload={setReload} />}
      {showPage && (
        <div className={cn('container', { 'mb-container': perpage })}>
          <Breadcrumbs paragraph={'Tablets'} />
          <h1 className="tabletspage__title title">Tablets</h1>
          <p className="category__counter counter">
            {currentproducts.length} models
          </p>
          <Dropdowns />

          {currentproducts.length > 0 ? (
            <Productlist products={currentproducts} isLoading={isLoading} />
          ) : (
            <h1 className="emptylist__title">There are no tablets yet</h1>
          )}
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
      )}
      <Footer />
    </div>
  );
};
