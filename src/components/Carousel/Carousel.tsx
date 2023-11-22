import { useState } from 'react';
import classNames from 'classnames';
import './Carousel.scss';

export const Carousel = () => {
  const [offset, setOffset] = useState(0);

  function handleNextSlide() {
    if (offset > 1040) {
      setOffset(0);
    } else {
      setOffset((prevOffset) => prevOffset + 1040);
    }
  }

  function handlePrevSlide() {
    const featureOffset = offset - 1040;

    if (featureOffset < 0) {
      setOffset(2080);
    } else {
      setOffset((prevOffset) => prevOffset - 1040);
    }
  }

  // eslint-disable-next-line no-console
  console.log(offset);

  return (
    <div className="carousel">
      <div className="carousel__body">
        <button
          className="carousel__button"
          type="button"
          onClick={handlePrevSlide}
        >
          {'<'}
        </button>
        <div className="carousel__slider">
          <div
            className="carousel__slider--line"
            style={{ left: `${-offset}px` }}
          >
            <img
              src="_new/img/banner-phones.png"
              alt="phones"
              className="carousel__slider--line-item"
            />
            <img
              src="_new/img/banner-tablets.png"
              alt=""
              className="carousel__slider--line-item"
            />
            <img
              src="_new/img/banner-accessories.png"
              alt=""
              className="carousel__slider--line-item"
            />
          </div>
          <div className="carousel__slider--pagination">
            <div className="carousel__slider--pagination-item active">.</div>
            <div className="carousel__slider--pagination-item">.</div>
            <div className="carousel__slider--pagination-item">.</div>
          </div>
        </div>
        <button
          className="carousel__button"
          type="button"
          onClick={handleNextSlide}
        >
          {'>'}
        </button>
      </div>

      <div className="carousel__pagination">
        <div
          className={classNames('carousel__pagination--item', {
            active: offset === 0,
          })}
        >
          .
        </div>
        <div
          className={classNames('carousel__pagination--item', {
            active: offset === 1040 && offset <= 2080,
          })}
        >
          .
        </div>
        <div
          className={classNames('carousel__pagination--item', {
            active: offset === 2080 && offset <= 3140,
          })}
        >
          .
        </div>
      </div>
    </div>
  );
};
