import React, { RefObject } from 'react';

import { PhoneCard } from '../PhoneCard';

import { Phone } from '../../types/Phone';

type Props = {
  title: string;
  onLeftClick: () => void;
  onRightClick: () => void;
  isLeftButtonDisabled: boolean;
  isRightButtonDisabled: boolean;
  reference: RefObject<HTMLDivElement>;
  translate: number;
  products: Phone[];
};

export const SliderContent: React.FC<Props> = ({
  title,
  onLeftClick,
  onRightClick,
  isLeftButtonDisabled,
  isRightButtonDisabled,
  reference,
  translate,
  products,
}) => {
  return (
    <>
      <div className="slider__panel">
        <h2 className="slider__title">
          {title}
        </h2>

        <div className="slider__buttons">
          <button
            className="slider__button slider__button--left"
            type="button"
            aria-label="Left button"
            onClick={onLeftClick}
            disabled={isLeftButtonDisabled}
          />

          <button
            className="slider__button slider__button--right"
            type="button"
            aria-label="Right button"
            onClick={onRightClick}
            disabled={isRightButtonDisabled}
          />
        </div>
      </div>

      <div
        className="slider__track-container"
        ref={reference}
      >
        <div
          className="slider__track"
          style={{ transform: `translate(${translate}px)` }}
        >
          {products.map(product => {
            return (
              <PhoneCard
                product={product}
                key={product.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
