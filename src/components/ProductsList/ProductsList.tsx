import { useState } from 'react';

import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';

import './ProductsList.scss';

type ProductsListProps = {
  products: Product[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

export const ProductsList = ({ products, setLoading }: ProductsListProps) => {
  const [counter, setCounter] = useState(products.length - 1);

  const onLoad = () => {
    setCounter((prevCounter) => prevCounter - 1);

    if (counter === 0) {
      setLoading(false);
    }
  };

  return (
    <>
      <ul
        className="products-list"
        data-cy="productList"
      >
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard onLoad={onLoad} product={product} />
          </li>
        ))}
      </ul>
    </>
  );
};
