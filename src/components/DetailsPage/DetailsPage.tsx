import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { COLORS } from '../../constants/colors';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { CatalogContext } from '../Contexts/CatalogContext';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { Loader } from '../Loader';
import { getProductById } from '../../api';
import { ExtendedProduct } from '../../types/ExtendedProduct';
import classNames from 'classnames';
import { getNextId } from '../../hooks/newId';

export const DetailsPage: React.FC = () => {
  const context = useContext(CatalogContext);
  const { allProducts, cart, addCart, favourites } = context;
  const { addFavourites, deleteFromFavourites } = context;

  const [detailProduct, setDetailProduct] = useState<ExtendedProduct>();

  const [bigImage, setBigImage] = useState<string>('');
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState('');

  const { state } = useLocation();
  const location = useLocation();
  const arrayPath = location?.pathname.split('/');
  const backPath = state?.location?.pathname
    ? state?.location?.pathname
    : `/${arrayPath[1]}`;
  const category =
    arrayPath[1]?.slice(0, 1).toUpperCase() + arrayPath[1]?.slice(1);
  const subCategory =
    arrayPath[2]?.slice(0, 1).toUpperCase() + arrayPath[2]?.slice(1);

  const getSuggestedProducts = useMemo(() => {
    return [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 15);
  }, [allProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setIsLoad(true);
    setError('');

    getProductById(category.toLowerCase())
      .then(productsFromServer => {
        const productFromServer = productsFromServer.find(
          (prod: ExtendedProduct) => prod.id === subCategory.toLowerCase(),
        );

        if (!productFromServer) {
          setError(`Product was not found`);

          return;
        }

        setDetailProduct(productFromServer);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [category, subCategory]);

  useEffect(() => {
    if (detailProduct) {
      setBigImage(detailProduct.images[0]);
    }
  }, [detailProduct]);

  const handlerAddToCart = () => {
    if (cart.every(product => product.product.itemId !== detailProduct?.id)) {
      const searchProduct = allProducts.find(
        product => product.itemId === detailProduct?.id,
      );

      if (searchProduct) {
        const newProduct = {
          id: getNextId(cart),
          product: searchProduct,
          quantity: 1,
        };

        addCart(newProduct);
      }
    }
  };

  const handlerAddToFavourites = () => {
    const searchProduct = allProducts.find(
      product => product.itemId === detailProduct?.id,
    );

    if (searchProduct) {
      if (favourites.includes(searchProduct)) {
        deleteFromFavourites(searchProduct);
      } else {
        addFavourites(searchProduct);
      }
    }
  };

  return (
    <>
      <BreadCrumbs category={category} subCategory={subCategory} />
      <div className="breadcrumbs breadcrumbs--back breadcrumbs--details">
        <div className="breadcrumbs__divider breadcrumbs__divider--back"></div>
        <div className="breadcrumbs__crumb">
          <Link
            to={{
              pathname: backPath,
              search: state?.location?.search,
            }}
            state={state?.location?.state}
            className="breadcrumbs__link"
          >
            Back
          </Link>
        </div>
      </div>
      {isLoad ? (
        <div className="page-not-found">
          <Loader />
        </div>
      ) : (
        <>
          {error && (
            <div className="page-not-found">
              <h3 className="page-not-found__title">{error}</h3>
              <img
                className="page-not-found__image"
                src="img/product-not-found.png"
                alt="page not found"
              />
            </div>
          )}
          {!error && detailProduct && (
            <div className="page__container">
              <div className="page__category details">
                <h2 className="details__title">{detailProduct?.name}</h2>
                <div className="details__main-image">
                  <img
                    className="details__image"
                    src={bigImage}
                    alt="product image"
                  />
                </div>
                <div className="details__images">
                  {detailProduct?.images.map(image => (
                    <div
                      className="
                        details__image-wrapper
                        details__image-wrapper--active
                        "
                      key={image}
                      onClick={() => setBigImage(image)}
                    >
                      <img
                        className="details__image"
                        src={image}
                        alt="product image"
                      />
                    </div>
                  ))}
                </div>

                <div
                  className="
                    details__description
                    details__description--right
                    "
                >
                  <div className="details__description-mini-block">
                    <div className="details__description-top">
                      <p className="details__description-title">
                        Available colors
                      </p>
                      <p className="details__id">ID: 802390</p>
                    </div>
                    <div className="details__description-wrapper">
                      {detailProduct?.colorsAvailable.map(color => {
                        const colorStyle = COLORS[color];

                        if (!colorStyle) {
                          return null;
                        }

                        return (
                          <Link
                            state={{
                              location,
                            }}
                            to={`/${category.toLowerCase()}/${detailProduct?.namespaceId}-${detailProduct?.capacity}-${color.replace(' ', '-')}`}
                            className={classNames('details__color-border', {
                              'details__color-border--active':
                                color === detailProduct.color,
                            })}
                            key={color}
                          >
                            <div
                              className="details__color"
                              style={{ backgroundColor: colorStyle }}
                            ></div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className="
                      details__description-mini-block
                      details__description-mini-block--last
                    "
                  >
                    <div className="details__description-top">
                      <p className="details__description-title">
                        Select capacity
                      </p>
                    </div>
                    <div className="details__description-wrapper">
                      {detailProduct?.capacityAvailable.map(capacity => (
                        <Link
                          state={{
                            location,
                          }}
                          to={`/${category.toLowerCase()}/${detailProduct.namespaceId}-${capacity}-${detailProduct.color.replace(' ', '-')}`}
                          key={capacity}
                          className={classNames('details__capacity', {
                            'details__capacity--active':
                              capacity === detailProduct.capacity,
                          })}
                        >
                          {capacity}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="details__description-block">
                    <div className="details__price-wrapper">
                      <p className="details__price">
                        {detailProduct?.priceDiscount}
                      </p>
                      <p className="details__price details__price--full">
                        {detailProduct?.priceRegular}
                      </p>
                    </div>
                    <div className="details__buttons">
                      {/* eslint-disable-next-line max-len, prettier/prettier*/}
                      {cart.some(product => product.product.itemId === detailProduct?.id) ? (
                        <button
                          className="
                          card__addToCart
                          card__addToCart--selected
                        "
                        >
                          Added to cart
                        </button>
                      ) : (
                        <button
                          className="card__addToCart"
                          onClick={handlerAddToCart}
                        >
                          Add to cart
                        </button>
                      )}
                      <button
                        className="card__addToFavourite  details__button"
                        onClick={handlerAddToFavourites}
                      >
                        {/* eslint-disable-next-line max-len, prettier/prettier */}
                        {favourites.some(product => product.itemId === detailProduct?.id) ? (
                          <img
                            className="card__heart"
                            src="img/icons/favouritesFilled.png"
                            alt="favourites"
                          />
                        ) : (
                          <img
                            className="card__heart"
                            src="img/icons/favourites.png"
                            alt="favourites"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="details__description-bottom">
                    <div className="details__description-group">
                      <div className="details__description-name">Screen</div>
                      <div className="details__description-value">
                        {detailProduct?.screen}
                      </div>
                    </div>
                    <div className="details__description-group">
                      <div className="details__description-name">
                        Resolution
                      </div>
                      <div className="details__description-value">
                        {detailProduct?.resolution}
                      </div>
                    </div>
                    <div className="details__description-group">
                      <div className="details__description-name">Processor</div>
                      <div className="details__description-value">
                        {detailProduct?.processor}
                      </div>
                    </div>
                    <div className="details__description-group">
                      <div className="details__description-name">RAM</div>
                      <div className="details__description-value">
                        {detailProduct?.ram}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    details__description
                    details__description--bottom
                  "
                >
                  <h3 className="details__small-title">About</h3>
                  <article className="details__article">
                    <h4 className="details__article-title">
                      {detailProduct?.description[0].title}
                    </h4>
                    <p className="details__article-text">
                      {detailProduct?.description[0].text}
                    </p>
                  </article>

                  <article className="details__article">
                    <h4 className="details__article-title">
                      {detailProduct?.description[1].title}
                    </h4>
                    <p className="details__article-text">
                      {detailProduct?.description[1].text}
                    </p>
                  </article>

                  <article className="details__article">
                    <h4 className="details__article-title">
                      {detailProduct?.description[2].title}
                    </h4>
                    <p className="details__article-text">
                      {detailProduct?.description[2].text}
                    </p>
                  </article>
                </div>

                <div
                  className="
                    details__description
                    details__description--last
                  "
                >
                  <h3 className="details__small-title">Tech specs</h3>
                  <div className="details__description-bottom">
                    <div className="details__tech-group">
                      <div className="details__tech-name">Screen</div>
                      <div className="details__tech-value">
                        {detailProduct?.screen}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Resolution</div>
                      <div className="details__tech-value">
                        {detailProduct?.resolution}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Processor</div>
                      <div className="details__tech-value">
                        {detailProduct?.processor}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">RAM</div>
                      <div className="details__tech-value">
                        {detailProduct?.ram}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Built in memory</div>
                      <div className="details__tech-value">
                        {detailProduct?.capacity}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Camera</div>
                      <div className="details__tech-value">
                        {detailProduct?.camera}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Zoom</div>
                      <div className="details__tech-value">
                        {detailProduct?.zoom}
                      </div>
                    </div>
                    <div className="details__tech-group">
                      <div className="details__tech-name">Cell</div>
                      <div className="details__tech-value">
                        {detailProduct?.cell.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ProductSlider
                title="You may also like"
                models={getSuggestedProducts}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
