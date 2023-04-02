import { FC, useState, useMemo } from 'react';

import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

import {
  ProductsSliderButtons,
} from '../ProductsSliderButtons/ProductsSliderButtons';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: FC<Props> = ({ products, title }) => {
  const [firstElem, setFirstElem] = useState(0);

  const visibleProducts = useMemo(() => {
    return products.slice(firstElem, firstElem + 4);
  }, [firstElem]);

  return (
    <div className="products-slider container">
      <div className="products-slider__header">
        <h2 className="products-slider__title">{title}</h2>

        <ProductsSliderButtons
          products={products}
          firstElem={firstElem}
          setFirstElem={setFirstElem}
        />
      </div>

      <div className="products-slider__content">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
