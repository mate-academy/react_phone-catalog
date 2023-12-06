/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './ProductDetails.scss';
import { ProductInfo } from '../../helpers/types/ProductInfo';
import { Product } from '../../helpers/types/Product';
import { useGetProductsQuery } from '../../helpers/api/productsApi';
import { getDiscountedPrice } from '../../helpers/utils/getDiscount';
import { capitalize } from '../../helpers/utils/stringHelpers';
import { ProductAdd } from '../ProductAdd';

type Props = {
  productInfo: ProductInfo;
};

export const ProductDetails: React.FC<Props> = ({ productInfo }) => {
  const [activeImage, setActiveImage] = useState('');
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const { data: products } = useGetProductsQuery();

  const {
    id,
    images,
    display,
    hardware,
    storage,
    description,
    camera,
    connectivity,
  } = productInfo;

  const shortInfo = {
    screen: display.screenSize,
    resolution: display.screenResolution,
    processor: hardware.cpu,
    ram: storage.ram,
  };

  const longInfo = {
    ...shortInfo,
    camera: camera.primary,
    bluetooth: connectivity.bluetooth,
    'wi-Fi': connectivity.wifi,
    cell: connectivity.cell,
  };

  useEffect(() => {
    setActiveImage(images[0]);
  }, [productInfo]);

  useEffect(() => {
    if (products) {
      setCurrentProduct(
        products.find(product => product.id === id),
      );
    }
  }, [products, id]);

  const handleImageChange = (newImage: string) => {
    setActiveImage(newImage);
  };

  return (
    <div className="ProductDetails">
      <div className="ProductDetails__image-container">
        <div className="ProductDetails__images">
          {images.map(image => (
            <button
              key={image}
              type="button"
              className={classNames('ProductDetails__image-link', {
                'ProductDetails__image-link--active': activeImage === image,
              })}
              onClick={() => handleImageChange(image)}
            >
              <img
                src={image}
                alt={image}
                className="ProductDetails__image"
              />
            </button>
          ))}
        </div>

        <img
          src={activeImage}
          alt={activeImage}
          className="ProductDetails__image ProductDetails__image--big"
        />
      </div>

      {currentProduct && (
        <div className="ProductDetails__interactive">
          <div className="ProductDetails__prices">
            {!!currentProduct.discount && (
              <p className="ProductDetails__price">
                {`$${getDiscountedPrice(currentProduct)}`}
              </p>
            )}

            <p
              className={classNames('ProductDetails__price', {
                'ProductDetails__price--discount': !!currentProduct.discount,
              })}
            >
              {`$${currentProduct.price}`}
            </p>
          </div>

          <div className="ProductDetails__add">
            <ProductAdd product={currentProduct} />
          </div>

          <div className="ProductDetails__info">
            {Object.entries(shortInfo).map(([key, value]) => (
              <div key={key} className="ProductDetails__field">
                <p className="ProductDetails__field-key">{capitalize(key)}</p>
                <p className="ProductDetails__field-value">
                  {value || '-'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <section
        data-cy="productDescription"
        className="ProductDetails__about"
      >
        <h2 className="ProductDetails__title">About</h2>

        <div className="ProductDetails__divider" />

        <p className="ProductDetails__description">
          {description}
        </p>
      </section>

      <section className="ProductDetails__specs">
        <h2 className="ProductDetails__title">Tech specs</h2>

        <div className="ProductDetails__divider" />

        <div className="
          ProductDetails__info
          ProductDetails__info--text--bigger
       ">
          {Object.entries(longInfo).map(([key, value]) => (
            <div key={key} className="ProductDetails__field">
              <p className="ProductDetails__field-key">{capitalize(key)}</p>

              <p className="ProductDetails__field-value">
                {value || '-'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
