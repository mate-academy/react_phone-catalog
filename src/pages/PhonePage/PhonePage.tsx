/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getPhones } from '../../api/api';
import { GlobalContext } from '../../store';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { PageContent } from '../../components/PageContent';

export const PhonePage: React.FC = () => {
  const { isLoading, dispatch } = useContext(GlobalContext);
  const [phonesList, setPhonesList] = useState<Product[]>([]);

  useEffect(() => {
    dispatch({ type: 'START_LOADER' });

    getPhones().then(setPhonesList)
      .finally(() => dispatch({ type: 'STOP_LOADER' }));
  }, []);

  return (
    <section className="phonesPage">
      {isLoading && <Loader />}
      {!isLoading && (
        <PageContent
          title="Mobile phones"
          itemsList={phonesList}
        />
      )}
    </section>
  );
};
