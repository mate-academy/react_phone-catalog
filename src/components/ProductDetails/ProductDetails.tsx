import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

import { getPhoneDetails, getPhones } from '../../api/products';
import { PhoneDetails } from '../../types/phoneDetails';

import { BreadCrumbs } from '../BreadCrumbs';
import { Loader } from '../Loader';
import { ProductSlider } from '../ProductsSlider';
import { CartContext } from '../../storage/cartContext';
import { Phone } from '../../types/phone';
import { FavouritesContext } from '../../storage/favoritesContext';
import { BackButton } from '../BackButton';
import './productDetails.scss';

export interface ColorsType {
  [key: string]: string;
}

export const colorDictionary: ColorsType = {
  black: '#1F2020',
  coral: '#EE7762',
  gold: '#F9E5C9',
  green: '#AEE1CD',
  midnightgreen: '#004953',
  purple: '#e5ddea',
  red: '#BA0C2E',
  rosegold: '#E6C7C2',
  silver: '#e2e4e1',
  spacegray: '#535150',
  white: '#F8F7F2',
  yellow: '#F3D060',
};

export const ProductDetails: React.FC = () => {
  const { isInCart, handleCart } = useContext(CartContext);
  const { isInFavorites, handleFavorites } = useContext(FavouritesContext);

  const [generalInfo, setGeneralInfo] = useState <Phone | null>(null);
  const [product, setProduct] = useState<PhoneDetails | null>(null);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { productId } = useParams();
  const navigate = useNavigate();

  const handleImageChange = (image: string) => {
    setCurrentImage(image);
  };

  const handleColorChange = (color: string) => {
    const Url = `/${generalInfo?.category}/${product?.namespaceId}-${product?.capacity}-${color}`.toLowerCase();

    navigate(Url);
  };

  const handleCapacityChange = (capacity: string) => {
    const Url = `/${generalInfo?.category}/${product?.namespaceId}-${capacity}-${product?.color}`.toLowerCase();

    navigate(Url);
  };

  useEffect(() => {
    async function getData() {
      try {
        const phoneDetails = await getPhoneDetails(productId || '');

        if (!phoneDetails) {
          setError('Product details were not found...');

          return;
        }

        setProduct(phoneDetails);
        setCurrentImage(phoneDetails.images[0]);

        const phones = await getPhones();
        const phoneInfo = phones
          .find(phone => phone.phoneId === phoneDetails.id);

        if (!phoneInfo) {
          setError('Could not find exact product...');

          return;
        }

        setGeneralInfo(phoneInfo);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <div className="details-page">
      <section className="details-page__section details-page__section--small">
        <BreadCrumbs productName={product?.name || '???'} />
      </section>

      <section className="details-page__back-button">
        <BackButton />
      </section>

      {!product || !generalInfo || error ? (
        <div className="details-page__error">
          <h1 className="details-page__error-title">{error}</h1>
          <p className="details-page__error-description">
            Something went wrong...
          </p>
        </div>
      ) : (
        <>
          <section
            className="
            details-page__section
            details-page__section--small
          "
          >
            <h1 className="details-page__title">{product.name}</h1>
          </section>

          <section className="details-page__section">
            <div className="details-page__grid">
              <div className="details-page__small-photos">
                {product.images.map((image) => (
                  <div
                    key={image}
                    className={classNames(
                      'details-page__small-photo-container',
                      {
                        'details-page__small-photo-container--selected':
                          image === currentImage,
                      },
                    )}
                    onClick={() => handleImageChange(image)}
                    aria-hidden
                  >
                    <img
                      className="details-page__photo"
                      src={image}
                      alt={image}
                    />
                  </div>
                ))}
              </div>

              <div className="details-page__big-photo-container">
                <img
                  className="details-page__photo"
                  src={currentImage}
                  alt={currentImage}
                />
              </div>

              <div className="details-page__actions">
                <div className="details-page__colors">
                  <p className="details-page__actions-title">
                    Available colors
                  </p>

                  <div className="details-page__colors-container">
                    {product.colorsAvailable.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={classNames('details-page__colors-button', {
                          'details-page__colors-button--selected':
                            color === product.color,
                        })}
                        style={{
                          backgroundColor: colorDictionary[color],
                        }}
                        aria-label="change-color"
                        onClick={() => handleColorChange(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="details-page__underline" />

                <div className="details-page__capacity">
                  <p className="details-page__actions-title">Select capacity</p>

                  <div className="details-page__capacity-button-container">
                    {product.capacityAvailable.map((capacity) => (
                      <button
                        key={capacity}
                        type="button"
                        className={classNames('details-page__capacity-button', {
                          'details-page__capacity-button--selected':
                            capacity === product.capacity,
                        })}
                        onClick={() => handleCapacityChange(capacity)}
                      >
                        {capacity}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className="
                  details-page__underline
                  details-page__underline--extend"
                />

                <div className="details-page__price">
                  <span className="details-page__price-new">
                    {`$${product.priceDiscount}`}
                  </span>

                  <span className="details-page__price-old">
                    {`$${product.priceRegular}`}
                  </span>
                </div>

                <div className="details-page__buttons">
                  <button
                    type="button"
                    className={classNames('details-page__buttons-cart', {
                      'details-page__buttons-cart--added':
                        isInCart(generalInfo),
                    })}
                    onClick={() => handleCart(generalInfo)}
                  >
                    {isInCart(generalInfo) ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <button
                    type="button"
                    className={classNames('details-page__buttons-favorites', {
                      'details-page__buttons-favorites--added':
                        isInFavorites(generalInfo),
                    })}
                    onClick={() => handleFavorites(generalInfo)}
                  >
                    {isInFavorites(generalInfo)
                      ? <ReactSVG src="img/icons/FavouritesFilled.svg" />
                      : <ReactSVG src="img/icons/Favourites.svg" />}
                  </button>
                </div>

                <ul className="details-page__actions-description">
                  <li className="details-page__actions-description-box">
                    <span className="details-page__actions-description-title">
                      Screen
                    </span>

                    <span className="details-page__actions-description-value">
                      {product.screen}
                    </span>
                  </li>

                  <li className="details-page__actions-description-box">
                    <span className="details-page__actions-description-title">
                      Resolution
                    </span>

                    <span className="details-page__actions-description-value">
                      {product.resolution}
                    </span>
                  </li>

                  <li className="details-page__actions-description-box">
                    <span className="details-page__actions-description-title">
                      Processor
                    </span>

                    <span className="details-page__actions-description-value">
                      {product.processor}
                    </span>
                  </li>

                  <li className="details-page__actions-description-box">
                    <span className="details-page__actions-description-title">
                      RAM
                    </span>

                    <span className="details-page__actions-description-value">
                      {product.ram}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="details-page__section">
            <div className="details-page__grid">
              <div className="details-page__about">
                <h2 className="details-page__second-title">
                  About
                </h2>

                <div className="details-page__underline" />

                <div className="details-page__about-description">
                  {product.description.map(article => (
                    <article
                      key={article.title}
                      className="details-page__about-article"
                    >
                      <h3 className="details-page__third-title">
                        {article.title}
                      </h3>

                      {article.text.map(text => (
                        <p
                          className="details-page__about-text"
                          key={text}
                        >
                          {text}
                        </p>
                      ))}
                    </article>
                  ))}
                </div>
              </div>

              <div className="details-page__tech">
                <h2 className="details-page__second-title">
                  Tech specs
                </h2>

                <div className="details-page__underline" />

                <ul className="details-page__tech-list">
                  <li className="details-page__tech-item">
                    <span className="details-page__tech-title">
                      Screen
                    </span>

                    <span className="details-page__tech-text">
                      {product.screen}
                    </span>
                  </li>

                  <li className="details-page__tech-item">
                    <span className="details-page__tech-title">
                      Resolution
                    </span>

                    <span className="details-page__tech-text">
                      {product.resolution}
                    </span>
                  </li>

                  <li className="details-page__tech-item">
                    <span className="details-page__tech-title">
                      Processor
                    </span>

                    <span className="details-page__tech-text">
                      {product.processor}
                    </span>
                  </li>

                  <li className="details-page__tech-item">
                    <span className="details-page__tech-title">
                      RAM
                    </span>

                    <span className="details-page__tech-text">
                      {product.ram}
                    </span>
                  </li>

                  <li className="details-page__tech-item">
                    <span className="details-page__tech-title">
                      Built in memory
                    </span>

                    <span className="details-page__tech-text">
                      {product.capacity}
                    </span>
                  </li>

                  <li className="details-page__tech-item">
                    <span className="details-page__tech-title">
                      Camera
                    </span>

                    <span className="details-page__tech-text">
                      {product.camera}
                    </span>
                  </li>

                  <li className="details-page__tech-item">
                    <span className="details-page__tech-title">
                      Zoom
                    </span>

                    <span className="details-page__tech-text">
                      {product.zoom}
                    </span>
                  </li>

                  <li className="details-page__tech-item">
                    <span className="details-page__tech-title">
                      Cell
                    </span>

                    <span className="details-page__tech-text">
                      {product.cell.map((cells, ind) => (
                        <React.Fragment key={cells}>
                          {ind !== product.cell.length - 1 ? `${cells}, ` : cells}
                        </React.Fragment>
                      ))}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="details-page__section">
            <ProductSlider
              title="You may also like"
            />
          </section>
        </>
      )}
    </div>
  );
};
