import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../store';
import { Product } from '../../types/Product';
import { getAccessories } from '../../api/api';
import { Loader } from '../../components/Loader';
import { PageContent } from '../../components/PageContent';

export const AccessoriesPage = () => {
  const { isLoading, dispatch } = useContext(GlobalContext);
  const [accessoriesList, setAccessoriesList] = useState<Product[]>([]);

  useEffect(() => {
    dispatch({ type: 'START_LOADER' });
    getAccessories().then(setAccessoriesList)
      .finally(() => dispatch({ type: 'STOP_LOADER' }));
  }, [dispatch]);

  return (
    <section className="accessories">
      {isLoading && <Loader />}

      {!isLoading && (
        <PageContent
          title="Accessories"
          itemsList={accessoriesList}
        />
      )}
    </section>
  );
};
