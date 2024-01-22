import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { TypeCard } from '../../types/TypeCard';
import './HomePage.scss';

interface T {
  phones: TypeCard[]
}

export const HomePage: React.FC<T> = ({ phones }) => {
  const [scrollImgPosition, setScrollImgPosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const discountedPhones = phones.filter(phone => (
    phone.fullPrice - phone.price) > 0)
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));

  const NewPhones = phones.filter(phone => !(phone.fullPrice - phone.price))
    .sort((a, b) => b.price - a.price);

  const imgWidth = 1040;

  const itemWidth = 272 + 16;

  const scrollPositionRight = (value: string) => {
    switch (value) {
      case 'img': {
        const newPosition = scrollImgPosition - imgWidth;

        setScrollImgPosition(newPosition);
      }

        break;
      case 'discounted': {
        const newPosition = scrollPosition - itemWidth;

        setScrollPosition(newPosition);
      }

        break;
      default:
        break;
    }
  };

  const scrollPositionLeft = (value: string) => {
    switch (value) {
      case 'img': {
        const newPosition = scrollImgPosition + imgWidth;

        setScrollImgPosition(newPosition);
      }

        break;

      case 'discounted': {
        const newPosition = scrollPosition + itemWidth;

        setScrollPosition(newPosition);
      }

        break;
      default:
        break;
    }
  };

  const categoryImg = [
    {
      img: '_new/img/category-phones.png',
      name: 'Mobile phones',
      count: 95,
    },
    {
      img: '_new/img/category-tablets.png',
      name: 'Tablets',
      count: 24,
    },
    {
      img: '_new/img/category-accessories.png',
      name: 'Accessories',
      count: 100,
    },
  ];

  return (
    <div className="Home-page">
      <div className="Slider">
        <button
          type="button"
          onClick={() => scrollPositionLeft('img')}
        >
          left
        </button>
        <div
          className="Slider__list"
          style={{
            transform: `translateX(${scrollImgPosition}px)`,
            transition: `transform ${1000}ms ease`,
          }}
        >
          <img
            className="Slider__img"
            src="_new/img/banner-phones.png"
            alt="banner-phones"
          />
          <img
            className="Slider__img"
            src="_new/img/banner-tablets.png"
            alt="banner-tablets"
          />
          <img
            className="Slider__img"
            src="_new/img/banner-accessories.png"
            alt="banner-accessories"
          />
        </div>
        <button
          type="button"
          onClick={() => scrollPositionRight('img')}
        >
          right
        </button>
      </div>

      <div
        className="Hot-prices"
        style={{
          width: `${4 * itemWidth}px`,
        }}
      >
        <div className="top-container">
          <h1>Hot prices</h1>

          <div className="top-container__movement">
            <button
              type="button"
              onClick={() => scrollPositionLeft('discounted')}
              disabled={scrollPosition + itemWidth > 0}
            >
              left
            </button>
            <button
              type="button"
              onClick={() => scrollPositionRight('discounted')}
              disabled={
                scrollPosition - itemWidth
                < -((discountedPhones.length - 4) * itemWidth)
              }
            >
              right
            </button>
          </div>
        </div>

        <div
          data-cy="cardsContainer"
          className="cardsContainer"
        >
          <ul
            className="cardsContainer__list"
            style={{
              transform: `translateX(${scrollPosition}px)`,
              transition: `transform ${1000}ms ease`,
            }}
          >
            {discountedPhones.map(card => (
              <li className="cardsContainer__item">
                <ProductCard key={card.id} card={card} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-cy="categoryLinksContainer" className="Category">
        <h1>Shop by category</h1>
        <div>
          <ul data-cy="categoryLinksContainer">
            {categoryImg.map(({ img, name, count }) => (
              <li className="Category__item">
                <Link to="/phones">
                  <img
                    className="Category__img"
                    src={img}
                    alt={name}
                  />
                </Link>

                <div className="Category__description">
                  <h3 className="Category__name">{name}</h3>
                  <p className="Category__count">{`${count} models`}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="New-models">
        <h1>Brand new models</h1>
        <div data-cy="cardsContainer" className="cardsContainer">
          {NewPhones.map(card => (
            <ProductCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};
