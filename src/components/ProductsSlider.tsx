import { useMemo, useState } from 'react';
import { useAppSelector } from '../utils/hooks/hooks';
import { Button } from './Button';
import { ProductCard } from './ProductCard';
import { ButtonType } from '../types/ButtonType';
import { ProductsCardType } from '../types/ProductsCardType';

import { getHotPriceProducts } from '../utils/helpers/getHotPriceProducts';
import { getBrandNewProducts } from '../utils/helpers/getBrandNewProducts';
import '../styles/blocks/productsSlider.scss';

type Props = {
  type: ProductsCardType;
};

export const ProductsSlider: React.FC<Props> = ({
  type,
}) => {
  const [position, setPosition] = useState(0);
  const { products } = useAppSelector((state) => state.products);

  const visibleProducts = useMemo(() => {
    return (
      (type === ProductsCardType.DISCOUNT && getHotPriceProducts(products))
      || (type === ProductsCardType.NEWBRANDS && getBrandNewProducts(products))
      || products
    );
  }, [products]);

  const maxPosition = Math.ceil(visibleProducts.length / 4) - 1;
  const cardWidth = 271.6;
  const gap = 16;
  const transform = `translateX(${-position * (cardWidth + gap)}px)`;

  return (
    <section className="section">
      <h2 className="section__title">{type}</h2>
      <div className="productsSlider">
        <div className="productsSlider__navigation">
          <Button
            content={ButtonType.ARROW}
            direction="left"
            disabled={position === 0}
            onClick={() => setPosition((pos) => pos - 1)}
          />
          <Button
            content={ButtonType.ARROW}
            onClick={() => setPosition((pos) => pos + 1)}
            disabled={position === maxPosition}
          />
        </div>
        <div className="productsSlider__slides">
          {visibleProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              transform={transform}
              type={type}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
