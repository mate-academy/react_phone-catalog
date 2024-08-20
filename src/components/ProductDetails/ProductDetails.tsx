/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect, useState } from 'react';
import './ProductDetails.scss';
import { CatalogContext } from '../../context/CatalogContext';
import * as types from '../../types/types';
import { Link, useLocation } from 'react-router-dom';
import { getProductLink } from '../../utils/getProductLink';
import classNames from 'classnames';
import { getNormalColor } from '../../utils/getNormalColor';
import { NavigationPath } from '../NavigationPath';
import { Slider } from '../slider';
import { getIdForProduct } from '../../utils/getIdForProduct';
// eslint-disable-next-line max-len
import { getProductShortInfoById } from '../../utils/getProductShortInfoByProduct';
// eslint-disable-next-line max-len
import { getYouMayAlsoLikeProducts } from '../../utils/getYouMayAlsoLikeProducts';
import { getAccessories, getPhones, getProducts, getTablets } from '../../api';
import { getProductById } from '../../utils/getProductById';
import * as imagesForPage from '../../images';
import { getProductsByCategory } from '../../utils/getProductsByCategory';
import { SliderSkeleton } from '../skeletons/SliderSkeleton';
import { ProductDetailsSkeleton } from '../skeletons/ProductDetailsSkeleton';

