import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductAd.scss';
import iPhone14 from '../../../images/Iphone14Pro.png';
import Ipad from '../../../images/iPadPro.png';
import AppleWatch from '../../../images/AppleWatch.png';
import classNames from 'classnames';
import NextButtonLight from '../../../images/NextButton.svg';
import PrevButtonLight from '../../../images/PrevButton.svg';
import NextButtonDark from '../../../images/NextButtonDark.svg';
import PrevButtonDark from '../../../images/PrevButtonDark.svg';
import { ThemeContext } from '../../ThemeProvider/ThemeProvider';
import { themeClass } from '../../../utils/themeClass';
import { useSwipe } from '../../../utils/useSwipe';

interface Product {
  name: string;
  title: string;
  text: string;
  link: string;
  img: string;
}

export const ProductAd = () => {
  const { light } = useContext(ThemeContext);

  const getClassName = themeClass(light);

  const products: Product[] = [
    {
      name: 'iPhone 14 Pro',
      title: 'Now aviable in our store!',
      text: 'Be the first!',
      link: '/phones/apple-iphone-14-pro-512gb-spaceblack',
      img: iPhone14,
    },
    {
      name: 'iPad Pro',
      title: 'The world’s most advanced display.',
      text: 'Enjoy the thinnest product Apple has ever created!',
      link: '/tablets/apple-ipad-pro-11-2021-2tb-spacegray',
      img: Ipad,
    },
    {
      name: 'Apple Watch',
      title: 'To wear it is to love it.',
      text: 'Smarter. Brighter. Mightier.',
      link: '/accessories/apple-watch-series-5-44mm-silver',
      img: AppleWatch,
    },
  ];

  const [translateX, setTranslateX] = useState(0);

  const nextSlide = () => {
    if (translateX > -200) {
      setTranslateX(prev => prev - 100);
    } else {
      setTranslateX(0);
    }
  };

  const prevSlide = () => {
    if (translateX < 0) {
      setTranslateX(prev => prev + 100);
    } else {
      setTranslateX(-200);
    }
  };

  const { onTouchEnd, onTouchStart, onTouchMove } = useSwipe(
    nextSlide,
    prevSlide,
  );

  return (
    <section className="product-ad">
      <button onClick={prevSlide} className={getClassName('change-button')}>
        <img src={light ? PrevButtonLight : PrevButtonDark} alt="" />
      </button>
      <div
        className="carousel"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      >
        <div
          className="box"
          style={{
            transform: `translateX(${translateX}%)`,
          }}
        >
          {products.map(product => (
            <div className="carousel-item" key={product.name}>
              <div className="carousel-item__button-box">
                <div>
                  <h1 className="carousel-item__button-box--header">
                    {product.title}
                  </h1>

                  <p className="carousel-item__button-box--text">
                    {product.text}
                  </p>
                </div>

                <Link
                  to={product.link}
                  className="carousel-item__button-box--link"
                >
                  ORDER NOW
                </Link>
              </div>

              <div className="carousel-item__content-box">
                <h1 className="carousel-item__content-box--header">
                  {product.name}
                </h1>

                <Link
                  to={product.link}
                  className="carousel-item__content-box--link phone-link"
                >
                  ORDER NOW
                </Link>

                <img
                  src={product.img}
                  alt={product.name}
                  className={classNames('carousel-item__content-box--pic', {
                    watch: product.name === 'Apple Watch',
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={nextSlide} className={getClassName('change-button')}>
        <img src={light ? NextButtonLight : NextButtonDark} alt="" />
      </button>

      <div className="dots">
        <div
          className={getClassName(
            classNames('dot', { dot__active: translateX === 0 }),
          )}
        >
          {''}
        </div>
        <div
          className={getClassName(
            classNames('dot', { dot__active: translateX === -100 }),
          )}
        >
          {''}
        </div>
        <div
          className={getClassName(
            classNames('dot', { dot__active: translateX === -200 }),
          )}
        >
          {''}
        </div>
      </div>
    </section>
  );
};
