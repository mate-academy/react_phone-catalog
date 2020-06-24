import React from 'react';
import ProductCard from '../ProductCard/ProductCard';


type Props = { products: Product[] };

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="ProductCard">
      <ul className="ProductCard__list">
        {products.map(product => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
