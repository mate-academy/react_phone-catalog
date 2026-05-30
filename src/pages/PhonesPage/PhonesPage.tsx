/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { ProductsPageContent } from '../../components/ProductsPageContent';
import { Product } from '../../types/Product';
import { GeneralContext } from '../../helpers/GeneralContext';
import { getPhones } from '../../api/api';

export const PhonesPage: React.FC = () => {
  const { setIsLoading } = useContext(GeneralContext);
  const [phonesList, setPhonesList] = useState<Product[]>([]);

  useEffect(() => {
  setIsLoading(true);

  getPhones()
    .then(setPhonesList)
    .catch(error => {
      console.error("Error fetching phones:", error);
    })
    .finally(() => {
      setIsLoading(false);
    });
}, []);
  
  return (
    <section className="phonesPage">
      <ProductsPageContent
        type="Phones"
        title="Mobile phones"
        itemsList={phonesList}
      />
    </section>
  );
};
