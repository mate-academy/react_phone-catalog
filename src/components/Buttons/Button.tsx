/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
import React from 'react';
import { useProduct } from '../../store/Store';
import { Product } from '../../types/Product';

type PropsButtonsAddToCart = {
  title: string;
  size: 'small' | 'large';
  product: Product;
};

type PropsFavourites = {
  product: Product;
};

type PropsButtonDeleteCart = {
  handleDeleteCart: (product: Product) => void;
  product: Product;
};

export const RotatedButton: React.FC = () => {
  return (
    <button className="button button--default footer__button">
      <svg
        className="button__svg button__svg--default footer__button-svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
          fill="#E2E6E9"
        />
      </svg>
    </button>
  );
};

export const ButtonsAddToCart: React.FC<PropsButtonsAddToCart> = ({
  title,
  size = 'small',
  product,
}) => {
  const { cart, handleAddToCart } = useProduct();

  const buttonClass =
    size === 'large' ? 'button__cart--large' : 'button__cart--small';

  const isCart = cart.some(item => item.id === product.id);

  return (
    <>
      {isCart ? (
        <button
          className={`button__cart ${buttonClass} ${isCart ? 'button__cart-active' : ''}`}
          onClick={() => handleAddToCart(product)}
        >
          Added to card
        </button>
      ) : (
        <button
          className={`button__cart ${buttonClass}`}
          onClick={() => handleAddToCart(product)}
        >
          {title}
        </button>
      )}
    </>
  );
};

export const ButtonsFavourites: React.FC<PropsFavourites> = ({ product }) => {
  const { favourites, setFavourites } = useProduct();

  const isFavourites = favourites.some(item => item.id === product.id);

  const handleAddToFavourites = (currentProduct: Product) => {
    let newProduct: Product[];

    if (favourites.some(item => item.id === currentProduct.id)) {
      newProduct = favourites.filter(
        prevFavourites => prevFavourites.id !== currentProduct.id,
      );
    } else {
      newProduct = [currentProduct, ...favourites];
    }

    setFavourites(newProduct);
  };

  return (
    <button
      className="button__favourites"
      onClick={() => handleAddToFavourites(product)}
    >
      {isFavourites ? (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="39"
            rx="19.5"
            stroke="#E2E6E9"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.3 13.2988C22.7264 13.2988 22.1584 13.4118 21.6285 13.6314C21.0986 13.8509 20.6171 14.1728 20.2116 14.5785L20 14.7901L19.7884 14.5784C18.9693 13.7593 17.8584 13.2991 16.7 13.2991C15.5417 13.2991 14.4308 13.7593 13.6117 14.5784C12.7927 15.3974 12.3325 16.5083 12.3325 17.6667C12.3325 18.825 12.7927 19.9359 13.6117 20.755L19.5051 26.6483C19.7784 26.9217 20.2217 26.9217 20.495 26.6483L26.3884 20.755C26.794 20.3495 27.1158 19.8681 27.3353 19.3382C27.5549 18.8083 27.6679 18.2403 27.6679 17.6667C27.6679 17.0931 27.5549 16.5251 27.3353 15.9951C27.1158 15.4653 26.7941 14.9839 26.3885 14.5785C25.983 14.1728 25.5015 13.8509 24.9716 13.6314C24.4416 13.4118 23.8737 13.2988 23.3 13.2988Z"
            fill="#F4BA47"
          />
        </svg>
      ) : (
        <svg
          className="button__favourites-svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="39"
            rx="19.5"
            stroke="#B4BDC4"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.6285 13.6314C22.1584 13.4118 22.7264 13.2988 23.3 13.2988C23.8737 13.2988 24.4416 13.4118 24.9716 13.6314C25.5015 13.8509 25.983 14.1728 26.3885 14.5785C26.7941 14.9839 27.1158 15.4653 27.3353 15.9951C27.5549 16.5251 27.6679 17.093 27.6679 17.6667C27.6679 18.2403 27.5549 18.8083 27.3353 19.3382C27.1158 19.8681 26.794 20.3495 26.3884 20.755C26.3883 20.755 26.3884 20.7549 26.3884 20.755L20.495 26.6483C20.2217 26.9217 19.7784 26.9217 19.5051 26.6483L13.6117 20.755C12.7927 19.9359 12.3325 18.825 12.3325 17.6667C12.3325 16.5083 12.7927 15.3974 13.6117 14.5784C14.4308 13.7593 15.5417 13.2991 16.7 13.2991C17.8584 13.2991 18.9693 13.7593 19.7884 14.5784L20 14.79L20.2116 14.5785C20.2116 14.5785 20.2117 14.5784 20.2116 14.5785C20.6171 14.1728 21.0986 13.8509 21.6285 13.6314ZM25.3983 15.5682C25.1228 15.2926 24.7957 15.0739 24.4357 14.9247C24.0756 14.7756 23.6898 14.6988 23.3 14.6988C22.9103 14.6988 22.5245 14.7756 22.1644 14.9247C21.8044 15.0739 21.4773 15.2926 21.2018 15.5682L20.495 16.275C20.2217 16.5483 19.7784 16.5483 19.5051 16.275L18.7984 15.5683C18.2419 15.0118 17.4871 14.6991 16.7 14.6991C15.913 14.6991 15.1582 15.0118 14.6017 15.5683C14.0452 16.1248 13.7325 16.8796 13.7325 17.6667C13.7325 18.4537 14.0452 19.2085 14.6017 19.765L20 25.1634L25.3984 19.765C25.674 19.4895 25.8928 19.1623 26.042 18.8023C26.1911 18.4423 26.2679 18.0564 26.2679 17.6667C26.2679 17.277 26.1911 16.8911 26.042 16.531C25.8928 16.171 25.6739 15.8437 25.3983 15.5682Z"
            fill="#0F0F11"
          />
        </svg>
      )}
    </button>
  );
};

