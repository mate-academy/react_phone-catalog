import React from 'react';
import { icons } from '../../utils/icons';
import { NavLink } from 'react-router-dom';
import { ProductCardItem } from '../../types/CartItem';

type Props = {
  products: ProductCardItem;
  productsDiscount?: number;

  isFavourite: (id: string) => boolean;
  isCarts: (id: string) => boolean;

  handleToggleFavourite: (item: ProductCardItem) => void;
  handleToggleCarts: (item: ProductCardItem) => void;
};

export const ProductCard: React.FC<Props> = ({
  products,
  productsDiscount,
  isFavourite,
  isCarts,
  handleToggleFavourite,
  handleToggleCarts,
}) => {
  return (
    <div className="product product--all">
      <div className="product__image">
        <NavLink
          to={`/${products.category}/${products.itemId}`}
          end
          className="product__image__link"
        >
          <img
            className="product__image--phone"
            src={products.image}
            alt="Logo phone"
          />
        </NavLink>
      </div>
      <NavLink to={`/${products.category}/${products.itemId}`}>
        <div className="product__title text-body">{products.name}</div>
      </NavLink>
      <div className="product__price">
        {productsDiscount ? (
          <>
            <div className="product__price--sale text-h3">
              ${products.price}
            </div>
            <div className="product__price--fullprice">
              ${products.fullPrice}
            </div>
          </>
        ) : (
          <div className="product__price--sale text-h3">
            ${products.fullPrice}
          </div>
        )}
      </div>
      <div className="product__info text-small">
        <div className="product__info__section">
          <div className="product__info--key">Screen</div>
          <div className="product__info--value">{products.screen}</div>
        </div>
        <div className="product__info__section">
          <div className="product__info--key">Capacity</div>
          <div className="product__info--value">{products.capacity}</div>
        </div>
        <div className="product__info__section">
          <div className="product__info--key">RAM</div>
          <div className="product__info--value">{products.ram}</div>
        </div>
      </div>
      <div className="product__button">
        <div className="product__button--cart">
          <button
            className={
              isCarts(products.id)
                ? 'logo logo__c logo__c--phones logo__c--active'
                : 'logo logo__c logo__c--phones'
            }
            onClick={() => handleToggleCarts(products)}
          >
            {isCarts(products.id) ? (
              <p className="product__button__name--active text-button">
                Added to cart
              </p>
            ) : (
              <p className="product__button__name text-button">Add to cart</p>
            )}
          </button>
        </div>
        <div className="product__button--accessories">
          <button
            className="logo logo__f logo__f--phones"
            onClick={() => handleToggleFavourite(products)}
          >
            <img
              className="icon icon__favourites icon__favourites--phones"
              src={
                isFavourite(products.id)
                  ? icons.favActive
                  : icons.logoFavourites
              }
              alt="Logo"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
