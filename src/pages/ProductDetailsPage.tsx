/* eslint-disable max-len */

import { Link, useParams } from 'react-router-dom';

import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { getProductDetails } from '../utils/fetchProduct';
import { ProductDetails } from '../types/ProductDetails';
import { colors } from '../types/Colors';
import '../styles/ProductDetailsPage.scss';
import { AppContext } from '../components/AppContex';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Product } from '../types/product';
import { handleSetCart } from '../functions/handleSetCart';
import { Loader } from '../components/Loader';

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();

  const {
    favourites, setFavourites, products, cart, setCart,
  } = useContext(AppContext);

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [mainPhoto, setMainPhoto] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [firstPhone, setFirstPhone] = useState<number>(0);
  const [randomProducts, setRandomProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);

  const link = `/phones/${productId?.split('-').slice(0, -2).join('-')}`;

  useEffect(() => {
    setIsLoading(true);

    getProductDetails(productId)
      .then(data => setDetails(data))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const find = products.find(product => product.phoneId === productId);

  const findProduct = () => {
    if (find) {
      return find;
    }

    return products[0];
  };

  const existingCartItem = cart.find((item) => item.product.id === find?.id);

  const handleSetFavourites = () => {
    if (find) {
      const index = favourites.findIndex(favourite => favourite.id === find.id);

      if (index !== -1) {
        const updatedFavourites = [...favourites];

        updatedFavourites.splice(index, 1);
        setFavourites(updatedFavourites);
      } else {
        setFavourites([...favourites, find]);
      }
    }
  };

  const findFavouriteCard = () => {
    return favourites.find(favourite => favourite.id === find?.id);
  };

  useEffect(() => {
    if (details) {
      setMainPhoto(details?.images[0]);
    }
  }, [details]);

  useEffect(() => {
    const valuesArr = productId.split('-');

    setCurrentCapacity(valuesArr.at(-2)?.toUpperCase() || '');
    setCurrentColor(valuesArr.at(-1) || '');
  }, [productId]);

  useEffect(() => {
    function getRandomProducts() {
      const shuffled = products.sort(() => 0.5 - Math.random());

      return shuffled.slice(0, 8);
    }

    const a = getRandomProducts();

    setRandomProducts(a);
  }, [products]);

  const handleSetPhoto = (imageSrc: string) => {
    setMainPhoto(imageSrc);
  };

  const productPrev = () => {
    if (firstPhone === 0 && randomProducts) {
      return setFirstPhone(randomProducts.length - 4);
    }

    return setFirstPhone(num => num - 1);
  };

  const productNext = () => {
    if (randomProducts) {
      if (firstPhone === randomProducts.length - 4) {
        return setFirstPhone(0);
      }
    }

    return setFirstPhone((num) => num + 1);
  };

  return (
    <div className="product-details__container mb-80">
      {isLoading && (
        <Loader />
      )}

      {!isLoading && (
        <>
          <div className="way">
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.59075 0.807088C7.83149 0.619846 8.16859 0.619846 8.40933 0.807088L14.4093 5.47375C14.5717 5.60006 14.6667 5.79426 14.6667 5.99999V13.3333C14.6667 13.8638 14.456 14.3725 14.0809 14.7475C13.7058 15.1226 13.1971 15.3333 12.6667 15.3333H3.33337C2.80294 15.3333 2.29423 15.1226 1.91916 14.7475C1.54409 14.3725 1.33337 13.8638 1.33337 13.3333V5.99999C1.33337 5.79426 1.42836 5.60006 1.59075 5.47375L7.59075 0.807088ZM2.66671 6.32605V13.3333C2.66671 13.5101 2.73695 13.6797 2.86197 13.8047C2.98699 13.9298 3.15656 14 3.33337 14H12.6667C12.8435 14 13.0131 13.9298 13.1381 13.8047C13.2631 13.6797 13.3334 13.5101 13.3334 13.3333V6.32605L8.00004 2.1779L2.66671 6.32605Z" fill="#313237" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5.33337 8.00001C5.33337 7.63182 5.63185 7.33334 6.00004 7.33334H10C10.3682 7.33334 10.6667 7.63182 10.6667 8.00001V14.6667C10.6667 15.0349 10.3682 15.3333 10 15.3333C9.63185 15.3333 9.33337 15.0349 9.33337 14.6667V8.66668H6.66671V14.6667C6.66671 15.0349 6.36823 15.3333 6.00004 15.3333C5.63185 15.3333 5.33337 15.0349 5.33337 14.6667V8.00001Z" fill="#313237" />
              </svg>
            </Link>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill="#B4BDC4" />
            </svg>

            <Link to="/phones" className="product-details__link">Phones</Link>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill="#B4BDC4" />
            </svg>

            <span className="way__weight">{details?.name}</span>
          </div>

          <div className="way__back">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" fill="#313237" />
            </svg>

            <Link to="/phones" className="way__back-link">Back</Link>
          </div>
        </>
      )}

      {!isLoading && (
        <h1 className="product-details__title">{details?.name}</h1>
      )}

      {details && !isLoading && (
        <>
          <div className="product-details__main">
            <div className="product-details__main-left">
              {details.images.map(image => (
                <button
                  type="button"
                  key={image}
                  className="product-details__main-left__link"
                  onClick={() => handleSetPhoto(image)}
                >
                  <img
                    src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
                    alt={image}
                    className="product-details__photo"
                  />
                </button>
              ))}
            </div>

            <div className="product-details__main-center">
              <img
                className="product-details__photo"
                src={`https://mate-academy.github.io/react_phone-catalog/_new/${mainPhoto}`}
                alt={mainPhoto}
              />
            </div>

            <div className="product-details__main-right">
              <span className="mb-8">Available colors</span>

              <ul className="product-details__main-right__buttons">
                {details.colorsAvailable.map(color => (
                  <li
                    key={color}
                    className={classNames('product-details__main-right__color', {
                      'product-details__main-right__color--active': color === currentColor,
                    })}
                  >
                    <Link
                      to={`${link}-${currentCapacity.toLowerCase()}-${color}`}
                      className="product-details__main-right__color-border"
                      style={{ backgroundColor: colors[color] }}
                    />
                  </li>
                ))}
              </ul>

              <div className="product-details__main-right__line" />

              <span className="mb-8">Select capacity</span>

              <div className="product-details__main-right__buttons">
                {details.capacityAvailable.map(capacity => (
                  <Link
                    to={`${link}-${capacity.toLowerCase()}-${currentColor}`}
                    className={classNames('product-details__main-right__capacity', {
                      'product-details__main-right__capacity--active': currentCapacity === capacity,
                    })}
                    key={capacity}
                  >
                    {capacity}
                  </Link>
                ))}
              </div>

              <div className="product-details__main-right__line" />

              <div className="product-details__main-right__price">
                {`$${details.priceDiscount} `}
                <span className="product-details__main-right__price-discount">{`$${details.priceRegular}`}</span>
              </div>

              <div className="product-details__main-right__action">
                {!existingCartItem ? (
                  <button
                    className="product-details__main-right__button"
                    type="button"
                    onClick={() => handleSetCart(findProduct(), cart, setCart)}
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    className="product-details__main-right__button-added"
                    type="button"
                    onClick={() => handleSetCart(findProduct(), cart, setCart)}
                  >
                    Added to cart
                  </button>
                )}

                <button
                  type="button"
                  className="product-details__main-right__button-favorite"
                  onClick={handleSetFavourites}
                >
                  {findFavouriteCard()
                    ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852 1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005 2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005 1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668 3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668 7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158 7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679 5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158 3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015 1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z" fill="#EB5757" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 1.63137C10.1584 1.4118 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.4118 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98394 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66667C15.6679 6.24028 15.5549 6.80827 15.3353 7.33819C15.1158 7.86806 14.794 8.34949 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.82501 0.33252 5.66667C0.33252 4.50833 0.792668 3.39743 1.61174 2.57836C2.43081 1.75929 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75929 7.78835 2.57836L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57844 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07392 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07392 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.56831C6.24189 3.01179 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01179 2.60169 3.56831C2.04517 4.12483 1.73252 4.87963 1.73252 5.66667C1.73252 6.4537 2.04517 7.20851 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48953 13.8928 7.16231 14.042 6.80228C14.1911 6.44226 14.2679 6.05637 14.2679 5.66667C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17103 13.6739 3.84369 13.3983 3.56819Z" fill="#333333" />
                      </svg>
                    )}
                </button>
              </div>

              <div className="product-details__main-right__info">
                <div className="product-details__main-right__info-names">
                  <span>Screen</span>
                  <span>Resolution</span>
                  <span>Processor</span>
                  <span>RAM</span>
                </div>

                <div className="product-details__main-right__info-values">
                  <span>{details.screen}</span>
                  <span>{details.resolution}</span>
                  <span>{details.processor}</span>
                  <span>{details.ram}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details__bottom">
            <div className="product-details__about">
              <h2 className="product-details__about-title">About</h2>

              <div className="product-details__main-right__line" />

              {details.description.map(desc => (
                <div key={desc?.title}>
                  <h3 className="product-details__about-subtitle">{desc.title}</h3>

                  <p className="product-details__about-subtext">{desc.text}</p>
                </div>
              ))}

            </div>

            <div className="product-details__specs">
              <h2 className="product-details__about-title">Tech specs</h2>

              <div className="product-details__main-right__line" />

              <div className="product-details__specs-info">
                <div className="product-details__specs-info-names">
                  <span>Screen</span>
                  <span>Resolution</span>
                  <span>Processor</span>
                  <span>RAM</span>
                  <span>Built in memory</span>
                  <span>Camera</span>
                  <span>Zoom</span>
                  <span>Cell</span>
                </div>

                <div className="product-details__specs-info-values">
                  <span>{details.screen}</span>
                  <span>{details.resolution}</span>
                  <span>{details.processor}</span>
                  <span>{details.ram}</span>
                  <span>{details.capacity}</span>
                  <span>{details.camera}</span>
                  <span>{details.zoom}</span>
                  <span>{details.cell}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {randomProducts && !isLoading && (
        <>
          <div className="product-details__slider-top">
            <h1 className="product-details__title">You may also like</h1>

            <div className="product-slider__top-buttons">
              <button
                type="button"
                className="product-slider__top-button-prev"
                onClick={productPrev}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z" fill="#313237" />
                </svg>
              </button>
              <button
                type="button"
                className="product-slider__top-button-prev"
                onClick={productNext}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z" fill="#313237" />
                </svg>
              </button>
            </div>
          </div>

          <div className="product-card__container" data-cy="cardsContainer">
            {randomProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                firstPhone={firstPhone}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
