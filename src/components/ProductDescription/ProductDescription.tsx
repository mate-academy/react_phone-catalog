/* eslint-disable max-len */
import React, { Fragment, useEffect, useState } from 'react';
import { Phone } from '../../types/Phone';
import { GoBackButton } from '../GoBackButton';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { COLOR_TO_SELECT } from '../../types/ChooseColor';
import { RecommendedItems } from '../RecommendedItems';
import { Product } from '../../types/Product';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import { useCartValues } from '../../store/CartContext';
import { useValues } from '../../store/ProductsContext';
import { useFavouriteValues } from '../../store/FavouriteContext';

type Props = {
  selectedProduct: Phone | Tablet | Accessory | undefined;
  recommendedItems: Product[];
  productId: string | undefined;
};

export const ProductDescription: React.FC<Props> = ({
  selectedProduct,
  recommendedItems,
  productId,
}) => {
  const name = selectedProduct?.name;
  const mainImage = selectedProduct?.images[0];
  const mainColor = selectedProduct?.color;
  const mainCapacity = selectedProduct?.capacity;
  const colors = selectedProduct?.colorsAvailable;
  const capacityAvailable = selectedProduct?.capacityAvailable;
  const price = selectedProduct?.priceDiscount;
  const fullPrice = selectedProduct?.priceRegular;
  const description = selectedProduct?.description;
  const screen = selectedProduct?.screen;
  const resolution = selectedProduct?.resolution;
  const processor = selectedProduct?.processor;
  const ram = selectedProduct?.ram;
  const camera = selectedProduct?.camera;
  const zoom = selectedProduct?.zoom;
  const cell = selectedProduct?.cell;
  const location = useLocation();
  const root = location.pathname.split('/')[1];

  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [selectedColor, setSelectedColor] = useState(mainColor);
  const [selectedCapacity, setSelectedCapacity] = useState(mainCapacity);

  const { products } = useValues();
  const { addToCart, removeFromCart, cart } = useCartValues();
  const { addToFavourite, removeFromFavourite, favourites } =
    useFavouriteValues();

  const handleChangeProductsColor = (newColor: string) => {
    const parts = productId?.split('-').slice(0, -1) || [];
    const updatedId = [...parts, newColor].join('-');

    return updatedId;
  };

  const handleChangeProductsCapacity = (newCapacity: string) => {
    const parts = productId?.split('-').slice(0, -2) || [];
    const updatedCapacity = [...parts, newCapacity, selectedColor].join('-');

    return updatedCapacity;
  };

  const productToAddOrRemove = products.find(
    product => product.itemId === selectedProduct?.id,
  );

  const isAddedToCart = cart.some(
    item => item.product.itemId === selectedProduct?.id,
  );

  const isAddedToFavourites = favourites.some(
    item => item.product.itemId === selectedProduct?.id,
  );

  useEffect(() => {
    setSelectedImage(mainImage);
    setSelectedColor(mainColor);
    setSelectedCapacity(mainCapacity);
  }, [mainImage, mainColor, mainCapacity]);

  return (
    <>
      <GoBackButton />
      <div className="product-description">
        <h2 className="product-description__title">{name}</h2>
        <div className="container_first">
          <div className="product-description__images">
            <img
              src={selectedImage}
              alt=""
              className="product-description__main-image"
            />
            <div className="product-description__miniatures">
              {selectedProduct?.images.map(image => (
                <div
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={cn('product-description__miniatures-container', {
                    'product-description__miniatures-containerActive':
                      selectedImage === image,
                  })}
                >
                  <img
                    src={image}
                    alt={selectedProduct.id}
                    className="product-description__miniature-image"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product-description__order">
            <div className="product-description__top-text">
              <p className="product-description__top-text--text">
                Available colors
              </p>
              <p className="product-description__top-text--textId">
                ID: 802390
              </p>
            </div>
            <div className="product-description__colorList">
              {colors?.map(color => (
                <Link
                  to={`/${root}/${handleChangeProductsColor(color)}`}
                  key={color}
                >
                  <div
                    className={cn('product-description__color', {
                      'product-description__colorActive':
                        color === selectedColor,
                    })}
                    style={{ backgroundColor: COLOR_TO_SELECT[color] }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                </Link>
              ))}
            </div>

            <hr className="product-description__divider"></hr>

            <div className="product-description__capacitySection">
              <p className="product-description__capacitySection--text">
                Select capacity
              </p>
              <div className="product-description__capacityList">
                {capacityAvailable?.map(capacity => (
                  <Link
                    to={`/${root}/${handleChangeProductsCapacity(capacity.toLowerCase())}`}
                    key={capacity}
                  >
                    <div
                      className={cn('product-description__capacity', {
                        'product-description__capacityActive':
                          selectedCapacity === capacity,
                      })}
                    >
                      {capacity.replace(/(\d+)(GB)/, '$1 $2')}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <hr className="product-description__divider"></hr>

            <div className="product-description__prices">
              <h2 className="product-description__prices--price">${price}</h2>
              <p className="product-description__prices--fullprice">
                ${fullPrice}
              </p>
            </div>
            <div className="product-description__actions">
              {!isAddedToCart ? (
                <Link
                  to=""
                  className="product-description__actions--btn product-description__add"
                  onClick={() => {
                    if (productToAddOrRemove) {
                      addToCart(productToAddOrRemove);
                    }
                  }}
                >
                  Add to card
                </Link>
              ) : (
                <Link
                  to=""
                  className="product-description__actions--btn product-description__added"
                  onClick={() => {
                    if (productToAddOrRemove) {
                      removeFromCart(productToAddOrRemove);
                    }
                  }}
                >
                  Added
                </Link>
              )}

              {!isAddedToFavourites ? (
                <Link
                  to=""
                  className="product-description__actions--btn product-description__favourite"
                  onClick={() => {
                    if (productToAddOrRemove) {
                      addToFavourite(productToAddOrRemove);
                    }
                  }}
                >
                  <svg className="icon icon-user">
                    <use href="img/icons.svg#icon-favourites"></use>
                  </svg>
                </Link>
              ) : (
                <Link
                  to=""
                  className="product-description__actions--btn product-description__favourite"
                  onClick={() => {
                    if (productToAddOrRemove) {
                      removeFromFavourite(productToAddOrRemove);
                    }
                  }}
                >
                  <svg className="icon icon-user">
                    <use
                      href="img/icons.svg#icon-favourites-filled"
                      className="favourite__added"
                    ></use>
                  </svg>
                </Link>
              )}
            </div>
            <ul className="product-description__description">
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  Screen
                </span>
                <span className="product-description__description__item--value">
                  {screen}
                </span>
              </li>
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  Resolution
                </span>
                <span className="product-description__description__item--value">
                  {resolution}
                </span>
              </li>
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  Processor
                </span>
                <span className="product-description__description__item--value">
                  {processor}
                </span>
              </li>
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  RAM
                </span>
                <span className="product-description__description__item--value">
                  {ram}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container_second">
          <div className="product-description__about">
            <h3 className="product-description__about--title">About</h3>

            <hr className="product-description__divider"></hr>

            {description?.map(desc => (
              <Fragment key={`${desc.title}-${desc.text}`}>
                <h4 className="product-description__about--title-mini">
                  {desc.title}
                </h4>
                <p className="product-description__about--text">{desc.text}</p>
              </Fragment>
            ))}
          </div>
          <div className="product-description__tech-specs">
            <h3 className="product-description__tech-specs--title">
              Tech specs
            </h3>

            <hr className="product-description__divider"></hr>

            <ul className="product-description__description">
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  Screen
                </span>
                <span className="product-description__description__item--value">
                  {screen}
                </span>
              </li>
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  Resolution
                </span>
                <span className="product-description__description__item--value">
                  {resolution}
                </span>
              </li>
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  Processor
                </span>
                <span className="product-description__description__item--value">
                  {processor}
                </span>
              </li>
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  RAM
                </span>
                <span className="product-description__description__item--value">
                  {ram}
                </span>
              </li>
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  Built in memory
                </span>
                <span className="product-description__description__item--value">
                  {mainCapacity}
                </span>
              </li>
              {camera && (
                <li className="product-description__description__item">
                  <span className="product-description__description__item--name">
                    Camera
                  </span>
                  <span className="product-description__description__item--value">
                    {camera}
                  </span>
                </li>
              )}
              {zoom && (
                <li className="product-description__description__item">
                  <span className="product-description__description__item--name">
                    Zoom
                  </span>
                  <span className="product-description__description__item--value">
                    {zoom}
                  </span>
                </li>
              )}
              <li className="product-description__description__item">
                <span className="product-description__description__item--name">
                  Cell
                </span>
                <span className="product-description__description__item--value">
                  {cell?.join(', ')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <RecommendedItems recommendedItems={recommendedItems} />
    </>
  );
};
