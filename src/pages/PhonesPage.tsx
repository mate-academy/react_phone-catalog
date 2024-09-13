import React, { useEffect, useState } from 'react';
import { Phone } from '../types/phone';
import { List } from '../components/List';
import { ProductHome } from '../components/ProductHome/ProductHome';

export const PhonesPage = () => {
  const [phonesList, setPhonesList] = useState<Phone[]>([]);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(response => response.json())
      .then(data => setPhonesList(data));
  }, []);

  return (
    <>
      <ProductHome product={phonesList} />

      <List products={phonesList} type="phones" />
    </>
  );
};
