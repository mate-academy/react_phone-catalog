import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Phone';
import { getPrevPrice } from '../../utils/getPrevPrice';
import {
  LocaleDataTypes, isAdded, setStorage,
} from '../../utils/localeStorage';
import { RedHeart, WhiteHeart } from '../../utils/Icons';
import { generateUrlPath } from '../../utils/generateUrlPath';
import { ProductType } from '../../api/getProducts';

interface Props {
  product: Product;
  setVisibleProducts?: React.Dispatch<React.SetStateAction<Product[]>>
}

const ProductCard: React.FC<Props> = ({ product, setVisibleProducts }) => {
  const {
    capacity,
    discount,
    id,
    imageUrl,
    name,
    price,
    ram,
    screen,
    type,
  } = product;

  const [
    isFavorite,
    setIsFavorite,
  ] = useState<boolean>(isAdded(id, LocaleDataTypes.FAVORITES));

  const [
    isAddedToCart,
    setIsAddedToCart,
  ] = useState<boolean>(isAdded(id, LocaleDataTypes.CART));

  const handleFavoriteButtonClick = () => {
    setStorage(id, LocaleDataTypes.FAVORITES);
    setIsFavorite(!isAdded(id, LocaleDataTypes.FAVORITES));

    if (setVisibleProducts) {
      setVisibleProducts(prevProds => [...prevProds].filter(
        prevProduct => prevProduct.id !== product.id,
      ));
    }
  };

  return (
    <article
      data-cy="cardsContainer"
      className="browse-products__product product-card"
    >
      <div className="product__wrapper">
        <Link to={`/${generateUrlPath(type as ProductType)}/${id}`}>
          <img
            className="product-card--image"
            src={`${imageUrl}`}
            alt={`${name}`}
          />
          <div className="product-card--info">
            <p
              className="product-card--name"
            >
              {name}
            </p>
            <div className="product-card--price">
              <h3 className="product-card--new-price">
                {`$${price}`}
              </h3>
              {discount !== 0 && (
                <p className="product-card--old-price">
                  {`$${getPrevPrice(price, discount)}`}
                </p>
              )}
            </div>
          </div>
          <div className="product-card--features">
            <div className="product-card--feature">
              <h4
                className="product-card--feature-title"
              >
                Screen
              </h4>
              <p
                className="product-card--feature-value"
              >
                {screen || 'No information'}
              </p>
            </div>
            <div className="product-card--feature">
              <p className="product-card--feature-title">Capacity</p>
              <p className="product-card--feature-value">
                {capacity || 'No information'}
              </p>
            </div>
            <div className="product-card--feature">
              <p className="product-card--feature-title">RAM</p>
              <p
                className="product-card--feature-value"
              >
                {ram || 'No information'}
              </p>
            </div>
          </div>
        </Link>
        <div className="product-card--buttons">
          <button
            type="button"
            className={`product-card--add-to-cart${classNames({ '--added': isAddedToCart })}`}
            onClick={() => {
              setStorage(id, LocaleDataTypes.CART);
              setIsAddedToCart(!isAdded(id, LocaleDataTypes.CART));
            }}
          >
            {isAddedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            type="button"
            className="product-card--add-to-favorites"
            onClick={() => handleFavoriteButtonClick()}
            data-cy="addToFavorite"
          >
            {isFavorite ? <RedHeart /> : <WhiteHeart />}
          </button>
        </div>
      </div>
    </article>
  );
};

ProductCard.defaultProps = {
  setVisibleProducts: undefined,
};

export default ProductCard;
