import './productPage.scss';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults/NoResult';
import { ProductsList } from '../../components/ProductList/ProductList';

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
