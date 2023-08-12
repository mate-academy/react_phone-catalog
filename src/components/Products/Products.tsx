import { FC } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { SectionNames } from '../../types/SectionNames';

type Props = {
  sectionTitle: SectionNames;
  products: Product[];
};

export const ProductsList: FC<Props> = ({ sectionTitle, products }) => {
  return (
    <>
      {products.map(product => (
        <ProductCard
          key={product.id}
          sectionTitle={sectionTitle}
          product={product}
        />
      ))}
    </>
  );
};
