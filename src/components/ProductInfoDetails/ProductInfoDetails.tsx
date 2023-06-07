import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import { API_PRODUCT_URL } from '../../helpers/helper';
import favorite from '../../images/favourites.svg';
import favouriteAdded from '../../images/favourites-added.svg';
import { Product } from '../../types/Products';
import {
  TextDescriptionTemplate,
} from '../TextDescription/TextDescriptionTemplate';

type Props = {
  productInfo: ProductDetails,
  selectedCapacity: string | undefined,
  setSelectedCapacity: React.Dispatch<React.SetStateAction<string | undefined>>,
  products: Product[],
};

export const ProductInfoDetails: React.FC<Props> = ({
  productInfo,
  selectedCapacity,
  setSelectedCapacity,
  products,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [mainImage, setMainImage]
    = useState(API_PRODUCT_URL + productInfo.images[0]);

  const productToAdd = products
    .find(product => product.phoneId === productInfo.id);

  const saveFavouriteOnClick = () => {
    const favourites = localStorage.getItem('favourites');
    const favouritesArray = favourites ? JSON.parse(favourites) : [];

    const favouriteProductToAdd = products
      .find(product => product.phoneId === productInfo.id);

    if (favouriteProductToAdd) {
      const index = favouritesArray
        // eslint-disable-next-line
        .findIndex((existingProduct: Product) => existingProduct.id === favouriteProductToAdd.id,);

      if (index === -1) {
        favouritesArray.push(favouriteProductToAdd);
        setIsAdded(true);
      } else {
        favouritesArray.splice(index, 1);
        setIsAdded(false);
      }

      localStorage.setItem('favourites', JSON.stringify(favouritesArray));
      window.dispatchEvent(new Event('favouritesUpdated'));
    }
  };

  const saveCartOnClick = () => {
    const cart = localStorage.getItem('cart');
    const cartArray = cart ? JSON.parse(cart) : [];

    if (!productToAdd || cartArray.some(
      (product: Product) => product.id === productToAdd.id,
    )) {
      return;
    }

    cartArray.push({ ...productToAdd, quantity: 1 });
    setIsClicked(true);

    localStorage.setItem('cart', JSON.stringify(cartArray));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleChangeMainImage = (
    event: React.SyntheticEvent, value: string,
  ) => {
    event?.preventDefault();
    setMainImage(value);
  };

  const getLocalStorageItems = (key: string) => {
    const items = localStorage.getItem(key);

    return items ? JSON.parse(items) : [];
  };

  useEffect(() => {
    setMainImage(API_PRODUCT_URL + productInfo.images[0]);

    const productsToAdd = products
      .find(product => product.phoneId === productInfo.id);

    if (!productsToAdd) {
      return;
    }

    const favouritesArray = getLocalStorageItems('favourites');

    setIsAdded(favouritesArray
      .some((product: Product) => product.id === productsToAdd.id));

    const cartArray = getLocalStorageItems('cart');

    setIsClicked(cartArray
      .some((product: Product) => product.id === productsToAdd.id));
  }, [productInfo, products]);

  return (
    <section className="product-info__row">
      <div
        className="
          product-info__column
          product-details
          product-info__column_small
        "
      >
        {productInfo.images.map(item => (
          <div key={item} className="product-details__image">
            <button
              type="button"
              className="product-details__image-link"
              onClick={(event) => handleChangeMainImage(
                event,
                API_PRODUCT_URL + item,
              )}
            >
              <img
                src={API_PRODUCT_URL + item}
                alt="ProductSmallImage"
                className="product-details__small-img"
              />
            </button>
          </div>
        ))}
      </div>
      <div className="product-info__column">
        <div className="product-info__main-image">
          <div
            className="product-info__main-image-link"
          >
            <img
              src={mainImage}
              alt="MainProductImage"
              className="product-info__main-img"
            />
          </div>
        </div>
      </div>
      <div className="product-info__column product-details-description">
        <div className="product-details-description__subtitle">
          Available colors
        </div>
        <div className="product-details-description__colors">
          {productInfo.colorsAvailable.map((color) => (
            <div
              key={color}
              className="product-details-description__color"
              style={{
                backgroundColor: color,
              }}
            />
          ))}
        </div>
        <div className="product-details-description__subtitle">
          Select capacity
        </div>
        <div className="product-details-description__capacity">
          {productInfo.capacityAvailable.map(button => (
            <button
              type="button"
              key={button}
              className={classNames(
                'product-details-description__capacity-available', {
                  'active-capacity': selectedCapacity === button,
                },
              )}
              onClick={() => setSelectedCapacity(button)}
            >
              {button}
            </button>
          ))}
        </div>
        <div className="prices">
          <div className="prices__discount">
            $
            {productInfo.priceDiscount}
          </div>
          <div className="prices__full-price">
            $
            {productInfo.priceRegular}
          </div>
        </div>
        <div className="product-details-description__footer">
          <button
            type="button"
            className={classNames({
              'card-button-template': true,
              'product-details-description__card': true,
              'is-active': isClicked,
            })}
            onClick={saveCartOnClick}
          >
            {isClicked ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            type="button"
            className="card-button-template__like"
            onClick={saveFavouriteOnClick}
            style={{
              backgroundColor: '#fff',
            }}
          >
            <img
              src={isAdded ? favouriteAdded : favorite}
              alt="ProductImage"
              className="card-button-template__favourite"
            />
          </button>
        </div>
        <TextDescriptionTemplate
          text="Screen"
          value={productInfo.screen}
        />
        <TextDescriptionTemplate
          text="Resolution"
          value={productInfo.resolution}
        />
        <TextDescriptionTemplate
          text="Processor"
          value={productInfo.processor}
        />
        <TextDescriptionTemplate
          text="RAM"
          value={productInfo.ram}
        />
      </div>
      <div className="
        product-info__column
        product-details
        product-info__column_small
      "
      >
        ID:
        {' '}
        {productInfo.id}
      </div>
    </section>
  );
};
