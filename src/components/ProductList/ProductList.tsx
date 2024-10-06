import React from 'react';
import { Product } from '../../types/Product';
import './Productlist.scss';
import { ProductCard } from '../ProductCard';
import { useSearchParams } from 'react-router-dom';

type Props = {
  products: Product[];
  isLoading?: boolean;
};

export const Productlist: React.FC<Props> = ({
  products,
  isLoading = false,
}) => {
  const [searchParams] = useSearchParams();
  const perpage = searchParams.get('perpage') || '';
  const page = searchParams.get('page') || '';
  let currentproducts = products;

  if (page && perpage) {
    currentproducts = currentproducts.slice(
      (+page - 1) * +perpage,
      +page * +perpage,
    );
  }

  return (
    <div className="productlist">
      {currentproducts.map(product => (
        <ProductCard product={product} key={product.id} isLoading={isLoading} />
      ))}
    </div>
  );
};
