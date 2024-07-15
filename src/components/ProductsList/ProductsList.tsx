/* eslint-disable prettier/prettier */
import { ProductCard } from '../ProductCard';
import { Gadget } from '../../types/Gadget';

type Props = {
  products: Gadget[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {

  return (
    <>
      {products.map(product => (
        <ProductCard
          key={product.id}
          gadget={product}
        />
      ))}
    </>
  );
};
