import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header';
import './PhonesPage.module.scss';
import { Productlist } from '../../components/ProductList';
import { Dropdowns } from '../../components/Dropdowns';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import React, { useEffect, useState } from 'react';
import { SortProducts } from '../../utils/sortProducts';
import { getProducts } from '../../utils/getProducts';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage';
import cn from 'classnames';

export const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setErrorMessage(false);
    setIsLoading(true);
    setReload(false);

    getProducts()
      .then(array => array.filter(product => product.category === 'phones'))
      .then(setProducts)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, [reload]);

  const showPage = !isLoading && !errorMessage;

  const currentproducts = SortProducts(products);

  const [searchParams] = useSearchParams();
  const perpage = searchParams.get('perpage') || '';
  const total = currentproducts.length;
  let totalPages = 0;

  if (perpage) {
    totalPages = Math.ceil(total / +perpage);
  }

  return (
    <div className="phonespage" id="phones">
      <Header search={true} />

      {isLoading && <Loader />}
      {errorMessage && <ErrorMessage reload={setReload} />}
      {showPage && (
        <div className={cn('container', { 'mb-container': perpage })}>
          <Breadcrumbs paragraph={'Phones'} />
          <h1 className="phonespage__title title">Mobile phones</h1>
          <p className="category__counter counter">{total} models</p>
          <Dropdowns />

          {currentproducts.length > 0 ? (
            <Productlist products={currentproducts} isLoading={isLoading} />
          ) : (
            <h1 className="emptylist__title">There are no phones yet</h1>
          )}

          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
      )}
      <Footer />
    </div>
  );
};
