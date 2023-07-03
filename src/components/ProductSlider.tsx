import {
  useContext, useEffect, useMemo,
  useState,
} from 'react';
import { Context } from '../utils/Context';
import { ArrowButton, ProductCard, Loader } from './index';
import { Product } from '../utils/types/Product';
import { createLoaderList } from '../utils/createLoaderList';
import { useDiviceSize } from '../utils/useDiviceSize';

type Props = {
  products: Product[],
  title: string,
};

export const ProductSlider:React.FC<Props> = ({
  products,
  title,
}) => {
  const { productSliderData } = useDiviceSize();
  const { step, items } = productSliderData;
  const { isLoading } = useContext(Context);

  const [sliderPosition, setSliderPosition] = useState(0);
  const minPosition = 0;
  const maxPosition = (-step * (products.length / items) + step);
  const handleChangeProsition = (num : number) => {
    if ((sliderPosition + num) < maxPosition) {
      setSliderPosition(maxPosition);
    } else if ((sliderPosition + num) > minPosition && num > 0) {
      setSliderPosition(minPosition);
    } else {
      setSliderPosition(prev => prev + num);
    }
  };

  useEffect(() => setSliderPosition(0), [productSliderData]);

  const loaderList = useMemo(() => createLoaderList(4)
    .map(() => <Loader />), []);

  return (
    <section className="product-slider">
      <div className="product-slider__description">
        <h1 className="product-slider__title">{title}</h1>
        <nav className="product-slider__navigation">
          <ArrowButton
            type="left"
            stop={sliderPosition === minPosition}
            onChangePosition={() => handleChangeProsition(step)}
          />
          <ArrowButton
            type="right"
            stop={sliderPosition === maxPosition}
            onChangePosition={() => handleChangeProsition(-step)}
          />
        </nav>
      </div>
      <div
        className="product-slider__content"
        style={{ marginLeft: sliderPosition }}
      >
        {isLoading
          ? loaderList
          : products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>

    </section>
  );
};
