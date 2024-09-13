import React, { useEffect, useState } from 'react';
import { Tablet } from '../types/tablet';
import { List } from '../components/List';
import { ProductHome } from '../components/ProductHome/ProductHome';

export const TabletsPage = () => {
  const [tabletsList, setTabletsList] = useState<Tablet[]>([]);

  useEffect(() => {
    fetch('/api/tablets.json')
      .then(response => response.json())
      .then(data => setTabletsList(data));
  }, []);

  return (
    <>
      <ProductHome product={tabletsList} />

      <List products={tabletsList} type="tablets" />
    </>
  );
};
