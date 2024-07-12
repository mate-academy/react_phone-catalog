import { useContext, useEffect, useState } from 'react';
import { getAccessories } from '../../shared/httpClient';
import { GlobalContext } from '../../GlobalContext';
import { Product } from '../../types/Product';
import { PageContent } from '../../components/PageContent';

export const AccessoriesPage = () => {
  const { dispatch } = useContext(GlobalContext);
  const [accessory, setAccessory] = useState<Product[]>([]);

  useEffect(() => {
    dispatch({ type: 'START_LOADER' });

    getAccessories()
      .then(setAccessory)
      .finally(() => dispatch({ type: 'STOP_LOADER' }));
  }, [dispatch]);

  return (
    <div>
      <h1>Accessories page</h1>
      <PageContent products={accessory} title="Accessories" />
    </div>
  );
};
