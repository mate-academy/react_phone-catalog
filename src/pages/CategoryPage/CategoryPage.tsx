import { useContext, useEffect } from 'react';
import { Context } from '../../components/Context';
import { ErrorNotification } from '../../components/ErrorNotification';
import { Loader } from '../../components/Loader';
import { PageNavStatus } from '../../components/PageNavStatus';
import { ProductsList } from '../../components/ProductsList';

export const CategoryPage: React.FC = () => {
  const { isLoading, error } = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading
        && <Loader />}

      {!isLoading
        && (
          <>
            <PageNavStatus />

            {!error && (
              <ProductsList />
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
