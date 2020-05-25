import React, { useState, useEffect } from 'react';
import './ProductsSlider.scss';
import { getProducts } from '../../helpers/api';

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

const ProductsSlider = () => {
  // const [selectedIdx, setSelectedIdx] = useState(0);
  const [position, setPosition] = useState(0);
  // const [products, setProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState<Slide[]>([]);

  const margin = 16;
  const widthBanner = 272 + margin;
  const widthCarousel = widthBanner * (hotProducts.length - 4);

  // useEffect(() => {
  //   getProducts().then(data => setProducts(data));
  // }, []);

  useEffect(() => {
    getProducts().then(data => setHotProducts(data.filter((product: Slide) => product.discount > 0)
      .sort((a: Slide, b: Slide) => a.discount - b.discount)));
  }, []);

  // const getHotPriceProducts = () => (
  //   setHotProducts(products.filter(product => product.discount > 0)
  //     .sort((a, b) => a.discount - b.discount))
  // );

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
      <h2>Hot prices</h2>
      <div className="container">
        <button
          type="button"
          className="Carousel__button btn-left"
          onClick={handlePrevOnClick}
        >
          Prev
        </button>
        <div className="Carousel container__carousel">
          <div
            style={{ transform: `translate(${position}px)` }}
            className="Carousel__list"
          >
            {hotProducts.map(slide => (
              <Item key={slide.id} {...slide} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="Carousel__button btn-right"
          onClick={handleNextOnClick}
        >
          Next
        </button>
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
        <span className="card__oldPrise">
          $
          {price}
        </span>
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
