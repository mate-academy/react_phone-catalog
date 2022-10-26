/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { ProductsContext } from '../../helpers/ProductsContext';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { BuyButton } from '../BuyButton';
import { FavoriteButton } from '../FavoriteButton';
import { ProductsSlider } from '../ProductsSlider';
import { clearProduct } from '../../helpers/clearProduct';

import './ProductsDetails.scss';

type Props = {
  selectedProduct: ProductDetails | null;
};

export const ProductsDetails: React.FC<Props> = ({
  selectedProduct,
}) => {
  const colors = ['#fcdbc1', '#5f7170', '#4c4c4c', '#f0f0f0'];
  const capacities = ['16 GB', '256 GB', '512 GB'];

  const { products } = useContext(ProductsContext);
  const selectedFromAll = products.find(product => (
    product.name === selectedProduct?.name
  ));

  const initialMain = selectedProduct ? selectedProduct.images[0] : '';
  const [mainPhotoUrl, setMainPhotoUrl] = useState(initialMain);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(capacities[0]);

  function shuffle(array: Product[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  const shufledProducts = shuffle([...products]);

  const calculateDiscount = (price: number, discount: number) => {
    return price - price * (discount / 100);
  };

  return (
    <>
      {selectedProduct && (
        <div className="products-details">

          <h1 className="products-details__title">
            {selectedProduct.name}
          </h1>

          <div className="products-details__main-info main-info">
            <div className="main-info__product-images product-images">
              <div className="product-images__small-images small-images">

                {selectedProduct.images.slice(0, 5).map(imageUrl => (
                  <div
                    key={imageUrl}
                    className={classNames('small-images__image', {
                      'small-images__image--is-active':
                        mainPhotoUrl === imageUrl,
                    })}
                    onClick={() => setMainPhotoUrl(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt="product"
                      className="info-image"
                    />
                  </div>
                ))}
              </div>

              <div className="product-images__main-image">
                <img
                  src={mainPhotoUrl}
                  alt="main"
                  className="main-image"
                />
              </div>
            </div>

            <div className="main-info__selecting-block selecting-block">
              <div className="selecting-block__colors colors">
                <h2 className="selecting-block__subtitle">
                  Available colors
                </h2>

                <ul className="colors__list">
                  {colors.map(color => (
                    <div
                      className={classNames('colors__item-circle', {
                        'colors__item-circle--is-active':
                          color === selectedColor,
                      })}
                      onClick={() => setSelectedColor(color)}
                      key={color}
                    >
                      <li
                        className="colors__item"
                        style={{ backgroundColor: `${color}` }}
                      />
                    </div>
                  ))}
                </ul>
              </div>

              <div className="selecting-block__capacity capacity">
                <h2 className="selecting-block__subtitle">
                  Select capacity
                </h2>

                <ul className="capacity__list">
                  {capacities.map(cap => (
                    <li
                      className={classNames('capacity__item', {
                        'capacity__item--is-active': selectedCapacity === cap,
                      })}
                      onClick={() => setSelectedCapacity(cap)}
                      key={cap}
                    >
                      {cap}
                    </li>
                  ))}

                </ul>

              </div>

              <div className="selecting-block__price">
                {selectedFromAll && selectedFromAll.discount ? (
                  <div className="card__prices--in-details">
                    <div className="
                      prices prices--discount-price
                      prices prices--discount-price--in-details
                    "
                    >
                      {calculateDiscount(
                        selectedFromAll.price, selectedFromAll.discount,
                      )}
                    </div>

                    <div className="
                      prices prices--initial-price
                      prices prices--initial-price--in-details
                    "
                    >
                      {selectedFromAll.price}
                    </div>
                  </div>
                ) : (
                  <div className="card__prices--in-details">
                    <div className="prices prices--normal-price--in-details">
                      {selectedFromAll && selectedFromAll.price}
                    </div>
                  </div>
                )}
              </div>

              <div className="selecting-block__detail-buttons detail-buttons">
                <BuyButton
                  product={selectedFromAll || clearProduct}
                  inDetails
                />

                <FavoriteButton
                  product={selectedFromAll || clearProduct}
                  inDetails
                />
              </div>

              <div className="selecting-block__detail-options">
                <ul className="detail-options__list">
                  <li className="detail-options__item">
                    <div className="detail-options__item--title">
                      Screen
                    </div>

                    <div className="detail-options__item--value">
                      {selectedProduct.display.screenSize}
                    </div>
                  </li>

                  <li className="detail-options__item">
                    <div className="detail-options__item--title">
                      Resolution
                    </div>

                    <div className="detail-options__item--value">
                      {selectedProduct.display.screenResolution}
                    </div>
                  </li>

                  <li className="detail-options__item">
                    <div className="detail-options__item--title">
                      Processor
                    </div>

                    <div className="detail-options__item--value">
                      {selectedProduct.hardware.cpu}
                    </div>
                  </li>

                  <li className="detail-options__item">
                    <div className="detail-options__item--title">
                      RAM
                    </div>

                    <div className="detail-options__item--value">
                      {selectedProduct.storage.ram || 'unknown'}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="main-info__product-id">
              ID: 890246
            </div>
          </div>

          <div className="products-details__description description">
            <div
              className="description__about"
              data-cy="productDescription"
            >
              <h1 className="description__title">
                About
              </h1>

              <div className="description__text">
                {selectedProduct.description}
              </div>
            </div>

            <div className="description__specs">
              <h1 className="description__title">
                Tech specs
              </h1>

              <div className="description__options">
                <ul className="detail-options__list">
                  <li className="detail-options__item">
                    <div className="
                      detail-options__item--title
                      detail-options__item--title--big
                    "
                    >
                      Screen
                    </div>

                    <div className="
                      detail-options__item--value
                      detail-options__item--value--big
                    "
                    >
                      {selectedProduct.display.screenSize}
                    </div>
                  </li>

                  <li className="detail-options__item">
                    <div className="
                      detail-options__item--title
                      detail-options__item--title--big
                    "
                    >
                      Resolution
                    </div>

                    <div className="
                      detail-options__item--value
                      detail-options__item--value--big
                    "
                    >
                      {selectedProduct.display.screenResolution}
                    </div>
                  </li>

                  <li className="detail-options__item">
                    <div className="
                      detail-options__item--title
                      detail-options__item--title--big
                    "
                    >
                      Processor
                    </div>

                    <div className="
                      detail-options__item--value
                      detail-options__item--value--big
                    "
                    >
                      {selectedProduct.hardware.cpu}
                    </div>
                  </li>

                  <li className="detail-options__item">
                    <div className="
                      detail-options__item--title
                      detail-options__item--title--big
                    "
                    >
                      RAM
                    </div>

                    <div className="
                      detail-options__item--value
                      detail-options__item--value--big
                    "
                    >
                      {selectedProduct.storage.ram || 'unknown'}
                    </div>
                  </li>
                  <li className="detail-options__item">
                    <div className="
                      detail-options__item--title
                      detail-options__item--title--big
                    "
                    >
                      Android
                    </div>

                    <div className="
                      detail-options__item--value
                      detail-options__item--value--big
                    "
                    >
                      {selectedProduct.android.os || 'unknown'}
                    </div>
                  </li>
                  <li className="detail-options__item">
                    <div className="
                      detail-options__item--title
                      detail-options__item--title--big
                    "
                    >
                      Bluetooth
                    </div>

                    <div className="
                      detail-options__item--value
                      detail-options__item--value--big
                    "
                    >
                      {selectedProduct.connectivity.bluetooth || 'unknown'}
                    </div>
                  </li>
                  <li className="detail-options__item">
                    <div className="
                      detail-options__item--title
                      detail-options__item--title--big
                    "
                    >
                      Battery
                    </div>

                    <div className="
                      detail-options__item--value
                      detail-options__item--value--big
                    "
                    >
                      {selectedProduct.battery.standbyTime || 'unknown'}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <ProductsSlider
            title="You may also like"
            products={shufledProducts}
          />
        </div>
      )}
    </>
  );
};
