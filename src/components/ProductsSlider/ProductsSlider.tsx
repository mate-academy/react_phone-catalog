/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';
import categoryPhones from '../../images/category-phones.png';
import categoryTablets from '../../images/category-tablets.png';
import categoryAccessories from '../../images/category-accessories.png';
import { AppContext } from '../AppContex';

const CurrentYear = 2019;

export const ProductsSlider: React.FC = () => {
  const { products, isLoading } = useContext(AppContext);

  const [firstPhone, setFirstPhone] = useState<number>(0);
  const [firstPhoneNew, setFirstPhoneNew] = useState<number>(0);

  const hotPricePhones = products.filter(product => +product.year < CurrentYear).sort((a, b) => +a.price - +b.price).reverse();

  const brendNewProducts = products.filter(product => +product.year === CurrentYear).sort((a, b) => +a.fullPrice - +b.fullPrice).reverse();

  const productPrev = (value: string) => {
    if (value === 'hotPrice') {
      return setFirstPhone(num => num - 1);
    }

    return setFirstPhoneNew(num => num - 1);
  };

  const productNext = (value: string) => {
    if (value === 'hotPrice') {
      return setFirstPhone((num) => num + 1);
    }

    return setFirstPhoneNew((num) => num + 1);
  };

  return (
    <>
      {isLoading && (
        <>
          <div className="product-slider">
            <div className="product-slider__top">
              <h1 className="product-slider__title">Hot prices</h1>
              <div className="product-slider__top-buttons">
                <button
                  type="button"
                  className={`product-slider__top-button-prev ${firstPhone === 0 ? 'disabled' : ''}`}
                  disabled={firstPhone === 0}
                  onClick={() => productPrev('hotPrice')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z" fill="#313237" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`product-slider__top-button-prev ${firstPhone === hotPricePhones.length - 4 ? 'disabled' : ''}`}
                  disabled={firstPhone === hotPricePhones.length - 4}
                  onClick={() => productNext('hotPrice')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z" fill="#313237" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="product-card__container" data-cy="cardsContainer">
              {hotPricePhones.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  firstPhone={firstPhone}
                />
              ))}
            </div>
          </div>

          <div className="shopByCategory">
            <h1 className="product-slider__title">Shop by category</h1>

            <div className="shopByCategory__container">
              <div className="shopByCategory__phones">
                <Link to="/phones">
                  <img
                    className="shopByCategory__phones-img"
                    src={categoryPhones}
                    alt="phone"
                  />
                </Link>

                <h3 className="shopByCategory__title">Mobile phones</h3>

                <span>{`${products.length} models`}</span>
              </div>

              <div className="shopByCategory__tablets">
                <Link to="/tablets">
                  <img
                    className="shopByCategory__tablets-img"
                    src={categoryTablets}
                    alt="tablets"
                  />
                </Link>

                <h3 className="shopByCategory__title">Tablets</h3>

                <span>{`${0} models`}</span>
              </div>

              <div className="shopByCategory__accessories">
                <Link to="/accessories">
                  <img
                    className="shopByCategory__accessories-img"
                    src={categoryAccessories}
                    alt="accessories"
                  />
                </Link>

                <h3 className="shopByCategory__title">Accessories</h3>

                <span>{`${0} models`}</span>
              </div>
            </div>
          </div>

          <div className="brandNew">
            <div className="product-slider__top">
              <h1 className="product-slider__title">Brand new models</h1>

              <div className="product-slider__top-buttons">
                <button
                  type="button"
                  className={`product-slider__top-button-prev ${firstPhoneNew === 0 ? 'disabled' : ''}`}
                  disabled={firstPhoneNew === 0}
                  onClick={() => productPrev('newBrand')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z" fill="#313237" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`product-slider__top-button-prev ${firstPhoneNew === hotPricePhones.length - 4 ? 'disabled' : ''}`}
                  disabled={firstPhoneNew === hotPricePhones.length - 4}
                  onClick={() => productNext('newBrand')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z" fill="#313237" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="product-card__container" data-cy="cardsContainer">
              {brendNewProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  firstPhone={firstPhoneNew}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
