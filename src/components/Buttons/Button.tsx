/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
import React from 'react';

type PropsButtonsAddToCart = {
  title: string;
  size: 'small' | 'large';
};

export const ButtonsLeft: React.FC = () => {
  return (
    <button className="button button--disabled">
      <svg
        className="button__svg button__svg--disabled"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.4712 3.52864C10.2109 3.26829 9.78878 3.26829 9.52843 3.52864L5.52843 7.52864C5.26808 7.78899 5.26808 8.2111 5.52843 8.47145L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00004L10.4712 4.47145C10.7316 4.2111 10.7316 3.78899 10.4712 3.52864Z"
          fill="#B4BDC4"
        />
      </svg>
    </button>
  );
};

export const ButtonsRight: React.FC = () => {
  return (
    <button className="button button--default">
      <svg
        className="button__svg button__svg--default"
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
}) => {
  const buttonClass =
    size === 'large' ? 'button__cart--large' : 'button__cart--small';

  return <button className={`button__cart ${buttonClass}`}>{title}</button>;
};

export const ButtonsFavourites: React.FC = () => {
  return (
    <button className="button__favourites">
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

export const ButtonCartDisabled: React.FC = () => {
  return (
    <button className="cart__button cart__button-disabled">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="15.5"
          stroke="#E2E6E9"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.666 16C10.666 15.6318 10.9645 15.3333 11.3327 15.3333H20.666C21.0342 15.3333 21.3327 15.6318 21.3327 16C21.3327 16.3682 21.0342 16.6666 20.666 16.6666H11.3327C10.9645 16.6666 10.666 16.3682 10.666 16Z"
          fill="#B4BDC4"
        />
      </svg>
    </button>
  );
};

export const ButtonCartActive: React.FC = () => {
  return (
    <button className="cart__button cart__button-active">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="15.5"
          stroke="#B4BDC4"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.666 11.3334C16.666 10.9652 16.3675 10.6667 15.9993 10.6667C15.6312 10.6667 15.3327 10.9652 15.3327 11.3334V15.3334H11.3327C10.9645 15.3334 10.666 15.6318 10.666 16C10.666 16.3682 10.9645 16.6667 11.3327 16.6667H15.3327V20.6667C15.3327 21.0349 15.6312 21.3334 15.9993 21.3334C16.3675 21.3334 16.666 21.0349 16.666 20.6667V16.6667H20.666C21.0342 16.6667 21.3327 16.3682 21.3327 16C21.3327 15.6318 21.0342 15.3334 20.666 15.3334H16.666V11.3334Z"
          fill="#0F0F11"
        />
      </svg>
    </button>
  );
};

export const ButtonCartDelete: React.FC = () => {
  return (
    <button className="cart__button cart__button-delete">
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

export const ButtonPaginationLeft: React.FC = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="-0.5"
        y="0.5"
        width="31"
        height="31"
        rx="15.5"
        transform="matrix(-1 0 0 1 31 0)"
        stroke="#B4BDC4"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.4717 11.5288C18.2114 11.2684 17.7893 11.2684 17.5289 11.5288L13.5289 15.5288C13.2686 15.7891 13.2686 16.2112 13.5289 16.4716L17.5289 20.4716C17.7893 20.7319 18.2114 20.7319 18.4717 20.4716C18.7321 20.2112 18.7321 19.7891 18.4717 19.5288L14.9431 16.0002L18.4717 12.4716C18.7321 12.2112 18.7321 11.7891 18.4717 11.5288Z"
        fill="#0F0F11"
      />
    </svg>
  );
};

export const ButtonPaginationRight: React.FC = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#B4BDC4" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.5283 11.5288C13.7886 11.2684 14.2107 11.2684 14.4711 11.5288L18.4711 15.5288C18.7314 15.7891 18.7314 16.2112 18.4711 16.4716L14.4711 20.4716C14.2107 20.7319 13.7886 20.7319 13.5283 20.4716C13.2679 20.2112 13.2679 19.7891 13.5283 19.5288L17.0569 16.0002L13.5283 12.4716C13.2679 12.2112 13.2679 11.7891 13.5283 11.5288Z"
        fill="#0F0F11"
      />
    </svg>
  );
};

export const ButtonPaginationCount: React.FC = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="phones__button-count"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#E2E6E9" />
      <path
        d="M14.5326 11.69V12.754H16.3246V21H17.4586V11.69H14.5326Z"
        fill="#0F0F11"
      />
    </svg>
  );
};
