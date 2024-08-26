import { memo } from 'react';
import { Section } from '../../../../shared/ui/Section';
import { Product } from '../../model/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import cls from './productsList.module.scss';
import { ProductsCardSceleton } from '../ProductCard/ProductsCardSceleton';

interface Props {
  products: Product[];
  isLoading?: boolean;
  error?: boolean;
  lastSection?: boolean;
}

const getSceletons = () =>
  Array.from({ length: 4 }, (_, index) => index).map(item => (
    <ProductsCardSceleton key={item} />
  ));

export const ProductsList = memo((props: Props) => {
  const { products, isLoading, lastSection } = props;

  return (
    <Section lastSection={lastSection} className={cls.productsList}>
      <div className={cls.productsList__body}>
        {isLoading && getSceletons()}
        {!isLoading &&
          products &&
          products.map(item => <ProductCard key={item.id} cart={item} />)}
      </div>
    </Section>
  );
});
