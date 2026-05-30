/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import './ProductDetails.scss';
import { GeneralContext } from '../../helpers/GeneralContext';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../api/api';

type Props = {
  selectedItem: ProductDetailsType;
  productFromList: Product | undefined;
};

export const ProductDetails: React.FC<Props> = ({
  selectedItem,
  productFromList,
}) => {
  const {
    favouritesList,
    setFavouritesList,
    cartList,
    setCartList,
  } = useContext(GeneralContext);
  const [mainPhotoId, setMainPhotoId] = useState(0);
  const isInFavourites
  = favouritesList.find(item => item.itemId === selectedItem.id);
  const isInCart
  = cartList.find(item => item.product.itemId === selectedItem.id);

  const selectOption = (type: string, value: string) => {
    const productName = selectedItem.id.split('-');

    switch (type) {
      case 'color':
        productName[productName.length - 1] = value;
        break;

      case 'capacity':
        productName[productName.length - 2] = value;
        break;

      default:
        break;
    }

    return productName.join('-');
  };

  const toggleFavorite = () => {
    const index
    = favouritesList.findIndex(item => item.itemId === selectedItem.id);

    if (index === -1 && productFromList) {
      setFavouritesList([...favouritesList, productFromList]);
    } else {
      setFavouritesList([...favouritesList.slice(0, index),
        ...favouritesList.slice(index + 1)]);
    }
  };

  const addToCart = () => {
    if (productFromList) {
      const newProduct = {
        id: +productFromList.id,
        quantity: 1,
        product: productFromList,
      };
      const index = cartList.findIndex(item => item.id === newProduct.id);

      if (index === -1) {
        setCartList([...cartList, newProduct]);
      }
    }
  };

  return (
    <section className="productDetails">
      <div className="productDetails__photos">
        <div className="productDetails__photoLine">
          {selectedItem.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={classNames('productDetails__miniPhoto', {
                'productDetails__miniPhoto--active': mainPhotoId === index,
              })}
              onClick={() => setMainPhotoId(index)}
            >
              <img
                src={`${BASE_URL}/_new/${image}`}
                alt={selectedItem.name}
              />
            </button>
          ))}
        </div>

        <div className="productDetails__mainPhoto">
          <img
            src={`${BASE_URL}/_new/${selectedItem.images[mainPhotoId]}`}
            alt={selectedItem.name}
          />
        </div>
      </div>

      <div className="productDetails__aside">
        <div className="productDetails__options">
          <div>
            <h3 className="productDetails__optionTitle">
              Available colors
            </h3>

            <div className="productDetails__colors">
              {selectedItem.colorsAvailable.map((color) => (
                <Link
                  key={color}
                  to={{
                    pathname: `/${productFromList?.category}/:${selectOption('color', color)}`,
                  }}
                  className="productDetails__colorWrapper"
                >
                  <div
                    className="productDetails__color"
                    style={{ backgroundColor: color }}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="productDetails__divider" />

          <div>
            <h3 className="productDetails__optionTitle">
              Select capacity
            </h3>

            <div className="productDetails__capacities">
              {selectedItem.capacityAvailable.map((capacity) => (
                <Link
                  to={{
                    pathname: `/${productFromList?.category}/:${selectOption('capacity', capacity.toLowerCase())}`,
                  }}
                  key={capacity}
                  className="productDetails__capacity"
                >
                  {capacity}
                </Link>
              ))}
            </div>
          </div>

          <div className="productDetails__divider" />

          <div className="productDetails__prices">
            <div className="productDetails__price">
              {`$${selectedItem.priceDiscount}`}
            </div>

            <div className="productDetails__oldPrice">
              {`$${selectedItem.priceRegular}`}

              <span className="productDetails__line-through">
                {`$${selectedItem.priceRegular}`}
              </span>
            </div>
          </div>

          <div className="productDetails__btns">
            <button
              type="button"
              className={classNames(
                'productDetails__addToCart',
                'productDetails__btn', {
                  'productDetails__addToCart--added': isInCart,
                },
              )}
              onClick={addToCart}
            >
              {isInCart
                ? 'Added to cart'
                : 'Add to cart'}
            </button>

            <button
              type="button"
              className={classNames(
                'productDetails__favorites',
                'productDetails__btn', {
                  'productDetails__favorites--remove': isInFavourites,
                  'productDetails__favorites--add': !isInFavourites,
                },
              )}
              onClick={toggleFavorite}
              data-cy="addToFavorite"
            >
              {isInFavourites
                ? (
                  <img
                    src={require('../../images/icons/favorites-selected.svg')
                      .default}
                    alt="remove from favorite"
                  />
                )
                : (
                  <img
                    src={require('../../images/icons/favourities.svg')
                      .default}
                    alt="add to favorite"
                  />
                )}
            </button>
          </div>

          <div className="productDetails__characteristics">
            <div className="productDetails__characteristic">
              Screen
              <span className="productDetails__value">
                {selectedItem.screen}
              </span>
            </div>

            <div className="productDetails__characteristic">
              Resolution
              <span className="productDetails__value">
                {selectedItem.resolution}
              </span>
            </div>

            <div className="productDetails__characteristic">
              Processor
              <span className="productDetails__value">
                {selectedItem.processor}
              </span>
            </div>

            <div className="productDetails__characteristic">
              RAM
              <span className="productDetails__value">
                {selectedItem.ram}
              </span>
            </div>
          </div>

        </div>

        <span className="productDetails__id">
          {`ID:${Math.trunc(Math.random() * 1000000)}`}
        </span>
      </div>

      <div
        className="productDetails__about"
      >
        <h2 className="productDetails__infoTitle">About</h2>

        <div className="productDetails__infoDivider" />

        <div data-cy="productDescription">
          {selectedItem.description.map((paragraph) => (
            <div key={paragraph.title}>
              <h3 className="productDetails__subtitle">
                {paragraph.title}
              </h3>

              <div className="productDetails__text">
                {paragraph.text.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="productDetails__techSpecs">
        <h2 className="productDetails__infoTitle">Tech specs</h2>

        <div className="productDetails__infoDivider" />

        <div className="productDetails__characteristics">
          <div className="
              productDetails__characteristic
              productDetails__infoCharacteristic
          "
          >
            Screen
            <span className="productDetails__value">
              {selectedItem.screen}
            </span>
          </div>

          <div className="
            productDetails__characteristic
            productDetails__infoCharacteristic
          "
          >
            Resolution
            <span className="productDetails__value">
              {selectedItem.resolution}
            </span>
          </div>

          <div className="
            productDetails__characteristic
            productDetails__infoCharacteristic
          "
          >
            Processor
            <span className="productDetails__value">
              {selectedItem.processor}
            </span>
          </div>

          <div className="
            productDetails__characteristic
            productDetails__infoCharacteristic
          "
          >
            RAM
            <span className="productDetails__value">
              {selectedItem.ram}
            </span>
          </div>

          <div className="
              productDetails__characteristic
              productDetails__infoCharacteristic
          "
          >
            Built in memory
            <span className="productDetails__value">
              {selectedItem.capacity}
            </span>
          </div>

          <div className="
            productDetails__characteristic
            productDetails__infoCharacteristic
          "
          >
            Camera
            <span className="productDetails__value">
              {selectedItem.camera}
            </span>
          </div>

          <div className="
            productDetails__characteristic
            productDetails__infoCharacteristic
          "
          >
            Zoom
            <span className="productDetails__value">
              {selectedItem.zoom}
            </span>
          </div>

          <div className="
            productDetails__characteristic
            productDetails__infoCharacteristic
          "
          >
            Cell
            <span className="productDetails__value">
              {selectedItem.cell.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
