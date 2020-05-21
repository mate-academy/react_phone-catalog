
import React from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../interfaces';

export const Catalog = ({visibleProducts}: {visibleProducts: Product[]}) => {

  return (
    <>
    <h1>Mobile phones</h1>
    <div>
    {visibleProducts.map((product:Product) => {
      return (
        <ProductCard product={product} />
      )
    })}
    </div>
    {/* <Pagination /> */}
    </>
  )
}

