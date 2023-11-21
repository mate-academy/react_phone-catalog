import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './Context';
import { Product } from './types/Product';
import {
  updateCart,
  updateFavourites,
} from './utils/productManipulations';

type Props = {
  product: Product | null,
  favouritesTimeout?: number
};

export const ProductCard: React.FC<Props> = ({
  product,
  favouritesTimeout,
}) => {
  const {
    chosenProducts,
    productsToBuy,
    setChosenProducts,
    setProductsToBuy,
    setLoadingItem,
  } = useContext(Context);

  // eslint-disable-next-line
  console.log(chosenProducts)

  return (
    product && (
      <Link
        className="product__link"
        to={`/${product.type}s/${product.id}`}
      >
        {product && (
          <div className="product">
            <img className="product__image" src={product.imageUrl.split('phones').join('products')} alt={`${product.id}`} />
            <h3 className="product__title">{product.name}</h3>
            <div className="product__price_container">
              {product.discount === 0 ? (
                <div className="product__price">{`$${product.price}`}</div>
              ) : (
                <>
                  <div className="product__price">{`$${product.price - (product.price * product.discount) / 100}`}</div>
                  <div className="product__price product__price--old">{`$${product.price}`}</div>
                </>
              )}
            </div>
            <div className="product__line" />
            <div className="product__info_container">
              <div className="product__info">Screen</div>
              <div className="product__info--value">
                {product.screen || '-'}
              </div>
            </div>
            <div className="product__info_container">
              <div className="product__info">Capacity</div>
              <div className="product__info--value">
                {product.capacity || '-'}
              </div>
            </div>
            <div
              className="product__info_container product__info_container--last"
            >
              <div className="product__info">RAM</div>
              <div className="product__info--value">{product.ram || '-'}</div>
            </div>
            <div className="product__button_container">
              <button
                type="button"
                className={classNames(
                  'product__button_add',
                  {
                    'product__button_add--active':
                    productsToBuy.find(device => device.id === product.id),
                  },
                )}
                onClick={(event) => updateCart(
                  productsToBuy,
                  setProductsToBuy,
                  event,
                  product,
                )}
              >
                {productsToBuy.find(device => device.id === product.id)
                  ? 'Added to cart'
                  : 'Add to cart'}
              </button>
              <button
                type="button"
                aria-label="favourites"
                className={classNames(
                  'product__button_favourites',
                  {
                    'product__button_favourites--active':
                    chosenProducts.find(device => device.id === product.id),
                  },
                )}
                onClick={(event) => updateFavourites(
                  chosenProducts,
                  setChosenProducts,
                  setLoadingItem,
                  event,
                  product,
                  favouritesTimeout,
                )}
              />
            </div>
          </div>
        )}
      </Link>
    )
  );
};

ProductCard.defaultProps = {
  favouritesTimeout: 0,
};
