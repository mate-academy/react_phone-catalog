/* eslint-disable max-len */
import { useMemo, useState } from 'react';

import './ProductsSlider.scss';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import { getHotPriceProducts } from '../../helpers/functionService/getHotPrices';
import { Button } from '../Button/Button';
import { ButtonType } from '../../helpers/types/ButtonType';
import { getBrandNewProducts } from '../../helpers/functionService/getBrandNewProducts';
import { getSuggestedProducts } from '../../helpers/functionService/getSuggestedPruducts';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { Product } from '../../helpers/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  type: ProductsCardType;
  filterBy?: keyof Product;
  filterValue?: string | number;
};

export const ProductsSlider: React.FC<Props> = ({
  type,
  filterBy,
  filterValue,
}) => {
  const [position, setPosition] = useState(0);
  const { products } = useAppSelector((state) => state.products);

  const visibleProducts = useMemo(() => {
    const conditionProducts = {
      [ProductsCardType.DISCOUNT]: getHotPriceProducts(products),
      [ProductsCardType.NEWBRANDS]: getBrandNewProducts(products),
      [ProductsCardType.SIMILAR]: getSuggestedProducts(
        products, filterBy, filterValue,
      ),
    };

    return conditionProducts[type];
  }, [type, filterBy, filterValue, products]);

  const maxPosition = Math.ceil(visibleProducts.length / 4) - 1;
  const cardWidth = 272;
  const gap = 16;
  const transform = `translateX(${-position * (cardWidth + gap)}px)`;

  return (
    <section className="productsSlider__section">
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
            direction="right"
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
