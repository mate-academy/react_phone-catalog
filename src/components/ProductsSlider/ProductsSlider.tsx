/* eslint-disable jsx-a11y/control-has-associated-label */
import { useMemo, useState } from 'react';
// eslint-disable-next-line max-len
import { getHotPriceProducts } from '../../helpers/funcService/getHotPriceProducts';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import { ProductCard } from '../ProductCard/ProductCard';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { Product } from '../../helpers/types/Product';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import './ProductsSlider.scss';

type ConditionProducts = {
  [key in ProductsCardType]: Product[];
};

type Props = {
  type: ProductsCardType
};

export const ProductsSlider: React.FC<Props> = ({ type }) => {
  const [position, setPosition] = useState(0);

  const { products } = useAppSelector(state => state.products);

  const visibleProducts = useMemo(() => {
    const conditionProducts: ConditionProducts = {
      [ProductsCardType.DISCOUNT]: getHotPriceProducts(products),
      [ProductsCardType.NEWBRANDS]: getHotPriceProducts(products), // getBrandNewProducts(products),
      [ProductsCardType.SIMILAR]: getHotPriceProducts(products), // products, filterBy, filterValue, getSuggestedProducts()
    };

    return conditionProducts[type];
  }, [type, products]);

  function moveLeft(): void {
    setPosition(() => position - 1);
  }

  function moveRight(): void {
    setPosition(() => position + 1);
  }

  const gap = 16;
  const cardWidth = 272;
  const maxPosition = visibleProducts.length - 4;

  const transform = `translateX(${-position * (cardWidth + gap)}px)`;

  return (
    <section className="productsSlider">
      <div className="productsSlider__top">
        <h2 className="productsSlider__title">{type}</h2>
        <div className="productsSlider__navigation">
          <button
            className="productsSlider__arrow"
            type="button"
            onClick={() => moveLeft()}
            disabled={position === 0}
          >
            <ArrowLeft color={position === 0 ? '#B4BDC4' : undefined} />
          </button>
          <button
            className="productsSlider__arrow"
            type="button"
            onClick={() => moveRight()}
            disabled={position === maxPosition}
          >
            <ArrowRight
              color={position === maxPosition ? '#B4BDC4' : undefined}
            />
          </button>
        </div>
      </div>

      <div className="productsSlider__slides">
        {visibleProducts.map((product) => (
          <ProductCard
            product={product}
            type={type}
            key={product.phoneId}
            transform={transform}
          />
        ))}
      </div>
    </section>
  );
};
