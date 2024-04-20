import { useContext } from 'react';
import { FilterProducts } from '../FilterProducts/FilterProducts';
import { Context } from '../../Store/Store';

export const Phone = () => {
  const { products } = useContext(Context);

  return (
    <div>
      <h1>Phone Page</h1>
      <FilterProducts products={products}></FilterProducts>
    </div>
  );
};
