import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './HomePage.scss';
import { useAppSelector } from '../../store';
import {
  imgWidth,
  scrollPositionLeft,
  scrollPositionRight,
} from '../../helpers/changePositionItem';
import {
  Phones,
  PhonesSlider,
} from '../../components/PhonesSlider/PhonesSlider';

export const HomePage = () => {
  const phones = useAppSelector(
    (state) => state.phones.items,
  );

  const [scrollImgPosition, setScrollImgPosition] = useState(0);

  const categoryImg = [
    {
      img: '_new/img/category-phones.png',
      name: 'Mobile phones',
      count: `${phones.length}`,
      color: '#D53C51',
      type: 'Phones',
    },
    {
      img: '_new/img/category-tablets.png',
      name: 'Tablets',
      count: 24,
      color: '#D53C51',
      type: 'Tablets',
    },
    {
      img: '_new/img/category-accessories.png',
      name: 'Accessories',
      count: 100,
      color: '#D53C51',
      type: 'Accessories',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollImgPosition === -imgWidth * 2) {
        scrollPositionRight(setScrollImgPosition, imgWidth, imgWidth);
      } else {
        scrollPositionRight(setScrollImgPosition, scrollImgPosition, imgWidth);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [scrollImgPosition]);

  return (
    <div className="Home-page">
      <div className="Slider">
        <div className="Slider__main">
          <button
            type="button"
            className={classNames('Slider__button', {
              disabled: scrollImgPosition >= 0,
            })}
            onClick={() => scrollPositionLeft(
              setScrollImgPosition,
              scrollImgPosition,
              imgWidth,
            )}
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
            <Link to="Phones">
              <img
                className="Slider__img"
                src="_new/img/banner-phones.png"
                alt="banner-phones"
              />
            </Link>
            <Link to="Tablets">
              <img
                className="Slider__img"
                src="_new/img/banner-tablets.png"
                alt="banner-tablets"
              />
            </Link>
            <Link to="Accessories">
              <img
                className="Slider__img"
                src="_new/img/banner-accessories.png"
                alt="banner-accessories"
              />
            </Link>
          </div>
          <button
            type="button"
            onClick={() => scrollPositionRight(
              setScrollImgPosition,
              scrollImgPosition,
              imgWidth,
            )}
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

      <PhonesSlider type={Phones.Discount} />

      <div data-cy="categoryLinksContainer" className="Category container">
        <h1>Shop by category</h1>
        <div>
          <ul data-cy="categoryLinksContainer">
            {categoryImg.map(({
              img,
              name,
              count,
              color,
              type,
            }) => (
              <li className="Category__item" key={name}>
                <div className="Category__container" style={{ backgroundColor: `${color}` }}>
                  <Link
                    to={type}
                    className="Category__img-container"
                  >
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

      <PhonesSlider type={Phones.New} />
    </div>
  );
};
