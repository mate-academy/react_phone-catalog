import { FC } from 'react';
import { selectProducts, useProducts } from '../app/features/products';
import { useParams } from 'react-router-dom';

type Props = { param: string };

export const ProductDetailsCrumb: FC<Props> = ({ param }) => {
  const { products } = useProducts(selectProducts);
  const id = useParams()[param];
  const foundProduct = products.find(product => product.itemId === id);

  if (!foundProduct) {
    return id;
  }

  return foundProduct.name;
};
