import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getAmountOfProducts } from '../api/products';
import { ProductsList } from '../components/ProductsList';
import { ProductCategory } from '../types/products';

interface Props {
  type: ProductCategory;
}

const getTitle = (type: ProductCategory) => {
  switch (type) {
    case 'phones':
      return 'Mobile phones';
    case 'accessories':
      return 'Accessories';
    case 'tablets':
      return 'Tablets';

    default:
      return '';
  }
};

export const ProductPage: React.FC<Props> = ({ type }) => {
  const [productsAmount, setProductsAmount] = useState({
    accessories: 0,
    phones: 0,
    tablets: 0,
  });

  useEffect(() => {
    getAmountOfProducts().then(setProductsAmount);
  }, []);

  return (
    <main
      className="content-padding flex w-full flex-col gap-6
      pb-16 pt-6 md:gap-10"
    >
      <Breadcrumbs />

      <div className="flex flex-col gap-2">
        <h1>{getTitle(type)}</h1>
        <p className="text-secondary">{`${productsAmount[type]} models`}</p>
      </div>

      <ProductsList type={type} />
    </main>
  );
};
