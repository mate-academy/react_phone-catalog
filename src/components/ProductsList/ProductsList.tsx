import { FC } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { SectionName } from '../../types/SectionName';

type Props = {
  sectionTitle?: SectionName;
  products: Product[];
};

export const ProductsList: FC<Props> = ({
  sectionTitle = SectionName.RandomProducts,
  products,
}) => {
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

ProductsList.defaultProps = {
  sectionTitle: SectionName.RandomProducts,
};
