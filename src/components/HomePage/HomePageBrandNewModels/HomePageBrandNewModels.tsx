import './HomePageBrandNewModels.scss';
import rawProducts from '../../../../public/api/products.json';
import { ProductCard } from '../../ProductCard/ProductCard';
import { useState } from 'react';
import { PhoneShort } from '../../../types/PhoneShort';

const products = rawProducts as PhoneShort[];

export const HomePageBrandNewModels = () => {
  const newestYear = Math.max(...products.map(p => p.year));

  const brandNewProducts = products
    .filter(p => p.year === newestYear)
    .slice(0, 12);

  const cardsPerView = 4;
  const [position, setPosition] = useState(0);
  const maxPosition = Math.max(brandNewProducts.length - cardsPerView, 0);

  const next = () => {
    setPosition(p => (p < maxPosition ? p + 1 : 0));
  };

  const prev = () => {
    setPosition(p => (p > 0 ? p - 1 : maxPosition));
  };

  return (
    <div className="brand">
      <div className="brand__header">
        <div className="brand__title">Brand new models</div>

        <div className="brand__arrows">
          <button className="brand__arrow" onClick={prev}>
            ‹
          </button>
          <button className="brand__arrow" onClick={next}>
            ›
          </button>
        </div>
      </div>

      <div className="brand__slider-window">
        <div
          className="brand__slider-track"
          style={{
            transform: `translateX(-${position * (100 / cardsPerView)}%)`,
          }}
        >
          {brandNewProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
