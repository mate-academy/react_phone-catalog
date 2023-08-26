import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './Context';
import { Product } from './types/Product';
import {
  setCartItemsToLocaleStorage,
  getCartItemsFromLocaleStorage,
  setFavouritesTolocaleStorage,
  getFavouritesFromLocaleStorage,
} from './utils/updateLocaleStorage';

type Props = {
  product: Product | null,
  favouritesTimeout?: number
};

export const ProductCard: React.FC<Props> = ({
  product,
  favouritesTimeout,
}) => {
  const {
    setChosenProducts,
    setProductsToBuy,
    setLoadingItem,
  } = useContext(Context);

  const findProductOnCart = (id: string) => {
    let match = false;

    getCartItemsFromLocaleStorage('toBuy').forEach(device => {
      if (device.id === id) {
        match = true;

        return match;
      }

      return match;
    });

    return match;
  };

  const findProductOnFavourites = (id: string) => {
    let match = false;

    if (getFavouritesFromLocaleStorage('favourites').length > 0) {
      getFavouritesFromLocaleStorage('favourites').map(device => {
        if (device.id === id) {
          match = true;

          return match;
        }

        return match;
      });
    }

    return match;
  };

  const updateFavourites = (event: React.SyntheticEvent, item: Product) => {
    event.preventDefault();

    let ProductIndex = 0;

    getFavouritesFromLocaleStorage('favourites').map((device, index) => {
      if (device.id === item.id) {
        ProductIndex = index;
      }

      return null;
    });

    if (findProductOnFavourites(item.id) === false) {
      const toFavourites = [
        ...getFavouritesFromLocaleStorage('favourites'),
        item,
      ];

      setChosenProducts(toFavourites);
      setFavouritesTolocaleStorage('favourites', toFavourites);
    } else {
      setLoadingItem(ProductIndex);

      const toFavourites = [
        ...getFavouritesFromLocaleStorage('favourites').slice(0, ProductIndex),
        ...getFavouritesFromLocaleStorage('favourites').slice(ProductIndex + 1),
      ];

      setChosenProducts(toFavourites as Product[]);

      setTimeout(() => {
        setFavouritesTolocaleStorage('favourites', toFavourites);
        setLoadingItem(null);
      }, favouritesTimeout);
    }
  };

  return (
    product && (
      <Link
        className="product__link"
        to={`/${product.type}s/${product.id}`}
        onClick={() => {
          localStorage.setItem('product', JSON.stringify(product));
        }}
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
                    findProductOnCart(product.id) === true,
                  },
                )}
                onClick={(event) => {
                  event.preventDefault();

                  if (findProductOnCart(product.id) === false) {
                    const toBuy = [
                      ...getCartItemsFromLocaleStorage('toBuy'),
                      {
                        id: product.id,
                        quantity: 1,
                        product,
                      },
                    ];

                    setCartItemsToLocaleStorage('toBuy', toBuy);
                    setProductsToBuy(toBuy);
                  }
                }}
              >
                {findProductOnCart(product.id) === true
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
                    findProductOnFavourites(product.id),
                  },
                )}
                onClick={(event) => updateFavourites(event, product)}
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
