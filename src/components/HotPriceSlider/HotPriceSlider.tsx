import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import './HotPriceSlider.scss';

export const HotPriceSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [leftside, setLeftside] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/products.json')
      .then((response) => response.json())
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);

  // eslint-disable-next-line no-console
  console.log('default offset', offset);

  function handleNextSlide() {
    setOffset(offset + 1088);

    if (offset > 1088) {
      setOffset(0);
    }

    setLeftside(`${-offset}px`);
    // eslint-disable-next-line no-console
    console.log('next', offset);
  }

  function handlePrevSlide() {
    setOffset(offset - 1088);
    if (offset < 1088) {
      setOffset(2176);
    }

    setLeftside(`${-offset}px`);
    // eslint-disable-next-line no-console
    console.log('prev', offset);
  }

  const hotPrices = products.filter(product => product.discount !== 0);

  return (
    <div className="slider">
      <div className="slider__top">
        <h1 className="slider__header">Hot prices</h1>
        <div className="slider__buttons">
          <button
            type="button"
            className="slider__button"
            onClick={handlePrevSlide}
          >
            {'<'}
          </button>
          <button
            type="button"
            className="slider__button"
            onClick={handleNextSlide}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className="slider__container">
        <div className="slider__slider">
          <div className="slider__line" style={{ left: leftside }}>
            {hotPrices.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
