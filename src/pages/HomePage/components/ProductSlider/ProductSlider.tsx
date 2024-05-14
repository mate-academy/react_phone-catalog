import './ProductSlider.scss';
import { useState } from 'react';
import { ProductGeneral } from '../../../../types/ProductGeneral';
import { ProductCard } from '../../../../components/Product';
import { Errow } from './components/Errow';

type Props = {
  products: ProductGeneral[];
  step: number;
};

export const ProductSlider: React.FC<Props> = ({ products, step }) => {
  const [displayIndex, setDisplayIndex] = useState(0);

  const onClickRight = () => {
    setDisplayIndex(prevIndex => prevIndex + 1);
  };

  const onClickLeft = () => {
    setDisplayIndex(prevIndex => prevIndex - 1);
  };

  const getDisplayedProducts = (
    step1: number,
  ): { product: ProductGeneral; isVisible: boolean }[] =>
    products.map((product, index) => {
      const startIndex = displayIndex - 1;
      const endIndex = displayIndex + step1;

      const isVisible = index >= startIndex && index <= endIndex;

      return { product, isVisible };
    });

  return (
    <section>
      <div className="slider__header">
        <h2 className="title--2">Brand new models</h2>
        <div className="slider__buttons">
          <button
            className="slider__button"
            onClick={onClickLeft}
            disabled={displayIndex <= 0}
          >
            <Errow />
          </button>
          <button
            className="slider__button"
            onClick={onClickRight}
            disabled={displayIndex >= products.length - 1}
          >
            <Errow />
          </button>
        </div>
      </div>

      <div className="slider__container">
        {getDisplayedProducts(step).map(({ product, isVisible }) => (
          <ProductCard
            productItem={product}
            key={product.name}
            displayIndex={displayIndex}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
};
