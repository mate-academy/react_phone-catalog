/* eslint-disable react/button-has-type */
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import './ProductDetalisCard.scss';
import { getUniqueId } from '../../helpers/getFunctions/getUniqueld';
import { addProduct } from '../../helpers/addFunction/addProduct';
import { ProductsContext } from '../ProductsContext';
import { Product } from '../../types/Product';
import { CartProduct } from '../../types/CartProduct';

type Props = {
  product: ProductDetails,
};

const colors = {
  spacegray: '#4c4c4c',
  gold: '#fcdbc1',
  silver: '#f0f0f0',
  midnightgreen: '#5f7170',
  green: '#e7f4db',
  black: '#262827',
  yellow: '#fbd453',
  white: '#ffff',
  purple: '#d4d1dc',
  red: '#970013',
  coral: '#fc644f',
};

export const ProductDetalisCard: React.FC<Props> = ({ product }) => {
  const [imgActive, setImgActive] = useState(0);
  const images = product.images ?? [];

  const colorsAvailable = product.colorsAvailable ?? [];
  const capacitysAvailable = product.capacityAvailable ?? [];
  const description = product.description ?? [];
  const cell = product.cell ?? [];

  const getLink = (property: string, value: string) => {
    if (property === 'color'
      || property === 'capacity'
    ) {
      const category = window.location.hash.split('/')[1];
      const link = product.id.replace(
        product[property].toLocaleLowerCase(),
        value.toLocaleLowerCase(),
      );

      return `/${category}/${link}`;
    }

    return '/';
  };

  const {
    favorites,
    setFavorites,
    carts,
    setCarts,
  } = useContext(ProductsContext);

  const isFavorite
    = favorites.find(productCurrent => productCurrent.id === product.id);

  const isCart
    = carts.find(productCurrent => productCurrent.id === product.id);

  const labelAddCartBtn = isCart ? 'Added to cart' : 'Add to cart';

  const normalaizeProduct = () => (
    {
      id: product.id,
      category: window.location.hash.split('/')[1],
      phoneId: product.id,
      itemId: product.id,
      name: product.name,
      fullPrice: product.priceRegular,
      price: product.priceDiscount,
      screen: product.screen,
      capacity: product.capacity,
      color: product.color,
      ram: product.ram,
      year: 2016,
      image: product.images[0],
    }
  );

  const hableFavoriteBtn = () => {
    const newProduct: Product = normalaizeProduct();

    addProduct<Product>(newProduct, favorites, setFavorites);
  };

  const hableAddCartBtn = () => {
    const newProduct: Product = normalaizeProduct();

    addProduct<CartProduct>({ ...newProduct, quantity: 1 }, carts, setCarts);
  };

  const handleBtnImage = (index: number) => {
    setImgActive(index);
  };

  return (
    <div className="product-details-card">
      <h1 className="product-details-card__title">
        {product.name}
      </h1>

      <div className="product-details-card__header">
        <ul className="product-details-card__controls-img-btn">
          {
            images.map((image, index) => (
              <li
                key={getUniqueId()}
                className="product-details__item"
              >
                <button
                  className={classNames(
                    'product-details-card__btn-img',
                    {
                      'product-details-card__btn-img--active':
                        imgActive === index,
                    },
                  )}
                  onClick={() => handleBtnImage(index)}
                >
                  <img
                    src={`./_new/${image}`}
                    alt={product.name}
                    className="product-details-card__img"
                  />
                </button>
              </li>
            ))
          }
        </ul>

        <div className="product-details-card__main-img-container">
          <img
            src={`./_new/${images[imgActive]}`}
            alt=""
            className="product-details-card__img"
          />
        </div>

        <div className="product-details-card__active-panel active-panel">
          <div className="active-panel__available-colors">
            <h3 className="active-panel__title">
              Available colors
            </h3>

            <ul className="active-panel__color-list">
              {
                colorsAvailable.map(color => (
                  <li
                    key={getUniqueId()}
                    className="active-panel__item"
                  >
                    <NavLink
                      to={getLink('color', color)}
                      className={classNames(
                        'active-panel__btn-color',
                        {
                          'active-panel__btn-color--active':
                            product.color === color,
                        },
                      )}
                    >
                      <div
                        className="active-panel__color"
                        style={{
                          backgroundColor: `${(colors as Record<string, string>)[color] || ''}`,
                        }}
                      />
                    </NavLink>
                  </li>
                ))
              }
            </ul>

            <div className="active-panel__separator" />
          </div>

          <div className="active-panel__select-capacity">
            <h3 className="active-panel__title">
              Select capacity
            </h3>

            <ul className="active-panel__capacity-list">
              {
                capacitysAvailable.map(capacity => (
                  <li
                    key={getUniqueId()}
                    className="active-panel__item"
                  >
                    <NavLink
                      to={getLink('capacity', capacity)}
                      className={classNames(
                        'button',
                        'active-panel__btn-capacity',
                        {
                          'active-panel__btn-capacity--active':
                            product.capacity === capacity,
                        },
                      )}
                    >
                      {capacity}
                    </NavLink>
                  </li>
                ))
              }
            </ul>

            <div className="active-panel__separator" />
          </div>

          <div className="active-panel__price">
            <h3 className="active-panel__price-discount">
              {`$${product.priceDiscount}`}
            </h3>

            <p className="active-panel__price-regular">
              {`$${product.priceRegular}`}
            </p>
          </div>

          <div className="active-panel__add-panel">
            <button
              onClick={hableAddCartBtn}
              className={classNames(
                'active-panel__btn-cart',
                'button button__primary',
                {
                  'button__primary--active': isCart,
                },
              )}
            >
              {labelAddCartBtn}
            </button>

            <button
              onClick={hableFavoriteBtn}
              className="active-panel__btn-favorite button"
            >
              <div className={
                classNames(
                  'icon',
                  'icon__favorites',
                  {
                    'icon__favorites--active': isFavorite,
                  },
                )
              }
              />
            </button>
          </div>

          <div className="active-panel__specifications">
            <div className="active-panel__specification">
              <p className="active-panel__specification-title">
                Screen
              </p>

              <p className="active-panel__specification-value">
                {product.screen}
              </p>
            </div>

            <div className="active-panel__specification">
              <p className="active-panel__specification-title">
                Capacity
              </p>

              <p className="active-panel__specification-value">
                {product.capacity}
              </p>
            </div>

            <div className="active-panel__specification">
              <p className="active-panel__specification-title">
                RAM
              </p>

              <p className="active-panel__specification-value">
                {product.ram}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details-card__bottom">
        <div className="product-details-card__about">
          <h2 className="product-details-card__section-title">
            About
          </h2>

          <div className="product-details-card__separator" />
          {
            description.map(paragraph => (
              <div
                key={getUniqueId()}
                className="product-details-card__description description"
              >
                <h3 className="description__title">
                  {paragraph.title}
                </h3>

                <p className="description__text">
                  {paragraph.text}
                </p>

              </div>
            ))
          }
        </div>

        <div className="product-details-card__tech">
          <h2 className="product-details-card__section-title">
            Tech specs
          </h2>

          <div className="product-details-card__separator" />

          <div className="product-details-card__specifications specifications">
            <div className="specifications__specification">
              <p className="specifications__title">
                Screen
              </p>

              <p className="specifications__value">
                {product.screen}
              </p>
            </div>

            <div className="specifications__specification">
              <p className="specifications__title">
                Resolution
              </p>

              <p className="specifications__value">
                {product.resolution}
              </p>
            </div>

            <div className="specifications__specification">
              <p className="specifications__title">
                Processor
              </p>

              <p className="specifications__value">
                {product.processor}
              </p>
            </div>

            <div className="specifications__specification">
              <p className="specifications__title">
                RAM
              </p>

              <p className="specifications__value">
                {product.ram}
              </p>
            </div>

            <div className="specifications__specification">
              <p className="specifications__title">
                Built in memory
              </p>

              <p className="specifications__value">
                {product.capacity}
              </p>
            </div>

            <div className="specifications__specification">
              <p className="specifications__title">
                Camera
              </p>

              <p className="specifications__value">
                {product.camera}
              </p>
            </div>

            <div className="specifications__specification">
              <p className="specifications__title">
                Zoom
              </p>

              <p className="specifications__value">
                {product.zoom}
              </p>
            </div>

            <div className="specifications__specification">
              <p className="specifications__title">
                Cell
              </p>

              <div className="specifications__cell">
                {cell.map((value, index) => (
                  <p
                    key={getUniqueId()}
                    className="specifications__value"
                  >
                    {`${value}${index === cell.length - 1 ? '' : ','} `}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
