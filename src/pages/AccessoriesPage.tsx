import React, { useEffect, useState } from 'react';
import { Accessory } from '../types/accessory';
import { List } from '../components/List';
import { ProductHome } from '../components/ProductHome/ProductHome';

export const AccessoriesPage = () => {
  const [accessoriesList, setAccessoriesList] = useState<Accessory[]>([]);

  useEffect(() => {
    fetch('/api/accessories.json')
      .then(response => response.json())
      .then(data => setAccessoriesList(data));
  }, []);

  return (
    <>
      <ProductHome product={accessoriesList} />

      <List products={accessoriesList} type="accessories" />
    </>
  );
};
