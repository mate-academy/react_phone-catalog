import classNames from 'classnames';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';

type Props = {
  product: Product,
};

export const ProductCard:React.FC<Props> = ({ product }) => {
  const [handleChange, setHandleChange] = useState(false);

  return (
    <div className="products-slider__item">
      <NavLink
        to={`/${product.type}s/${product.id}`}
        className="products-slider__item-link"
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <i className="far fa-eye" />
      </NavLink>
      <img src={product.imageUrl} alt={product.name} className="products-slider__item-image" />
      <h2 className="products-slider__item-title">{product.name}</h2>
      <p className="products-slider__item-price">
        <span className="products-slider__item-current-price">{`$${product.newPrice}`}</span>
        {product.price !== product.newPrice && (
          <span className="products-slider__item-old-price">{`$${product.price}`}</span>
        )}
      </p>
      <div className="products-slider__item-info">
        <p className="products-slider__item-info-text">
          Screen
          <span>{product.screen || '-'}</span>
        </p>
        <p className="products-slider__item-info-text">
          Capacity
          <span>{product.capacity || '-'}</span>
        </p>
        <p className="products-slider__item-info-text">
          RAM
          <span>{product.ram || '-'}</span>
        </p>
      </div>
      <div className="products-slider__item-buttons">
        <button
          className={classNames('products-slider__item-button products-slider__item-button-cart', {
            'products-slider__item-button-cart--active': localStorage.getItem('carts')?.includes(product.id),
          })}
          type="button"
          onClick={() => {
            let carts = [];

            if (localStorage.getItem('carts')) {
              carts = JSON.parse(localStorage.getItem('carts') || '');
            }

            if (!carts.find((p: CartItem) => p.id === product.id)) {
              localStorage.setItem('carts', JSON.stringify([
                ...carts,
                {
                  id: product.id,
                  count: 1,
                  price: product.newPrice,
                },
              ]));
            } else {
              localStorage.setItem('carts', JSON.stringify([
                ...carts.filter((p: CartItem) => p.id !== product.id),
              ]));
            }

            setHandleChange(!handleChange);
          }}
        >
          Add to cart
        </button>
        <button
          className={classNames('products-slider__item-button products-slider__item-button-favorite', {
            'products-slider__item-button-favorite--active': localStorage.getItem('favorites')?.includes(product.id),
          })}
          type="button"
          onClick={() => {
            let favorites = [];

            if (localStorage.getItem('favorites')) {
              favorites = JSON.parse(localStorage.getItem('favorites') || '');
            }

            if (!favorites.includes(product.id)) {
              localStorage.setItem('favorites', JSON.stringify([
                ...favorites,
                product.id,
              ]));
            } else {
              localStorage.setItem('favorites', JSON.stringify([
                ...favorites.filter((p: string) => p !== product.id),
              ]));
            }

            setHandleChange(!handleChange);
          }}
        >
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
          </svg>

          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M 9.6285 0.6314 C 10.1584 0.4118 10.7264 0.2988 11.3 0.2988 C 11.8737 0.2988 12.4416 0.4118 12.9716 0.6314 C 13.5015 0.8509 13.983 1.1728 14.3885 1.5785 C 14.7941 1.9839 15.1158 2.4653 15.3353 2.9951 C 15.5549 3.5251 15.6679 4.093 15.6679 4.6667 C 15.6679 5.2403 15.5549 5.8083 15.3353 6.3382 C 15.1158 6.8681 14.794 7.3495 14.3884 7.755 C 14.3883 7.755 14.3884 7.7549 14.3884 7.755 L 8.495 13.6483 C 8.2217 13.9217 7.7784 13.9217 7.5051 13.6483 L 1.6117 7.755 C 0.7927 6.9359 0.3325 5.825 0.3325 4.6667 C 0.3325 3.5083 0.7927 2.3974 1.6117 1.5784 C 2.4308 0.7593 3.5417 0.2991 4.7001 0.2991 C 5.8584 0.2991 6.9693 0.7593 7.7884 1.5784 L 8 1.79 L 8.2116 1.5785 C 8.2117 1.5784 8.2116 1.5785 8.2116 1.5785 C 8.6171 1.1728 9.0986 0.8509 9.6285 0.6314 Z Z" fill="#EB5757" />
          </svg>
        </button>
      </div>
    </div>
  );
};
