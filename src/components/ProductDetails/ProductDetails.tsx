/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './ProductDetails.scss';
import { ProductInfo } from '../../helpers/types/ProductInfo';
import { Product } from '../../helpers/types/Product';
import { useGetProductsQuery } from '../../helpers/api/productsApi';
import { capitalize } from '../../helpers/utils/capitalize';
import { hasDiscount } from '../../helpers/utils/getDiscount';
import { ProductAdd } from '../ProductAdd';

type Props = {
  productInfo: ProductInfo;
};

export const ProductDetails: React.FC<Props> = ({ productInfo }) => {
  const [activeImage, setActiveImage] = useState('');
  const [chosenProduct, setChosenProduct] = useState<Product>();
  const { data: products } = useGetProductsQuery();

  const {
    id,
    images,
    screen,
    resolution,
    processor,
    ram,
    description,
    capacity,
    camera,
    zoom,
    cell,
  } = productInfo;

  const shortInfo = {
    screen,
    resolution,
    processor,
    ram,
  };

  const longInfo = {
    ...shortInfo,
    'built in memory': capacity,
    camera,
    zoom,
    cell: cell.join(', '),
  };

  useEffect(() => {
    setActiveImage(images[0]);
  }, [productInfo]);

  useEffect(() => {
    if (products) {
      setChosenProduct(
        products.find(product => product.phoneId === id),
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

      <div className="ProductDetails__interactive">
        {chosenProduct && (
          <>
            <div className="ProductDetails__prices">
              {hasDiscount(chosenProduct) && (
                <p className="ProductDetails__price">
                  {`$${chosenProduct.price}`}
                </p>
              )}

              <p
                className={classNames('ProductDetails__price', {
                  'ProductDetails__price--discount': hasDiscount(chosenProduct),
                })}
              >
                {`$${chosenProduct.fullPrice}`}
              </p>
            </div>

            <div className="ProductDetails__add">
              <ProductAdd product={chosenProduct} />
            </div>
          </>
        )}

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

      <section
        data-cy="productDescription"
        className="ProductDetails__about"
      >
        <h2 className="ProductDetails__title">About</h2>

        <div className="ProductDetails__divider" />

        <div className="ProductDetails__chapters">
          {description.map(chapter => (
            <div key={chapter.title} className="ProductDetails__chapter">
              <h3 className="ProductDetails__subheader">{chapter.title}</h3>

              {chapter.text.map(content => (
                <p key={content} className="ProductDetails__description">
                  {content}
                </p>
              ))}
            </div>
          ))}
        </div>
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
