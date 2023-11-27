import React from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';
import { ProductCard } from '../card/ProductCard';

type Props = {
  styles: string;
  products: Product[];
  updateFavourites?: () => void;
};

const ProductList: React.FC<Props> = ({
  products,
  styles,
  updateFavourites,
}) => {
  return (
    <div
      className={styles}
      data-cy="productList"
    >
      {products.map(product => (
        <Link
          to={product.itemId}
          key={product.id}
        >
          <ProductCard
            updateFavourites={updateFavourites}
            product={product}
            discount
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
