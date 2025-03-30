import React from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';

interface Props {
  componentTitle: string;
}

export const ProductSliderSkeleton: React.FC<Props> = ({ componentTitle }) => {
  return (
    <div className="carousel">
      <div className="carousel__top">
        <h2 className="title title--h2">{componentTitle}</h2>

        <div className="carousel__buttons">
          <button
            className="
            carousel__button carousel__button--left carousel__button--skeleton
            "
          />

          <button
            className="
            carousel__button carousel__button--right carousel__button--skeleton
            "
          />
        </div>
      </div>

      <div className="carousel__container">
        <div className="carousel__card-set">
          <div className="carousel__card-container">
            <ProductCardSkeleton />

            <ProductCardSkeleton />

            <ProductCardSkeleton />

            <ProductCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
