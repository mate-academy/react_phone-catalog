import React, { useState } from 'react';
import './ProductsSlider.scss';
// import { getProducts } from '../../helpers/api';
// import { getHotProducts } from '../../helpers/api';

interface Slide {
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
  id: string;
}
type ProductsSliderProps = {
  title: string;
  visibleProducts: Slide[];
};

const ProductsSlider: React.FC<ProductsSliderProps> = ({ visibleProducts, title }) => {
  const [position, setPosition] = useState(0);
  const margin = 16;
  const widthBanner = 272 + margin;
  const widthCarousel = widthBanner * (visibleProducts.length - 4);

  const handlePrevOnClick = () => {
    if (position === 0) {
      setPosition(-widthCarousel);
    } else {
      setPosition(position + widthBanner);
    }
  };

  const handleNextOnClick = () => {
    setPosition(position - widthBanner);
    if (-position > widthCarousel - widthBanner) {
      setPosition(0);
    }
  };

  return (
    <div className="wrapper">
      <h2>{title}</h2>
      <div className="container">
        <button
          type="button"
          className="Carousel__button btn-left"
          aria-label="Mute volume"
          onClick={handlePrevOnClick}
        />
        <div className="Carousel container__carousel">
          <div
            style={{ transform: `translate(${position}px)` }}
            className="Carousel__list"
          >
            {visibleProducts.map(product => (
              <Item key={product.id} {...product} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="Carousel__button btn-right"
          aria-label="Mute volume"
          onClick={handleNextOnClick}
        />
      </div>
    </div>
  );
};

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
};

const Item: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  discount,
  screen,
  capacity,
  ram,
}) => (
  <div className="wrap">
    <article className="card">
      <img alt="card" src={imageUrl} className="card__img" />
      <div className="card__container-inner">
        <h3 className="card__title">{name}</h3>
        <span className="card__prise">
          $
          {(price - price * (discount / 100))}
        </span>
        {' '}
        {discount !== 0
         && (
           <span className="card__oldPrise">
             $
             {price}
           </span>
         )}

        <div className="card__info">
          <div className="card__info-screen card__item">
            <p className="card__info-screen_name">Screen</p>
            <p className="card__info-screen_value">{screen}</p>
          </div>
          <div className="card__info-capacity card__item">
            <p className="card__info-screen_name">Capacity</p>
            <p className="card__info-screen_value">{capacity}</p>
          </div>
          <div className="card__info-ram card__item">
            <p className="card__info-screen_name">RAM</p>
            <p className="card__info-screen_value">{ram}</p>
          </div>
        </div>
        <div className="card__button-wrap">
          <button
            type="button"
            className="card__button-cart"
          >
            Add to cart
          </button>
          <button
            type="button"
            className="card__button-favor"
          >
            favor
          </button>
        </div>
      </div>
    </article>
  </div>
);

export default ProductsSlider;
