import { useState, useEffect } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { Loader } from '../Loader';
import { NoResults } from '../NoResults';
import { ProductsList } from '../ProductsList';
import './ProductsPage.scss';

type Props = {
  title: string,
  fetchProducts: FetchProductsType,
};

export const ProductsPage:React.FC<Props> = ({
  title,
  fetchProducts,
}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(productsFromSever => {
        setProducts(productsFromSever);
        setLoading(false);
      })
      .catch(err => setError(err));
  }, []);

  return (
    <div className="products-page">
      <div className="container container--with-min-height">
        <div className="products-page__content">
          <section className="products-page__section">
            <Breadcrumbs />
          </section>
          <section className="products-page__section">
            <h1 className="main-title products-page__title">
              {title}
            </h1>
            <div className="amount-subtitle">
              {`${products.length} products`}
            </div>
          </section>
          <section className="products-page__section">
            {loading && <Loader />}
            {!loading && (products.length === 0 ? (
              <NoResults />
            ) : (
              <ProductsList
                products={products}
              />
            ))}
            {error && `The following error occured: ${error}`}
          </section>
        </div>
      </div>
    </div>
  );
};
