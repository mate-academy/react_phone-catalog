import React from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';
import classNames from 'classnames';

interface Props {
  componentTitle: string;
}

export const ProductSliderSkeleton: React.FC<Props> = ({ componentTitle }) => {
  const { isDark } = React.useContext(DarkModeContext);

  return (
    <div className="carousel">
      <div className="carousel__top">
        <h2
          className={classNames('title title--h2', {
            'title--is-Dark': isDark,
          })}
        >
          {componentTitle}
        </h2>
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
