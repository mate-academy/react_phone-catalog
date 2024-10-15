// import { useEffect, useState } from 'react';
// import { Product } from '../../types/Product';
// import { getProductsByCategory } from '../../servises/products';
import { Breadcrumbs } from '../../components/breadcrumbs';

export const PhonesPage = () => {
  // const [phones, setPhones] = useState<Product[]>([]);

  // useEffect(() => {
  //   getProductsByCategory('phone').then(setPhones);
  // }, []);

  return (
    <div>
      PhonesPage
      <Breadcrumbs />
    </div>
  );
};
