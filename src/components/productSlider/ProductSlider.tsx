import React, { useEffect, useRef, useState } from 'react';
import { useResponseHook } from '../../hooks/useResponseHook';
import { Product } from '../../types/product';
import { Card } from '../card/Card';
import './productSlider.scss';

type Props = {
  title: string,
  list: Product[]
};

export const Catalog:React.FC<Props> = ({ title, list }) => {
  const [stepWidth, setStepWidth] = useState(0);
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const width = useResponseHook();

  useEffect(() => {
    if (ref.current && step !== 0) {
      if (width > 1200) {
        setStepWidth(ref.current.getBoundingClientRect().width + 16);
      } else {
        setStepWidth(ref.current.getBoundingClientRect().width);
      }
    }
  }, [ref, step, width]);

  useEffect(() => {
    setStep(0);
  }, [width]);

  const next = () => {
    if (width < 768) {
      if (step < list.length - 1) {
        setStep(step + 1);
      }
    } else if (step < Math.floor(list.length / 4) - 1) {
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="product">
      <div className="managment">
        <h2>{title}</h2>
        <div className="managment__buttons">
          <button
            type="button"
            className="managment__buttons__button"
            onClick={prev}
          >
            <img src="../../img/icons/Left.png" alt="left" />
          </button>
          <button
            type="button"
            className="managment__buttons__button"
            onClick={next}
          >
            <img src="../../img/icons/Right.png" alt="right" />
          </button>
        </div>
      </div>
      <div className="product-slider" ref={ref}>
        {list.map((product:Product) => (
          <Card
            product={product}
            move={step * -(stepWidth)}
            key={product.age}
          />
        ))}
      </div>
    </div>
  );
};
