import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../helpers/constants';

type Props = {
  products: Phone[];
};

export const ProductsList: React.FC<Props> = React.memo(({ products }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || DEFAULT_PAGE;
  const count = searchParams.get('perPage') || DEFAULT_PER_PAGE;
  const start = +page;
  const end = +count;

  return (
    <div className="phones phones--list" data-cy="productList">
      {products.slice(start * end - end, start * end).map(product => (
        <ProductCard card={product} key={product.id} />
      ))}
    </div>
  );
});
