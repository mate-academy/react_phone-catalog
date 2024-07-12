import { useContext, useEffect, useState } from 'react';
import { getTablets } from '../../shared/httpClient';
import { GlobalContext } from '../../GlobalContext';
import { Product } from '../../types/Product';
import { PageContent } from '../../components/PageContent';

export const TabletsPage = () => {
  const { dispatch } = useContext(GlobalContext);
  const [tablet, setTablet] = useState<Product[]>([]);

  useEffect(() => {
    dispatch({ type: 'START_LOADER' });

    getTablets()
      .then(setTablet)
      .finally(() => dispatch({ type: 'STOP_LOADER' }));
  }, [dispatch]);

  return (
    <div>
      <h1>Tablet page</h1>
      <PageContent products={tablet} title="Tablets" />
    </div>
  );
};
