/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getTablets } from '../../api/api';
import { GlobalContext } from '../../store';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { PageContent } from '../../components/PageContent';

export const TabletPage: React.FC = () => {
  const { isLoading, dispatch } = useContext(GlobalContext);
  const [tabletsList, setTabletsList] = useState<Product[]>([]);

  useEffect(() => {
    dispatch({ type: 'START_LOADER' });
    getTablets().then(setTabletsList)
      .finally(() => dispatch({ type: 'STOP_LOADER' }));
  }, []);

  return (
    <section className="tabletsPage">
      {isLoading && <Loader />}
      {!isLoading && (
        <PageContent
          title="Tablets"
          itemsList={tabletsList}
        />
      )}
    </section>
  );
};