export const ProductDetails: React.FC = () => {
  const {
    allProducts,
    addFavourites,
    deleteFavourites,
    addToCart,
    deleteFromCart,
    favouriteProducts,
    cartProducts,
  } = useContext(CatalogContext);

  const [selectedProduct, setSelectedProduct] = useState<
    types.ProductDetails | undefined
  >(undefined);
  const [YouMayAlsoLikeProducts, setYouMayAlsoLikeProducts] = useState<
    types.Product[]
  >([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isSliderLoader, setIsSliderLoader] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoader(true);

    Promise.all([getPhones(), getTablets(), getAccessories()])
      .then(([phones, tablets, accessories]) => {
        setSelectedProduct(
          getProductById([...phones, ...tablets, ...accessories], pathname) ||
            undefined,
        );
      })
      .finally(() => setIsLoader(false));
  }, [pathname]);

  const {
    category,
    name,
    description,
    screen,
    resolution,
    processor,
    ram,
    cell,
    camera,
    zoom,
    capacity,
    images,
    colorsAvailable,
    namespaceId,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    color,
    id,
  } = selectedProduct || {};

  const shortProdInfo = getProductShortInfoById(allProducts, id);
  const [mainPhoto, setMainPhoto] = useState(images && images[0]);

  useEffect(() => {
    setIsSliderLoader(true);
    getProducts()
      .then(prod => {
        const filteredProducts = getProductsByCategory(prod, category);

        setYouMayAlsoLikeProducts(getYouMayAlsoLikeProducts(filteredProducts));
      })
      .finally(() => setIsSliderLoader(false));
  }, [category]);

  useEffect(() => {
    setMainPhoto(images && images[0]);
  }, [images]);

  const characteristics = [
    { title: types.TechSpecs.Screen, text: screen },
    { title: types.TechSpecs.Resolution, text: resolution },
    { title: types.TechSpecs.Processor, text: processor },
    { title: types.TechSpecs.RAM, text: ram },
    { title: types.TechSpecs.Built, text: capacity },
    { title: types.TechSpecs.Camera, text: camera },
    { title: types.TechSpecs.Zoom, text: zoom },
    { title: types.TechSpecs.Cell, text: cell && cell.join(', ') },
  ];

  const handleFavouriteChange = () => {
    if (shortProdInfo) {
      if (
        id &&
        favouriteProducts.some(product => product.id === shortProdInfo.id)
      ) {
        deleteFavourites(shortProdInfo.id);
      } else {
        addFavourites(shortProdInfo);
      }
    }
  };

  const handleCartChange = () => {
    if (shortProdInfo) {
      if (id && cartProducts.some(product => product.id === shortProdInfo.id)) {
        deleteFromCart(shortProdInfo.id);
      } else {
        addToCart(shortProdInfo);
      }
    }
  };

  useEffect(() => {
    document.title = `${selectedProduct ? selectedProduct.name : `Product details`} - Nice Gadgets (UA)`;
  }, [selectedProduct]);

  return (
    <div className="productDetails">
      {isLoader ? (
        <ProductDetailsSkeleton />
      ) : (
        <>
          {!selectedProduct ? (
            <>
              <div className="container">
                <h1>Product was not found</h1>
                <div className="productDetails__image-block">
                  <img
                    src={imagesForPage.images.productNotFound}
                    alt="cartEmpty"
                    className="productDetails__image"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="container">
              <NavigationPath selectedProduct={selectedProduct} />
              <h2>{name}</h2>
              <section className="productDetails__product">
                <article
                  className="
                  productDetails__product--photoBlock
                  photoBlock
                "
                >
                  <div className="photoBlock__small-photoes">
                    {images?.map(image => (
                      <img
                        key={image}
                        src={image}
                        alt="phoneImage"
                        className={classNames(
                          'photoBlock__small-photoes--photo',
                          {
                            'photoBlock__small-photoes--photo-hover':
                              mainPhoto === image,
                          },
                        )}
                        onMouseEnter={() => setMainPhoto(image)}
                      />
                    ))}
                  </div>
                  <div className="photoBlock__big-photo">
                    <img
                      src={mainPhoto}
                      alt="phoneImage"
                      className="photoBlock__big-photo--photo"
                    />
                  </div>
                </article>

                <article
                  className="
              productDetails__product--charactBlock charactBlock
            "
                >
                  <div className="charactBlock__colorsBlock">
                    <div className="charactBlock__colorsBlock--textBlock">
                      <p className="charactBlock__colorsBlock--text smallText">
                        Available colors
                      </p>
                      {id && (
                        <p className="charactBlock__colorsBlock--id smallText">
                          {`ID: ${getIdForProduct(allProducts, id)}`}
                        </p>
                      )}
                    </div>
                    <div className="charactBlock__colorsBlock--colors">
                      {colorsAvailable
                        ?.sort((a, b) => b.localeCompare(a))
                        .map(currentColor => (
                          <Link
                            to={`${getProductLink(category, namespaceId, currentColor, capacity)}`}
                            key={currentColor}
                            className={classNames(
                              'charactBlock__colorsBlock--colors-container',
                              {
                                // eslint-disable-next-line max-len
                                'charactBlock__colorsBlock--colors-container-active':
                                  color === currentColor,
                              },
                            )}
                          >
                            <div
                              style={{
                                backgroundColor: getNormalColor(currentColor),
                              }}
                              className="
                                charactBlock__colorsBlock--colors-color
                              "
                            ></div>
                          </Link>
                        ))}
                    </div>
                  </div>
                  <div className="charactBlock__capacityBlock">
                    <p className="charactBlock__capacityBlock--text smallText">
                      Select capacity
                    </p>
                    <div className="charactBlock__capacityBlock--capacities">
                      {capacityAvailable?.map(currentCapacity => (
                        <Link
                          to={`${getProductLink(category, namespaceId, color, currentCapacity)}`}
                          key={currentCapacity}
                          className={classNames(
                            'charactBlock__capacityBlock--capacity',
                            {
                              'charactBlock__capacityBlock--capacity-active':
                                capacity === currentCapacity,
                            },
                          )}
                        >
                          {currentCapacity}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="charactBlock__priceBlock">
                    <div className="charactBlock__priceBlock--prices">
                      <h2 className="charactBlock__priceBlock--mainPrice">
                        {`$${priceDiscount}`}
                      </h2>
                      <p className="charactBlock__priceBlock--fullPrice">
                        {`$${priceRegular}`}
                      </p>
                    </div>
                    <div className="charactBlock__priceBlock--item-bottom">
                      {shortProdInfo &&
                      cartProducts.some(
                        favourite => favourite.id === shortProdInfo.id,
                      ) ? (
                        <button
                          onClick={handleCartChange}
                          className="
                      charactBlock__priceBlock--buttonCart
                      charactBlock__priceBlock--buttonCart-active
                    "
                        >
                          Added
                        </button>
                      ) : (
                        <button
                          onClick={handleCartChange}
                          className="charactBlock__priceBlock--buttonCart"
                        >
                          Add to cart
                        </button>
                      )}

                      <button
                        className="
                    charactBlock__priceBlock--buttonHeart button
                  "
                        onClick={handleFavouriteChange}
                      >
                        {shortProdInfo &&
                        favouriteProducts.some(
                          favourite => favourite.id === shortProdInfo.id,
                        ) ? (
                          <img
                            src={imagesForPage.images.heartActive}
                            alt="favourite"
                          />
                        ) : (
                          <img
                            src={imagesForPage.images.heart}
                            alt="favourite"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="charactBlock__characts">
                    {characteristics
                      .filter(({ text }) => text)
                      .slice(0, 4)
                      .map(({ title, text }) => (
                        <div key={title} className="techSpecs__textBlock">
                          <p
                            className="
                        techSpecs__textBlock--param-left
                        bodyText charactBlock__characts--text"
                          >
                            {title}
                          </p>
                          <p
                            className="
                        techSpecs__textBlock--param-right
                        bodyText charactBlock__characts--text"
                          >
                            {text}
                          </p>
                        </div>
                      ))}
                  </div>
                </article>

                {id && (
                  <span className="productDetails__product--id smallText">
                    {`ID: ${getIdForProduct(allProducts, id)}`}
                  </span>
                )}
              </section>

              <section className="productDetails__info">
                <article className="productDetails__info--about about">
                  <h3 className="about__title">About</h3>
                  {description?.map(({ title, text }) => (
                    <div key={title} className="about__textBlock">
                      <h4>{title}</h4>
                      <p className="bodyText about__textBlock--text">{text}</p>
                    </div>
                  ))}
                </article>
                <article className="productDetails__info--techSpecs techSpecs">
                  <h3 className="techSpecs__title">Tech specs</h3>
                  {characteristics
                    .filter(({ text }) => text)
                    .map(({ title, text }) => (
                      <div key={title} className="techSpecs__textBlock">
                        <p
                          className="
                            techSpecs__textBlock--param-left
                            bodyText
                          "
                        >
                          {title}
                        </p>
                        <p
                          className="
                      techSpecs__textBlock--param-right
                      bodyText
                      techSpecs__textBlock--overflow
                    "
                        >
                          {text}
                        </p>
                      </div>
                    ))}
                </article>
              </section>
            </div>
          )}

          <section className="productDetails__slider">
            {isSliderLoader ? (
              <SliderSkeleton />
            ) : (
              <Slider
                title={types.SliderTitle.YouMayAlsoLike}
                products={YouMayAlsoLikeProducts}
              />
            )}
          </section>
        </>
      )}
    </div>
  );
};
