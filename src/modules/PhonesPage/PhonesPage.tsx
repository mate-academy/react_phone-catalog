import { useContext, useEffect, useState } from 'react';
import { getPhones } from '../../shared/httpClient';
import { GlobalContext } from '../../GlobalContext';
import { Product } from '../../types/Product';
import { PageContent } from '../../components/PageContent';

export const PhonesPage = () => {
  const { dispatch } = useContext(GlobalContext);
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    dispatch({ type: 'START_LOADER' });

    getPhones()
      .then(setPhones)
      .finally(() => dispatch({ type: 'STOP_LOADER' }));
  }, [dispatch]);

  return (
    <div>
      <PageContent products={phones} title="Mobile phones" />
    </div>
  );
};
