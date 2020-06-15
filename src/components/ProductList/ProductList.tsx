import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

import './ProductList.scss';

type Props = { products: Product[] };

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="ProductCard">
      <ul className="ProductCard__list">
        {products.map(product => (
          <li className="ProductCard__item" key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
