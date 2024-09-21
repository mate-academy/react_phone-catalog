import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Price } from '../Price/Price';
import { FavouriteButton } from '../FavouriteButton/FavouriteButton';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import { AddToCartBtn } from '../AddToCartBtn/AddToCartBtn';

interface ProductItemProps {
  product: Phone | Tablet | Accessory;
  section: string;
}

type LinkTo = {
  pathname: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any;
};

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  section,
}) => {
  const location = useLocation();

  const handleLinkClick = () => {
    const scrollPosition = window.scrollY;

    localStorage.setItem('scrollPosition', scrollPosition.toString());
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    product && (
      <div
        className={`page__product-item product-item ${section}__product-item`}
      >
        <Link
          to={
            {
              pathname: `/${product.category}/${product.id}`,
              state: { form: location.pathname },
            } as LinkTo
          }
          className="product-item__image-box"
          onClick={handleLinkClick}
        >
          {product.images && product.images.length > 0 && (
            <img
              src={`/${product.images[0]}`}
              alt=""
              className={`product-item__image ${section}__item-image`}
            />
          )}
        </Link>
        <div className="product-item__info-box">
          <h3 className="product-item__name">{product.name}</h3>
          <Price currentItem={product} section={section} />
          <div className="product-item__info">
            <span className="product-item__info-titel product-item__info-side">
              Screen
            </span>
            <span
              className="
              product-item__info-description product-item__info-side"
            >
              {product.screen}
            </span>
          </div>
          <div className="product-item__info">
            <span className="product-item__info-titel">Capacity</span>
            <span className="product-item__info-description">
              {product.capacity}
            </span>
          </div>
          <div className="product-item__info">
            <span className="product-item__info-titel">RAM</span>
            <span className="product-item__info-description">
              {product.ram}
            </span>
          </div>
          <div className="product-item__action-box">
            <AddToCartBtn product={product} />
            {/* <button className="product-item__add-to-cart">Add to cart</button> */}
            <FavouriteButton product={product} />
          </div>
        </div>
      </div>
    )
  );
};
