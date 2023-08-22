import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './Context';
import { Product } from './types/Product';

type Props = {
  product: Product | null,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    setActiveProduct,
    chosenProducts,
    setChosenProducts,
    productsToBuy,
    setProductsToBuy,
  } = useContext(Context);

  const addProductIds = (
    event: React.SyntheticEvent,
    device: Product,
    products: string[],
    addProduct: (productNames: string[]) => void,
  ) => {
    event.preventDefault();

    if (products.includes(device.id)) {
      addProduct([
        ...products.slice(0, [...products].indexOf(device.id)),
        ...products.slice([...products].indexOf(device.id) + 1),
      ]);
    } else {
      addProduct([
        ...products,
        device.id,
      ]);
    }
  };

  const addToCart = (id: string) => {
    let match = false;

    productsToBuy.forEach(device => {
      if (device.id === id) {
        match = true;

        return match;
      }

      return match;
    });

    return match;
  };

  return (
    product && (
      <Link
        className="product__link"
        to={`/${product.id}`}
        onClick={() => {
          setActiveProduct(product);
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
                    addToCart(product.id) === true,
                  },
                )}
                onClick={(event) => {
                  event.preventDefault();

                  if (addToCart(product.id) === false) {
                    setProductsToBuy([
                      ...productsToBuy,
                      {
                        id: product.id,
                        quantity: 1,
                        product,
                      },
                    ]);
                  }
                }}
              >
                {addToCart(product.id) === true
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
                    chosenProducts.includes(product.id),
                  },
                )}
                onClick={(event) => addProductIds(
                  event,
                  product,
                  chosenProducts,
                  setChosenProducts,
                )}
              />
            </div>
          </div>
        )}
      </Link>
    )
  );
};
