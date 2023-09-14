import { Product } from '../../types/Product';
import { HistoryLocation } from '../../components/HistoryLocation';
import { Loader } from '../../components/Loader';
import { NoResult } from '../../components/NoResults';
import { List } from '../../components/Product/List';

import './ProductPage.scss';

type Props = {
  isLoading: boolean,
  isError: boolean,
  products: Product[],
  category: string,
  title: string,
};

export const ProductPage: React.FC<Props> = ({
  isLoading,
  isError,
  products,
  category,
  title,
}) => (
  <section className="product-page">
    <nav className="product-page__nav">
      <HistoryLocation />
    </nav>

    <div className="product-page__content">
      {isLoading && !isError ? (
        <Loader />
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <h1 className="products-page--title">
                {title}
              </h1>

              {!isLoading && !isError && (
                <List
                  isLoading={isLoading}
                  isError={isError}
                  products={products}
                />
              )}
            </>
          ) : (
            <NoResult category={category} />
          )}
        </>
      )}
    </div>
  </section>
);
