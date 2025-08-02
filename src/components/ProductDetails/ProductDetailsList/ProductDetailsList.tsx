import classNames from 'classnames';
import './ProductDetailsList.scss';
import { Phones } from '../../../types/Phones';
import { Tablets } from '../../../types/Tablets';
import { Accessories } from '../../../types/Accessories';
import React, { useContext } from 'react';
import { ProductsContext } from '../../../context/ProductContext';

type Props = {
  product: Phones | Tablets | Accessories | undefined;
  mainPicture: string | undefined;
  modelCapacity: string;
  modelColor: string;
  id: string;
  handleColorChange: (color: string) => void;
  handleCapacityChange: (capacity: string) => void;
  handleMainPicture: (picture: string) => void;
};

export const ProductDetailsList: React.FC<Props> = ({
  product,
  mainPicture,
  modelCapacity,
  modelColor,
  id,
  handleColorChange,
  handleCapacityChange,
  handleMainPicture,
}) => {
  const { onToggleLike, favoritesProducts } = useContext(ProductsContext);
  const { onAddProduct, addedCartProducts } = useContext(ProductsContext);

  return (
    <div className="details__card">
      <h2 className="details__name">{product?.name}</h2>
      <div className="details__info">
        <div className="details__main-image">
          <img src={mainPicture} alt="main-image" />
        </div>
        <div className="details__gallery">
          {product?.images.map(image => {
            return (
              <div
                key={image}
                className={classNames('details__gallery-image', {
                  'details__gallery-image--active': mainPicture === image,
                })}
                onClick={() => {
                  handleMainPicture(image);
                }}
              >
                <img src={image} alt="gallery-image" />
              </div>
            );
          })}
        </div>
        <div className="details__specs">
          <div className="details__specs-titles">
            <p className="details__text">Available colors</p>
            <p className="details__specs-id-text">ID: {id}</p>
          </div>
          <div className="details__colors">
            {product?.colorsAvailable.map(color => {
              return (
                <div
                  key={color}
                  className={classNames('details__color-block', {
                    'details__color-block--active': color === modelColor,
                  })}
                  onClick={() => handleColorChange(color)}
                >
                  <div
                    style={{ backgroundColor: color }}
                    className="details__color"
                  />
                </div>
              );
            })}
          </div>
          <p className="details__text">Select capacity</p>
          <div className="details__capacitys">
            {product?.capacityAvailable.map(capacity => {
              return (
                <div
                  key={capacity}
                  className={classNames('details__capacity-block', {
                    'details__capacity-block--active':
                      capacity.toLowerCase() === modelCapacity.toLowerCase(),
                  })}
                  onClick={() => handleCapacityChange(capacity)}
                >
                  <p>{capacity}</p>
                </div>
              );
            })}
          </div>
          <div className="details__prices">
            <p className="details__price-discount">${product?.priceDiscount}</p>
            <p className="details__price-regular">${product?.priceRegular}</p>
          </div>
          <div className="details__buttons">
            <button
              className={classNames('details__button-add', {
                'details__button-add--active': addedCartProducts.some(a => {
                  return a.productId === product?.id;
                }),
              })}
              onClick={() => {
                onAddProduct(product?.id || '');
              }}
            >
              {addedCartProducts.some(a => {
                return a.productId === product?.id;
              })
                ? 'Added to cart'
                : 'Add to cart'}
            </button>
            <button
              className={classNames('details__button-like', {
                'details__button-like--active': favoritesProducts.includes(
                  product?.id || '',
                ),
              })}
              onClick={() => {
                onToggleLike(product?.id || '');
              }}
            >
              {!favoritesProducts.includes(product?.id || '') && (
                <img src="./icons/like.svg" alt="like" />
              )}
              {favoritesProducts.includes(product?.id || '') && (
                <img src="./icons/liked.svg" alt="like" />
              )}
            </button>
          </div>
          <div className="details__describe">
            <div className="details__describe-title">
              <p>Screen</p>
              <p>Resolution</p>
              <p>Processor</p>
              <p>RAM</p>
            </div>
            <div className="details__describe-text">
              <p>{product?.screen}</p>
              <p>{product?.resolution}</p>
              <p>{product?.processor}</p>
              <p>{product?.ram}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="details__about">
        <div className="details__about-desc">
          <h3 className="details__about-title">About</h3>
          <div className="details__about-desc-blocks">
            {product?.description.map(desc => {
              return (
                <div
                  key={`${desc.title} - ${product.id}`}
                  className="details__about-desc-block"
                >
                  <h4>{desc.title}</h4>
                  <p>{desc.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="details__techs">
          <h3 className="details__tech-header">Tech specs</h3>
          <div className="details__tech">
            <div className="details__tech-title">
              <p>Screen</p>
              <p>Resolution</p>
              <p>Processor</p>
              <p>RAM</p>
              <p>Built in memory</p>
              <p>Camera</p>
              <p>Zoom</p>
              <p>Cell</p>
            </div>
            <div className="details__tech-text">
              <p>{product?.screen}</p>
              <p>{product?.resolution}</p>
              <p>{product?.processor}</p>
              <p>{product?.ram}</p>
              <p>{product?.capacity}</p>
              <p>{product?.camera}</p>
              <p>{product?.zoom}</p>
              <p>{product?.cell.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
