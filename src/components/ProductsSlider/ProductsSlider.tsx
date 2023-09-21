import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';

type Props = {
  sliderTitle: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ sliderTitle, products }) => {
  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__title-wrapper">
        <h2 className="ProductsSlider__title">{sliderTitle}</h2>

        <div className="ProductsSlider__buttons">
          <button
            type="button"
            aria-label="Previous"
            className="ProductsSlider__button ProductsSlider__button--previous"
          />

          <button
            type="button"
            aria-label="Next"
            className="ProductsSlider__button ProductsSlider__button--next"
          />
        </div>
      </div>

      <div className="ProductsSlider__slides-wrapper">
        <div className="ProductsSlider__slides">
          {products.map(product => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
