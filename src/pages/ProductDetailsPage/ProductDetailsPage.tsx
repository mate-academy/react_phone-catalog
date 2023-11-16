import classNames from 'classnames';

import { Link, useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useProducts } from '../../comonents/ProductContext';
import { Loader } from '../../comonents/Loader';
import { ProductSlider } from '../../comonents/ProductSlider';
import { Carousel } from '../../comonents/Carousel';
import { About } from '../../comonents/About';
import { Button } from '../../comonents/Button';
import { Option } from '../../comonents/Options';
import { BackButton } from '../../comonents/BackButton';

import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const {
    productDetails,
    selectedProduct,
    setSelectedProductId,
    isLoading,
    randomProducts,
    getArrayLength,
    isProductNotFound,
  } = useProducts();
  const [imgIndex, setImgIndex] = useState(0);
  const { productId } = useParams();
  const { state } = useLocation();
  const location = useLocation();

  const {
    android,
    battery,
    camera,
    description,
    display,
    id,
    images,
  } = productDetails;

  const { os } = android;
  const { type } = battery;
  const { primary } = camera;
  const { screenResolution } = display;

  const {
    price,
    discount,
    screen,
    capacity,
    ram,
    name,
  } = selectedProduct;

  const priceWithDiscount = price - (price * discount) / 100;
  const getBackButtonName = location.pathname.split('/')[1];
  const [currentSlide, setCurrentSlide] = useState(0);
  const length = getArrayLength(randomProducts);

  useEffect(() => {
    if (productId) {
      setSelectedProductId(productId);
    }

    return () => {
      setSelectedProductId('');
    };
  }, [productId, setSelectedProductId]);

  const handleImageClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setImgIndex(index);
  };

  const renderContext = () => {
    if (isProductNotFound) {
      return (
        <div>
          <BackButton />
          <h2>
            Phone was not found
          </h2>
        </div>
      );
    }

    return (
      <>
        <div
          className="details__bread-crumbs"
          data-cy="breadCrumbs"
        >
          <Link to="/">
            <span className="icon icon--home" />
          </Link>

          <span className="icon icon--arrow-dis icon--next" />

          <Link
            to={{
              pathname: '..',
              search: state?.search,
            }}
            className="text text--small"
          >
            {getBackButtonName}
          </Link>

          <span className="icon icon--arrow-dis icon--next" />

          <p className="text text--small text--gray">
            {name.toLowerCase()}
          </p>
        </div>

        <BackButton />

        <h1 className="details__title text text--h1">
          {name.toLowerCase()}
        </h1>

        <section className="details__main-container">
          <ul className="details__images-container">
            {images.map((img, index) => (
              <li
                key={img}
                className={classNames(
                  'details__image-container',
                  {
                    'details__image-container--selected':
                      imgIndex === index,
                  },
                )}
              >
                <a
                  href="/"
                  type="button"
                  onClick={(e) => handleImageClick(e, index)}
                >
                  <img
                    className="details__img"
                    src={`img/products/${id}.${index}.jpg`}
                    alt="img"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="details__selected-img-container">
            <img
              src={`img/products/${productDetails.id}.${imgIndex}.jpg`}
              alt="img"
              className="details__img details__img--selected"
            />
          </div>

          <div className="details__inner-container">
            <Option />

            <div className="details__info-container">
              <div className="details__price-container">
                {discount > 0 && (
                  <p className="text text--h1">{`$${priceWithDiscount}`}</p>
                )}

                <p className={classNames(
                  'text',
                  'text--h1',
                  { 'text--h2-strikethrough': discount > 0 },
                  { 'text--gray': discount > 0 },
                )}
                >
                  {`$${price}`}
                </p>
              </div>

              <Button
                name="details"
                product={selectedProduct}
              />

              <ul className="details__info-container">
                <li className="details__info">
                  <p className="text text--gray text--small">
                    Screen
                  </p>
                  <p className="text text--small">
                    {screen}
                  </p>
                </li>
                <li className="details__info">
                  <p className="text text--gray text--small">
                    Resolution
                  </p>
                  <p className="text text--small">
                    {screenResolution}
                  </p>
                </li>
                <li className="details__info">
                  <p className="text text--gray text--small">
                    OS
                  </p>
                  <p className="text text--small">
                    {os}
                  </p>
                </li>
                <li className="details__info">
                  <p className="text text--gray text--small">
                    Ram
                  </p>
                  <p className="text text--small">
                    {ram}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <About
          description={description}
          screen={screen}
          screenResolution={screenResolution}
          os={os}
          ram={ram}
          type={type}
          primary={primary}
          capacity={capacity}
        />

        <div className="details__carousel-container">
          <div className="container">
            <h2>You may also like</h2>
            <ProductSlider
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              length={length}
            />
          </div>

          <Carousel
            products={randomProducts}
            currentSlide={currentSlide}
            id="random"
          />
        </div>
      </>
    );
  };

  return (
    <section className="details">
      {isLoading ? (
        <Loader />
      ) : (
        renderContext()
      )}
    </section>
  );
};
