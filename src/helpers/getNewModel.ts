import { Product } from '../Types/Product';

export const getNewModel = (products:Product[]) => {
  const newModel = [...products]
    .filter(product => !product.discount)
    .sort((a, b) => b.price - a.price);

  return newModel;
};
