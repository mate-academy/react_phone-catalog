import React, { useState } from 'react';
import './ProductsSlider.scss';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  displayType,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardWidth = 272; // ширина карточки
  const gap = 16; // расстояние между карточками
  const itemsPerPage = 4; // количество карточек на одной странице
  const trackStep = (cardWidth + gap) * itemsPerPage; // Шаг перемещения
  const maxIndex = Math.ceil(products.length / itemsPerPage) - 1;

  const handleNext = () => {
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="productsSlider">
      <div className="productsSlider__container-top">
        <h2 className="productsSlider__title">{title}</h2>
        <div className="productsSlider__buttons">
          <button
            className={`${!currentIndex ? 'productsSlider__button-disabled productsSlider__button-disabled--left' : 'productsSlider__button productsSlider__button--left'}`}
            onClick={handlePrev}
            disabled={!currentIndex}
          ></button>
          <button
            className={`${currentIndex === maxIndex ? 'productsSlider__button-disabled productsSlider__button-disabled--right' : 'productsSlider__button productsSlider__button--right'}`}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          ></button>
        </div>
      </div>

      <div className="productsSlider__viewport">
        <div
          className="productsSlider__track"
          style={{
            transform: `translateX(-${currentIndex * trackStep}px)`,
          }}
        >
          {products.map(phone => (
            <div key={phone.id} className="productsSlider__item">
              <ProductCard product={phone} displayType={displayType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
