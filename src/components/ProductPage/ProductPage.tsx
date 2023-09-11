import { Product } from '../../types/Product';
import { HistoryLocation } from '../HistoryLocation';
import { Loader } from '../Loader';
import { NoResult } from '../NoResults';
import { ProductList } from '../ProductList';

type Props = {
  isLoading: boolean,
  isError: boolean,
  products: Product[]
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
              <h1 className="products-page__title">
                {title}
              </h1>

              {!isLoading && !isError && (
                <ProductList
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
