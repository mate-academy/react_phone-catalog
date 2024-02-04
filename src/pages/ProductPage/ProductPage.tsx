import './ProductPage.scss';
import { Product } from '../../types/Product';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { Loader } from '../../components/Loader/Loader';
import { NoResults } from '../../components/NoResult/NoResult';
import { ProductsList } from '../../components/ProductList/ProductList';

type Props = {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
  title: string;
  category: string;
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
        <BreadCrumbs />
      </div>

      <div className="products-page__content">
        {isLoading && !isError ? (
          <Loader />
        ) : (
          <>
            {products.length > 0 ? (
              <>
                <h1 className="products-page__title">{title}</h1>

                {!isLoading && !isError && <ProductsList products={products} />}
              </>
            ) : (
              <NoResults category={category} />
            )}
          </>
        )}
        {isError && !isLoading && (
          <p>{`Cannot find a ${category} for you, try it later...`}</p>
        )}
      </div>
    </section>
  );
};
