import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCards } from '../../../../ProductCards/ProductCards';
import products from '../../../../../new/products.json';
import './HotPrice.scss';
import ArrowImage from './HotPriceImage/Arrow.svg';

const titleForComponent = 'Hot prices';

export const HotPrices = () => {
  const filteredProducts = products.filter((product) => product.price <= 500);
  const [startIndex, setStartIndex] = useState(0);
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + 4);
  const maxIndex = filteredProducts.length - 1;

  const nextSlide = () => {
    if (startIndex < maxIndex) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="container">
      <div className="containerForjcsb">
        <h1 className="title-forHotPrice">{titleForComponent}</h1>
        <div className="lastchildForContainer">
          <div
            className={`arrow-left-container ${startIndex === 0 ? 'disabled' : ''}`}
            onClick={prevSlide}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                prevSlide();
              }
            }}
          >
            <Link to="/">
              <img
                src={ArrowImage}
                className="arrow-left-container__image"
                alt=""
              />
            </Link>
          </div>
          <div
            className="arrow-right-container"
            onClick={nextSlide}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                nextSlide();
              }
            }}
          >
            <Link to="/">
              <img
                src={ArrowImage}
                className="arrow-right-container__image"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="block-for-card">
        <div className="card-slider">
          {visibleProducts.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
