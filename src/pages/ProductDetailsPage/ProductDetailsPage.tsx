import { useContext } from 'react';
import { BackButton } from '../../components/BackButton';
import { Context } from '../../components/Context';
import { ErrorNotification } from '../../components/ErrorNotification';
import { Loader } from '../../components/Loader';
import { PageNavStatus } from '../../components/PageNavStatus';
import { ProductDetails } from '../../components/ProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider';

export const ProductDetailsPage: React.FC = () => {
  const { isLoading, error } = useContext(Context);

  return (
    <>
      {isLoading
        && <Loader />}

      {!isLoading
        && (
          <>
            <PageNavStatus />

            <BackButton />

            {!error && (
              <>
                <ProductDetails />

                <ProductsSlider
                  type="recommendations"
                />
              </>
            )}

            {error && (
              <ErrorNotification
                error={error}
              />
            )}
          </>
        )}
    </>
  );
};
