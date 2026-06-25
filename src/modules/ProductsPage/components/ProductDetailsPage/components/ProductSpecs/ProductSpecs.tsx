import React from 'react';

type Product = {
  year: number;
  price: number;
  discount: number;
  colorsAvailable: string[];
  capacityAvailable: string[];
};

type Props = { product: Product };

export const ProductSpecs: React.FC<Props> = ({ product }) => {
  return (
    <section className="product-specs">
      <h2>Tech Specs</h2>
      <ul>
        <li>Year: {product.year}</li>
        <li>Price: R$ {product.price}</li>
        <li>Discount: R$ {product.discount}</li>
        <li>Colors available: {product.colorsAvailable.join(', ')}</li>
        <li>Capacity options: {product.capacityAvailable.join(', ')}</li>
      </ul>
    </section>
  );
};
