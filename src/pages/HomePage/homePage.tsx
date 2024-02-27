import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './HomePage.scss';
import { useAppSelector } from '../../store';

// interface T {
//   phones: TypeCard[]
// }

export const HomePage = () => {
  const phones = useAppSelector(
    (state) => state.phones.items,
  );

  const [scrollImgPosition, setScrollImgPosition] = useState(0);
  const [scrollPositionHot, setScrollPositionHot] = useState(0);
  const [scrollPositionBrand, setScrollPositionBrand] = useState(0);

  const discountedPhones = phones.filter(phone => (
    phone.fullPrice - phone.price) > 0)
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));

  const findLastYear = () => {
    let lastYear = 0;
    const phonesYears = [];

    for (let i = 1; i < phones.length; i += 1) {
      phonesYears.push(phones[i].year);
    }

    for (let i = 1; i < phonesYears.length; i += 1) {
      if (phonesYears[i] > lastYear) {
        lastYear = phonesYears[i];
      }
    }

    return lastYear;
  };

  const newPhones = phones.filter(phone => phone.year === findLastYear())
    .sort((a, b) => b.price - a.price);

  const imgWidth = 1040 + 48;

  const itemWidth = 272 + 16;

  const scrollPositionRight = (value: string) => {
    switch (value) {
      case 'img': {
        const newPosition = scrollImgPosition - imgWidth;

        setScrollImgPosition(newPosition);
      }

        break;
      case 'discounted': {
        const newPosition = scrollPositionHot - itemWidth;

        setScrollPositionHot(newPosition);
      }

        break;
      case 'brand': {
        const newPosition = scrollPositionBrand - itemWidth;

        setScrollPositionBrand(newPosition);
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
        const newPosition = scrollPositionHot + itemWidth;

        setScrollPositionHot(newPosition);
      }

        break;
      case 'brand': {
        const newPosition = scrollPositionBrand + itemWidth;

        setScrollPositionBrand(newPosition);
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
      count: `${phones.length}`,
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
        <div className="Slider__main">
          <button
            type="button"
            className={classNames('Slider__button', {
              disabled: scrollImgPosition >= 0,
            })}
            onClick={() => scrollPositionLeft('img')}
          >
            <img src="/img/ArrowLeft.png" alt="ArrowLeft" />
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
            className={classNames('Slider__button', {
              disabled: scrollImgPosition < -imgWidth,
            })}
          >
            <img src="/img/ArrowRight.png" alt="ArrowRight" />
          </button>
        </div>

        <div className="Slider__line-list">
          <div className={classNames('Slider__line', {
            active: scrollImgPosition === 0,
          })}
          />
          <div className={classNames('Slider__line', {
            active: scrollImgPosition === -imgWidth,
          })}
          />
          <div className={classNames('Slider__line', {
            active: scrollImgPosition === -imgWidth * 2,
          })}
          />
        </div>
      </div>

      <div
        className="Hot-prices container"
        style={{
          width: `${4 * itemWidth - 16}px`,
        }}
      >
        <div className="top-container">
          <h1>Hot prices</h1>

          <div className="top-container__movement">
            <button
              type="button"
              disabled={scrollPositionHot + itemWidth > 0}
              onClick={() => scrollPositionLeft('discounted')}
              className={classNames('top-container__button', {
                disabled: scrollPositionHot + itemWidth > 0,
              })}
            >
              <img src="/img/ArrowLeft.png" alt="ArrowLeft" />
            </button>
            <button
              type="button"
              onClick={() => scrollPositionRight('discounted')}
              disabled={
                scrollPositionHot - itemWidth
                < -((discountedPhones.length - 4) * itemWidth)
              }
              className={classNames('top-container__button', {
                disabled: scrollPositionHot - itemWidth
                  < -((discountedPhones.length - 4) * itemWidth),
              })}
            >
              <img src="/img/ArrowRight.png" alt="ArrowRight" />
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
              transform: `translateX(${scrollPositionHot}px)`,
              transition: `transform ${1000}ms ease`,
            }}
          >
            {discountedPhones.map(card => (
              <li className="cardsContainer__item" key={card.id}>
                <ProductCard newPhone card={card} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-cy="categoryLinksContainer" className="Category container">
        <h1>Shop by category</h1>
        <div>
          <ul data-cy="categoryLinksContainer">
            {categoryImg.map(({ img, name, count }) => (
              <li className="Category__item" key={name}>
                <div className="Category__container">
                  <Link to="/phones" className="Category__img-container">
                    <img
                      className="Category__img"
                      src={img}
                      alt={name}
                    />
                  </Link>
                </div>

                <div className="Category__description">
                  <h3 className="Category__name">{name}</h3>
                  <p className="Category__count">{`${count} models`}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="New-models container"
        style={{
          width: `${4 * itemWidth - 16}px`,
        }}
      >
        <div className="top-container">
          <h1>Brand new models</h1>

          <div className="top-container__movement">
            <button
              type="button"
              onClick={() => scrollPositionLeft('brand')}
              disabled={scrollPositionBrand + itemWidth > 0}
              className={classNames('top-container__button', {
                disabled: scrollPositionBrand + itemWidth > 0,
              })}
            >
              <img src="/img/ArrowLeft.png" alt="ArrowLeft" />
            </button>
            <button
              type="button"
              onClick={() => scrollPositionRight('brand')}
              disabled={
                scrollPositionBrand - itemWidth
                < -((newPhones.length - 4) * itemWidth)
              }
              className={classNames('top-container__button', {
                disabled: scrollPositionBrand - itemWidth
                  < -((newPhones.length - 4) * itemWidth),
              })}
            >
              <img src="/img/ArrowRight.png" alt="ArrowLeft" />
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
              transform: `translateX(${scrollPositionBrand}px)`,
              transition: `transform ${1000}ms ease`,
            }}
          >
            {newPhones.map(card => (
              <li className="cardsContainer__item" key={card.id}>
                <ProductCard card={card} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
