import React, { useCallback, useState } from 'react';
import './ProductHeadInfo.scss';
import { ProductDetails } from '../../../types/ProductDetails';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { colors, Colors } from '../../../constants/colors';
import { ButtonFavoriteCart } from '../ButtonFavoriteCart';

type Props = {
  product: ProductDetails;
  connectedProducts: ProductDetails[];
};

export const ProductHeadInfo: React.FC<Props> = ({
  product,
  connectedProducts,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const getLink = useCallback(
    (option: string, value: string) => {
      const linkedProduct = connectedProducts.find(connectedProduct => {
        return (
          (option === 'color' &&
            connectedProduct.color === value &&
            connectedProduct.capacity === product.capacity) ||
          (option === 'capacity' &&
            connectedProduct.capacity === value &&
            connectedProduct.color === product.color)
        );
      });

      return linkedProduct?.id ?? '';
    },
    [product, connectedProducts],
  );

  return (
    <section className="head-info">
      <ul className="head-info__slider">
        {product.images.map((image, index) => (
          <li
            key={index}
            className={classNames('head-info__slider-box', {
              'head-info__slider-box--active': selectedPhoto === index,
            })}
          >
            <img
              src={`./${image}`}
              alt={`Product image ${index + 1}`}
              className="head-info__slider-image"
              onClick={() => setSelectedPhoto(index)}
            />
          </li>
        ))}
      </ul>

      <div className="head-info__picture">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={`./${image}`}
            alt={`Selected Photo ${index + 1}`}
            className={classNames('head-info__picture-image', {
              'head-info__picture-image--active': selectedPhoto === index,
            })}
          />
        ))}
      </div>

      <div className="head-info__characteristics">
        <div className="head-info__color">
          <p className=" head-info__title">Available colors</p>
          <ul className="head-info__color-list">
            {product.colorsAvailable.map(color => (
              <Link
                key={color}
                to={`/${product.category}/${getLink('color', color)}`}
              >
                <li
                  key={color}
                  className={classNames('head-info__color-item', {
                    'head-info__color-item--selected': product.color === color,
                  })}
                >
                  <span
                    className="head-info__color-circle"
                    style={{ backgroundColor: colors[color as keyof Colors] }}
                  ></span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="head-info__border"></div>

        <div className="head-info__capacity">
          <p className="head-info__title">Select capacity</p>
          <ul className="head-info__capacity-list">
            {product.capacityAvailable.map(capacity => (
              <Link
                key={capacity}
                to={`/${product.category}/${getLink('capacity', capacity)}`}
                style={{ textDecoration: 'none' }}
              >
                <li
                  key={capacity}
                  className={classNames('head-info__capacity-item', {
                    'head-info__capacity-item--active':
                      product.capacity === capacity,
                  })}
                >
                  <span
                    className={classNames('head-info__capacity-text', {
                      'head-info__capacity-text--active':
                        product.capacity === capacity,
                    })}
                  >
                    {capacity.split('GB').join(' GB')}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="head-info__border"></div>

        <div className="head-info__price">
          <p className="head-info__price-discount">
            {`$${product.priceDiscount}`}
          </p>
          {product.priceDiscount !== product.priceRegular && (
            <p className="head-info__price-regular">
              {`$${product.priceRegular}`}
            </p>
          )}
        </div>

        <ButtonFavoriteCart productId={product.id} />

        <ul className="head-info__specifications">
          <li className="head-info__specifications-container">
            <p className="head-info__specifications-title">Screen</p>
            <p className="head-info__specifications-text">{product.screen}</p>
          </li>
          <li className="head-info__specifications-container">
            <p className="head-info__specifications-title">Resolution</p>
            <p className="head-info__specifications-text">
              {product.resolution}
            </p>
          </li>
          <li className="head-info__specifications-container">
            <p className="head-info__specifications-title">Processor</p>
            <p className="head-info__specifications-text">
              {product.processor}
            </p>
          </li>
          <li className="head-info__specifications-container">
            <p className="head-info__specifications-title">RAM</p>
            <p className="head-info__specifications-text">{product.ram}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};
