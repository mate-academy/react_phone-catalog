import { FC, useState, useRef } from 'react';
import './ProductsSlider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
  sliderTitle: string;
};

export const ProductsSlider: FC<Props> = ({ products, sliderTitle }) => {
  // console.log(sliderTitle, products);

  const [activeArrowLeft, setActiveArrowLeft] = useState(false);
  const [activeArrowRight, setActiveArrowRight] = useState(true);
  const slider = useRef<HTMLUListElement>(null);
  const cell = useRef<HTMLLIElement>(null);
  let sliderItemWidth = 0;

  if (cell.current) {
    sliderItemWidth = cell.current.offsetWidth;
  }

  const goLeft = () => {
    if (slider.current) {
      setActiveArrowRight(true);
      const currentScroll = slider.current.scrollLeft;

      slider.current.scrollTo(currentScroll - sliderItemWidth - 16, 0);
      if (currentScroll - sliderItemWidth <= 0) {
        setActiveArrowLeft(false);
      }
    }
  };

  const goRight = () => {
    if (slider.current) {
      const currentScroll = slider.current.scrollLeft;
      const maxScroll = slider.current.scrollWidth - slider.current.offsetWidth;

      slider.current.scrollTo(currentScroll + sliderItemWidth + 16, 0);
      setActiveArrowLeft(true);
      if (currentScroll + sliderItemWidth >= maxScroll) {
        setActiveArrowRight(false);
      }
    }
  };

  return (
    <div className="products-slider">
      <div className="products-slider__top">
        <h3 className="products-slider__title">{sliderTitle}</h3>
        <div className="products-slider__nav">
          <button
            className="products-slider__button products-slider__button--left"
            type="button"
            onClick={goLeft}
            disabled={!activeArrowLeft}
            aria-label="slider move left"
          />
          <button
            className="products-slider__button products-slider__button--right"
            type="button"
            onClick={goRight}
            disabled={!activeArrowRight}
            aria-label="slider move right"
          />
        </div>
      </div>
      <ul className="products-slider__list" ref={slider}>
        {products.map(product => {
          return (
            <li className="catalog-grid__cell" key={product.id} ref={cell}>
              <ProductCard item={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
