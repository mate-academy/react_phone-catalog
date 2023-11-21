import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import './ProductSlider.scss';

export const ProductSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  // const [leftside, setLeftside] = useState('');

  function getPriceProduct() {
    fetch('http://localhost:3000/_new/products.json')
      .then((response) => response.json())
      .then((productsFromServer) => setProducts(productsFromServer));

    return products
      .sort((a, b) => a.price - b.price);
  }

  useEffect(() => {
    getPriceProduct();
  }, []);

  function handleNextSlide() {
    setOffset(prevOffset => prevOffset + 1088);
    if (offset > 17408) {
      setOffset(0);
    }

    // eslint-disable-next-line no-console
    console.log(offset);
  }

  function handlePrevSlide() {
    const featureOffset = offset - 1088;

    if (featureOffset < 0) {
      setOffset(18496);
    } else {
      setOffset((prevOffset) => prevOffset - 1088);
    }

    // eslint-disable-next-line no-console
    console.log(offset);
  }

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
          <div className="slider__line" style={{ left: `${-offset}px` }}>
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
