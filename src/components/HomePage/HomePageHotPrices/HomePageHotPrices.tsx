import './HomePageHotPrices.scss';
import rawProducts from '../../../../public/api/products.json';
import { ProductCard } from '../../ProductCard/ProductCard';
import { useState } from 'react';
import { PhoneShort } from '../../../types/PhoneShort';

const products = rawProducts as PhoneShort[];

const uniqueProducts: PhoneShort[] = [...products]
  .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
  .slice(0, 12);

export const HomePageHotPrices = () => {
  const cardsPerView = 4;
  const [position, setPosition] = useState(0);
  const maxPosition = Math.max(uniqueProducts.length - cardsPerView, 0);

  function next() {
    setPosition(prevvv => (prevvv < maxPosition ? prevvv + 1 : 0));
  }

  function prev() {
    setPosition(prevv => (prevv > 0 ? prevv - 1 : maxPosition));
  }

  return (
    <div className="hot">
      <div className="hot__header">
        <div className="hot__title">Hot prices</div>

        <div className="hot__arrows">
          <button className="hot__arrow" onClick={prev}>
            ‹
          </button>
          <button className="hot__arrow" onClick={next}>
            ›
          </button>
        </div>
      </div>

      <div className="hot__slider-window">
        <div
          className="hot__slider-track"
          style={{
            transform: `translateX(-${position * (100 / cardsPerView)}%)`,
          }}
        >
          {uniqueProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isDiscounted={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
