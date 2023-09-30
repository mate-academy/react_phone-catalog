/* eslint-disable import/no-cycle */
import React, {
  useContext, useEffect, useMemo,
  useState, memo,
} from 'react';
import { Context } from '../utils/Context';
import { ArrowButton, Card, Loader } from './index';
import { Product } from '../utils/types/Product';
import { createLoaderList } from '../utils/createLoaderList';
import { useDiviceSize } from '../utils/useDeviceSize/useDiviceSize';
import { Transition } from './IntersectionTransition';

type Props = {
  products: Product[],
  title: string,
};

export const Slider:React.FC<Props> = memo(({
  products,
  title,
}) => {
  const { SliderData } = useDiviceSize();
  const { step, items } = SliderData;
  const { isLoading } = useContext(Context);

  const [sliderPosition, setSliderPosition] = useState(-20);
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

  useEffect(() => setSliderPosition(0), [SliderData]);

  const loaderList = useMemo(() => createLoaderList(4)
    .map(() => <Loader />), []);

  return (
    <Transition>
      <section className="slider">
        <div className="slider__description">
          <h1 className="slider__title">{title}</h1>
          <nav className="slider__navigation">
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
          className="slider__content"
        >
          <div
            className="slider__list"
            style={{ marginLeft: sliderPosition }}
          >

            {isLoading
              ? loaderList
              : products.map(product => (
                <Card
                  key={product.id}
                  product={product}
                />
              ))}
          </div>

        </div>
      </section>
    </Transition>
  );
});
