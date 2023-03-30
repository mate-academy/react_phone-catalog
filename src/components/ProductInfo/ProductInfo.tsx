import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

import {
  getCartList,
  getFavouritesList,
  isProductInStorage,
  setToLocaleStorage,
} from '../interactionLocaleStorage/interactionLocaleStorage';
import './productInfo.scss';

import { Details } from '../../type/details';
import { Product } from '../../type/product';

type Props = {
  details: Details,
  generalData: Product,
};

export const ProductInfo: React.FC<Props> = ({ details, generalData }) => {
  const {
    android,
    display,
    id,
    images,
    name,
    storage,
    color,
  } = details;
  const [currentImg, setCurrentImg] = useState(images[0]);
  const [productsColor, setProductsColor] = useState(color[0]);
  const [flash, setFlash] = useState(storage.flash);
  const [cartList, setCartList] = useState<Product[] | null>(null);
  const [favouritesList, setFavouritesList] = useState<Product[] | null>(null);

  const handleClickImage = useCallback((img: string) => {
    setCurrentImg(img);
  }, []);

  const handleClickColor = useCallback((selectedColor: string) => {
    setProductsColor(selectedColor);
  }, []);

  const handleKeyDown = useCallback((
    event: React.KeyboardEvent<HTMLDivElement>,
    img: string,
    callback: (arg: string) => void,
  ) => {
    if (event.key === 'Enter') {
      callback(img);
    }
  }, []);

  useEffect(() => {
    setCurrentImg(images[0]);

    getCartList(setCartList);
    getFavouritesList(setFavouritesList);

    window.addEventListener('storage', () => {
      getCartList(setCartList);
      getFavouritesList(setFavouritesList);
    });

    return () => window.removeEventListener('storage', () => {
      getCartList(setCartList);
      getFavouritesList(setFavouritesList);
    });
  }, [details]);

  return (
    <section className="product-info">
      <h1 className="product-info__title">
        {name}
      </h1>

      <div className="product-info__wrapper-info">
        <section className="product-info__images">
          <div className="product-info__column-images">
            {images.map((image, index) => (
              <div
                key={image}
                className={classNames('product-info__box-image', {
                  'product-info__box-image--selected': image === currentImg,
                })}
                role="button"
                tabIndex={index}
                onClick={() => handleClickImage(image)}
                onKeyDown={(event) => (
                  handleKeyDown(event, image, handleClickImage))}
              >
                <img src={image} alt="phone-1" />
              </div>
            ))}
          </div>

          <div className="product-info__box-large-image">
            <img src={currentImg} alt="phone large" />
          </div>
        </section>

        <section className="product-info__parameters">
          <div className="product-info__colors-container">
            <p className="product-info__colors-title">
              Available colors
            </p>

            <div className="product-info__colors-wrapper">
              {color.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={classNames('product-info__color',
                    { 'product-info__color--active': item === productsColor })}
                  onClick={() => handleClickColor(item)}
                  aria-label="color"
                  style={{ backgroundColor: item }}
                />
              ))}
            </div>
          </div>

          <div className="product-info__capacity-container">
            <p className="product-info__capacity-title">
              Select capacity
            </p>

            <div className="product-info__capacities-wrapper">
              {[...[storage.flash]].map((item) => {
                return (
                  <button
                    disabled={item.length === 0}
                    key={item}
                    type="button"
                    className={classNames('product-info__capacity',
                      { 'product-info__capacity--active': item === flash })}
                    onClick={() => setFlash(item)}
                  >
                    {item || '- MB'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="product-info__shop-container">
            <div className="product-info__prices">
              <div className="product-info__actual-price">
                {`$${generalData.price * ((100 - generalData.discount) / 100)}`}
              </div>

              <div className="product-info__old-price">
                {`$${generalData.price}`}
              </div>
            </div>

            <div className="product-info__buttons">
              <button
                className={classNames('product-info__add-button', {
                  'product-info__add-button--selected':
                  isProductInStorage(cartList, generalData),
                })}
                type="button"
                onClick={() => setToLocaleStorage('cart', generalData)}
              >
                {isProductInStorage(cartList, generalData) ? (
                  'Added to cart'
                ) : (
                  'Add to cart'
                )}
              </button>

              <button
                className={classNames('product-info__button-favourite', {
                  'product-info__button-favourite--selected':
                  isProductInStorage(favouritesList, generalData),
                })}
                type="button"
                aria-label="add to favourites"
                data-cy="addToFavorite"
                onClick={() => setToLocaleStorage('favourites', generalData)}
              />
            </div>
          </div>

          <table className="product-info__main-characteristics">
            <tbody>
              <tr>
                <td>Screen</td>
                <td>{display.screenSize || '-'}</td>
              </tr>

              <tr>
                <td>Resolution</td>
                <td>{display.screenResolution || '-'}</td>
              </tr>

              <tr>
                <td>OS</td>
                <td>{android.os || '-'}</td>
              </tr>

              <tr>
                <td>RAM</td>
                <td>{storage.ram || '-'}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <div className="product-info__id-product">
          {`ID: ${id}`}
        </div>
      </div>
    </section>
  );
};
