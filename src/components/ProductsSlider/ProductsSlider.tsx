/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './products-slider.scss';

type Props = {
  title?: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [transform, setTransform] = useState(0);

  const widthOneCard = 288;
  const maxTransform = products.length * widthOneCard - widthOneCard * 4;

  const handleLeftShift = () => {
    setTransform((prev) => prev + widthOneCard);
  };

  const handleRightShift = () => {
    setTransform((prev) => prev - widthOneCard);
  };

  return (
    <section className="page__section">
      <div className="promo__top">
        <h1 className="promo__title">{title}</h1>
        <div className="promo__control">
          <button
            className="promo__button prev icon"
            type="button"
            onClick={handleRightShift}
            disabled={transform === 0}
          />
          <button
            className="promo__button next icon"
            type="button"
            onClick={handleLeftShift}
            disabled={transform === maxTransform}
          />
        </div>
      </div>

      <ul
        className="product-slider__list"
        style={{ transform: `translateX(-${transform}px)` }}
      >
        {products.map(product => (
          <li className="product-slider__item" key={product.id}>
            <ProductCard
              product={product}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
