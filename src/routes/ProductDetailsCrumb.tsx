import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProducts, selectProducts } from '../app/features/products';
import { useFetchedData } from '../hooks/useFetchedData';

type Props = { param: string };

export const ProductDetailsCrumb: FC<Props> = ({ param }) => {
  const { products } = useFetchedData(fetchProducts(), selectProducts);
  const id = useParams()[param];
  const foundProduct = products.find(product => product.itemId === id);

  if (!foundProduct) {
    return id;
  }

  return foundProduct.name;
};
