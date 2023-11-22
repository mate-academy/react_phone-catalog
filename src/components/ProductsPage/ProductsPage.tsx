import './ProductsPage.scss';
import { ProductsList } from '../ProductsList/ProductsList';
import { Loader } from '../Loader';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { NoResult } from '../NoResult/NoResult';

type Props = {
  isLoading: boolean,
  isError: boolean,
  products: Product[]
  category: string,
  title: string,
};

export const ProductsPage: React.FC<Props> = ({
  isLoading,
  isError,
  products,
  category,
  title,
}) => {
  return (
    <section className="products-page">
      <div className="products-page__nav">
        <Breadcrumbs />
      </div>
      <div className="products-page__content">
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
                  <ProductsList
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
};
