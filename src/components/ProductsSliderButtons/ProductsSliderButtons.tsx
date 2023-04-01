import { FC } from 'react';
import { ArrowLeft } from '../ArrowLeft/ArrowLeft';
import { ArrowRight } from '../ArrowRight/ArrowRight';
import { Product } from '../../types/Product';
import {
  ProductsSliderButton,
} from '../ProductSliderButton/ProductSliderButton';

type Props = {
  products: Product[];
  firstElem: number;
  setFirstElem: (elem: number) => void;
};

export const ProductsSliderButtons: FC<Props> = ({
  products,
  firstElem,
  setFirstElem,
}) => {
  const handleClickLeft = () => {
    let value = firstElem - 4;

    if (value < 0) {
      value = 0;
    }

    setFirstElem(value);
  };

  const handleClickRight = () => {
    let value = firstElem + 4;

    if (value > products.length - 4) {
      value = products.length - 4;
      if (value < 0) {
        value = 0;
      }
    }

    setFirstElem(value);
  };

  const isLeft = firstElem > 0;

  const isRight = firstElem < products.length - 5;

  return (
    <div className="products-slider__buttons">
      <ProductsSliderButton
        isActive={isLeft}
        onHandleClick={handleClickLeft}
        title={<ArrowLeft />}
      />

      <ProductsSliderButton
        isActive={isRight}
        onHandleClick={handleClickRight}
        title={<ArrowRight />}
      />
    </div>
  );
};
