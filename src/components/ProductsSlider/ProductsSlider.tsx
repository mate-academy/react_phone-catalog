import './ProductsSlider.scss';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import LeftArrowIcon from '../../assets/icons/Chevron (Arrow Left).svg';
import RightArrowIcon from '../../assets/icons/Chevron (Arrow Right).svg';
import { ProductDetailShort } from '../../types/ProductDetailShort';
import { useState } from 'react';

interface Props {
  products: ProductDetailShort[];
  title: string;
}

const VISIBLE_PRODUCTS = 4;

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, products.length - VISIBLE_PRODUCTS);

  function handlePrev() {
    setCurrentIndex(index => Math.max(0, index - 1));
  }

  function handleNext() {
    setCurrentIndex(index => Math.min(maxIndex, index + 1));
  }

  return (
    <div className="NewModels grid--sub">
      <div className="NewModels-title-container">
        <h2 className="NewModels-title">{title}</h2>
        <div className="NewModels-title-Buttons">
          <button
            className="NewModels-title-Button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous products"
          >
            <img src={LeftArrowIcon} alt="" />
          </button>
          <button
            className="NewModels-title-Button"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label="Next products"
          >
            <img src={RightArrowIcon} alt="" />
          </button>
        </div>
      </div>

      <div className="NewModels-viewport">
        <div
          className="NewModels-track"
          style={{
            transform: `translateX(calc(-${currentIndex * 25}% - ${currentIndex * 4}px))`,
          }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
