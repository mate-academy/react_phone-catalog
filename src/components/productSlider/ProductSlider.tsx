import React, { useEffect, useMemo, useState } from 'react';
import { useResponseHook } from '../../hooks/useResponseHook';
import { Product } from '../../types/product';
import { Card } from '../card/Card';
import { Slider } from '../slider/Slider';
import './productSlider.scss';

type Props = {
  title: string,
  list: Product[]
};

export const Catalog:React.FC<Props> = ({ title, list }) => {
  const [step, setStep] = useState(-1);
  const [countProduct, setCountProduct] = useState(4);
  const width = useResponseHook();

  useEffect(() => {
    if (width > 1200) {
      setCountProduct(4);
    }

    if (width < 1200) {
      setCountProduct(3);
    }

    if (width < 768) {
      setCountProduct(2);
    }

    if (width < 540) {
      setCountProduct(1);
    }
  }, [width]);

  const renderSlider = useMemo(() => {
    if (list.length) {
      return (
        <Slider
          step={step}
          setStep={setStep}
          leftButton={(
            <div className="prev">
              <img src="./img/icons/Left.png" alt="prev" />
            </div>
          )}
          rightButton={
            (
              <div className="next">
                <img src="./img/icons/Right.png" alt="next" />
              </div>
            )
          }
          countElement={countProduct}
        >
          {list.map((product:Product) => (
            <Card
              product={product}
              key={product.age}
            />
          ))}
        </Slider>
      );
    }

    return '';
  }, [list, step, countProduct, width]);

  return (
    <div className="product">
      <div className="test">
        <h2 className="product-title">{title}</h2>
        <div className="wrapper-slider-product">
          {renderSlider}
        </div>
      </div>
    </div>
  );
};
