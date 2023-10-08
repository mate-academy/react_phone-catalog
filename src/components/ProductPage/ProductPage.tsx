import { Product } from '../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Loader } from '../Loader';
import { NoResults } from '../NoResults/NoResult';
import { ProductsList } from '../ProductList/ProductList';

type Props = {
  isLoading: boolean,
  isError: boolean,
  products: Product[],
  title: string,
  category: string,
};

export const ProductPage: React.FC<Props> = ({
  isLoading,
  isError,
  products,
  title,
  category,
}) => {
  const loadPage = isLoading && !isError;
  const loaded = !isLoading && !isError;

  return (
    <section className="products-page">
      <div className="products-page__nav">
        <Breadcrumbs />
      </div>
      <div className="products-page__content">
        {loadPage ? (
          <Loader />
        ) : (
          <>
            {products.length > 0 ? (
              <>
                <h1 className="products-page__title">
                  {title}
                </h1>

                {loaded && (
                  <ProductsList
                    isLoading={isLoading}
                    isError={isError}
                    products={products}
                  />
                )}
              </>
            ) : (
              <NoResults category={category} />
            )}
          </>
        )}
      </div>
    </section>
  );
};
