import { useSliderClick } from '../../helpers/useSliderClick';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[] | null;
  topAmount: number;
  title: string,
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  topAmount,
  title,
}) => {
  const {
    currTransitionX,
    isLastImgs,
    staticContainer,
    dynamicContainer,
    rightSlide,
    leftSlide,
  } = useSliderClick();

  return (
    <div className="products-slider">
      <div className="products-slider__header">
        <h2 className="products-slider__title">{title}</h2>
        <button
          type="button"
          aria-label="Mute volume"
          className="
            products-slider__button-left
            icon-button
            icon-button--left"
          onClick={leftSlide}
          disabled={currTransitionX === 0}
        />
        <button
          type="button"
          aria-label="Mute volume"
          className="
            icon-button
            icon-button--right"
          onClick={rightSlide}
          disabled={isLastImgs}
        />
      </div>

      <div
        className="products-slider__static-container"
        ref={staticContainer}
      >
        <ul
          ref={dynamicContainer}
          className="products-slider__dynamic-container"
          style={{
            transform: `translateX(${-currTransitionX}px)`,
            transitionDuration: '1000ms',
          }}
        >
          {products?.slice(0, topAmount).map(product => (
            <li
              key={product.id}
              className="products-slider__item"
              data-cy="cardsContainer"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