export const ArrowRight: React.FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.52827 3.52861C5.78862 3.26826 6.21073 3.26826 6.47108 3.52861L10.4711 7.52861C10.7314 7.78896 10.7314 8.21107 10.4711 8.47141L6.47108 12.4714C6.21073 12.7318 5.78862 12.7318 5.52827 12.4714C5.26792 12.2111 5.26792 11.789 5.52827 11.5286L9.05687 8.00001L5.52827 4.47141C5.26792 4.21107 5.26792 3.78896 5.52827 3.52861Z"
        fill="#B4BDC4"
      />
    </svg>
  );
};

export const ArrowLeft: React.FC = () => {
  return (
    <svg
      className="arrow__left"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.52827 3.52861C5.78862 3.26826 6.21073 3.26826 6.47108 3.52861L10.4711 7.52861C10.7314 7.78896 10.7314 8.21107 10.4711 8.47141L6.47108 12.4714C6.21073 12.7318 5.78862 12.7318 5.52827 12.4714C5.26792 12.2111 5.26792 11.789 5.52827 11.5286L9.05687 8.00001L5.52827 4.47141C5.26792 4.21107 5.26792 3.78896 5.52827 3.52861Z"
        fill="#0F0F11"
      />
    </svg>
  );
};

export const ButtonCartDelete: React.FC<PropsButtonDeleteCart> = ({
  handleDeleteCart,
  product,
}) => {
  return (
    <button
      className="cart__button cart__button-delete"
      onClick={() => handleDeleteCart(product)}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cart__product-svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.4721 4.47138C12.7324 4.21103 12.7324 3.78892 12.4721 3.52858C12.2117 3.26823 11.7896 3.26823 11.5292 3.52858L8.00065 7.05717L4.47206 3.52858C4.21171 3.26823 3.7896 3.26823 3.52925 3.52858C3.2689 3.78892 3.2689 4.21103 3.52925 4.47138L7.05784 7.99998L3.52925 11.5286C3.2689 11.7889 3.2689 12.211 3.52925 12.4714C3.7896 12.7317 4.21171 12.7317 4.47206 12.4714L8.00065 8.94279L11.5292 12.4714C11.7896 12.7317 12.2117 12.7317 12.4721 12.4714C12.7324 12.211 12.7324 11.7889 12.4721 11.5286L8.94346 7.99998L12.4721 4.47138Z"
          fill="#B4BDC4"
        />
      </svg>
    </button>
  );
};
