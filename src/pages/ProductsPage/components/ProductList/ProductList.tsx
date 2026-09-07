import React from 'react';
import { useStateContext } from '../../../../state/state';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loader } from '../../../../components/Loader';
import { Product } from '../../../../types';
import './ProductList.scss';
import { Pages } from '../../../../enums';

type Props = {
  products?: Product[];
  sort?: (a: Product, b: Product) => number;
};

export const ProductList: React.FC<Props> = ({ products, sort }) => {
  const { state } = useStateContext();

  if (state.loading) {
    return <Loader />;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  let productsToRender = products;

  if (sort) {
    productsToRender = state.products.sort(sort);
  }

  return (
    <ul className="product-list">
      {productsToRender?.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          page={Pages.ProductsPage}
        />
      ))}
    </ul>
  );
};
