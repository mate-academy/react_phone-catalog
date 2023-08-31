import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { ProductsList } from '../ProductsList';
import { NoResults } from '../NoResults';
import { Breadcrumbs } from '../Breadcrumbs';

import './ProductsPage.scss';

type Props = {
  category: string;
  fetchProducts: () => Promise<Product[]>;
};

export const ProductsPage: React.FC<Props> = ({ category, fetchProducts }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);

    fetchProducts()
      .then(setProducts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="ProductsPage">
      <div className="container container--with-min-height ">
        <div className="ProductsPage__content">
          <div className="ProductsPage__section">
            <Breadcrumbs />
          </div>

          <div className="ProductsPage__section">
            <h1 className="ProductsPage__title">{category}</h1>
            <p className="ProductsPage__amount">
              {`${products.length} model${products.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {isError ? (
            <h2 className="ProductsPage__error-title">
              Something went wrong
            </h2>
          ) : (
            <div className="ProductsPage__section">
              {isLoading && <Loader />}

              {!isLoading && (products.length === 0 ? (
                <NoResults category={category} />
              ) : (
                <ProductsList
                  products={products}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
