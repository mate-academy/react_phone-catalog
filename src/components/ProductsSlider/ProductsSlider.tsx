import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { sortProducts } from '../../helpers/sortHelper';
import { SortType } from '../../types/SortType';
import './productsSlider.scss';

export type Props = {
  products: Product[],
  title: string,
  sortBy: SortType,
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  sortBy,
}) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [transition, setTransition] = useState('');

  useEffect(() => {
    const sortedProducts = sortProducts(products, sortBy);

    setVisibleProducts(sortedProducts);
  }, [products]);

  const showPrevImage = () => {
    setStartIndex(prevIndex => prevIndex - 1);
  };

  const showNextImage = () => {
    setStartIndex(prevIndex => prevIndex + 1);
  };

  useEffect(() => {
    setTransition(`${startIndex * (-280)}px`);
  }, [startIndex]);

  const isFirstCard = () => {
    return startIndex === 0;
  };

  const isLastCard = () => {
    return startIndex === products.length - 4;
  };

  return (
    <div className="slider">
      <div className="slider__row">
        <h1 className="slider__title">{title}</h1>
        <div className="slider__nav">
          {/* eslint-disable-next-line */}
          <button
            className={classNames(
              'slider__button slider__button_prev',
              { disabled: isFirstCard() },
            )}
            type="button"
            onClick={showPrevImage}
          />
          {/* eslint-disable-next-line */}
          <button
            className={classNames(
              'slider__button slider__button_next',
              { disabled: isLastCard() },
            )}
            type="button"
            onClick={showNextImage}
          />
        </div>
      </div>
      <div className="slider__container">
        <div
          className="slider__cards"
          style={{ transform: `translateX(${transition})` }}
        >
          {visibleProducts.map((item: Product) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
