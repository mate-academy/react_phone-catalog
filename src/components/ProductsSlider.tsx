/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { ProductCard } from './ProductCard';
import { Phone } from '../types/Phone';
import { SliderSizes } from '../types/SliderSizes';

type Props = {
  title: string;
  phones: Phone[];
  width: SliderSizes;
};

export const ProductSlider: React.FC<Props> = ({
  phones,
  title,
  width,
}) => {
  const [position, setPosition] = useState(0);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
  const start = 0;
  const end = width.items - phones.length;
  const step = width.element + width.interval;

  const sliderStyles = {
    transform: `translate(${position * step}px)`,
  };

  useEffect(() => {
    const timerId = setTimeout(() => setAreButtonsDisabled(false), 800);

    return () => clearTimeout(timerId);
  }, [position]);

  const isFwdDisabled = useMemo(() => {
    return position === end;
  }, [position]);
  const isBckDisabled = useMemo(() => {
    return position === start;
  }, [position]);

  const moveFwd = () => {
    setAreButtonsDisabled(true);
    if (position - width.items <= end) {
      setPosition(end);
    } else {
      setPosition(current => current - width.items);
    }
  };

  const moveBck = () => {
    setAreButtonsDisabled(true);
    if (position + width.items > start) {
      setPosition(start);
    } else {
      setPosition(current => current + width.items);
    }
  };

  return (
    <section className="product-slider">
      <div className="product-slider__heading">
        <div className="product-slider-title">
          <h1>{title}</h1>
        </div>
        <div className="slider-button">
          <button
            className={classNames(
              { 'slider-button__left': !isBckDisabled },
              { 'slider-button__left--disabled': isBckDisabled },
            )}
            type="button"
            disabled={areButtonsDisabled}
            onClick={() => moveBck()}
          />
          <button
            className={classNames(
              { 'slider-button__right': !isFwdDisabled },
              { 'slider-button__right--disabled': isFwdDisabled },
            )}
            type="button"
            disabled={areButtonsDisabled}
            onClick={() => moveFwd()}
          />
        </div>
      </div>
      <div className="product-slider__window">
        <ul
          className="product-slider-block"
          style={sliderStyles}
        >
          {phones.map(phone => (
            <li key={phone.id}>
              <ProductCard phone={phone} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
