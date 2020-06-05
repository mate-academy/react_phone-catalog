import React, { useState } from 'react';
import './ProductsSlider.scss';
import classNames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';
import ProductCard from '../ProductCard/ProductCard';

type Props = {
  preparedPhones: Item[];
  article: string;
};

const ProductsSlider: React.FC<Props> = ({ preparedPhones, article }) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [itemOnPage, setItemOnPage] = useState(4);

  const moveToNext = () => {
    if (itemIndex !== preparedPhones.length - 4) {
      setItemIndex(itemIndex + 1);
    }
  };

  const moveToPrev = () => {
    if (itemIndex !== 0) {
      setItemIndex(itemIndex - 1);
    }
  };

  const onResize = (width: number) => {
    if (width > 1100) {
      setItemOnPage(4);
    } else if (width >= 620) {
      setItemOnPage(2);
    } else if (width < 620) {
      setItemOnPage(1);
    }
  };

  return (
    <section className="productsSlider">
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <div className="productsSlider__header">
        <h2 className="productsSlider__article">{article}</h2>
        <div className="productsSlider__button">
          <button
            type="button"
            className={classNames('productsSlider__button-prev', { disabled: itemIndex === 0 })}
            id="prevProduct"
            onClick={moveToPrev}
          >
            {itemIndex === 0
              ? <img src="./img/ArrowRight.svg" alt="arrow" className="pagination__arrow" />
              : <img src="./img/ArrowRightActive.svg" alt="arrow" className="pagination__arrow" />}
          </button>
          <button
            type="button"
            className={classNames('productsSlider__button-next', { disabled: itemIndex === preparedPhones.length - itemOnPage })}
            id="nextProduct"
            onClick={moveToNext}
          >
            {itemIndex === preparedPhones.length - itemOnPage
              ? <img src="./img/ArrowRight.svg" alt="next" />
              : <img src="./img/ArrowRightActive.svg" alt="next" />}
          </button>
        </div>
      </div>
      <div className="productsSlider__cards">
        <div
          className="carousel-small"
          style={{ width: `${itemOnPage * 288}px` }}
        >
          <ul
            className="carousel-small__list"
            style={{
              transform: `translateX(-${itemIndex * 288}px)`,
              transition: `transform ${500}ms`,
            }}
          >
            {preparedPhones.map((phone: Item) => (
              <li key={phone.id}>
                <ProductCard phone={phone} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductsSlider;
