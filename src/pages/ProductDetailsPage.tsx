/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-confusing-arrow */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, getProductDetails } from '../utils/api-phones';
import { ProductDetails } from '../types/ProductDetails';
import { Error } from '../types/Error';
import { Categories } from '../types/Categories';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { Loader } from '../components/Loader';
import { NotFoundPage } from './NotFoundPage';

import '../styles/ProductDetailsPage.scss';
import { Options } from '../components/Options';

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>('');

  useEffect(() => {
    if (productId) {
      getProductDetails(productId)
        .then((resolve) => {
          setProduct(resolve);
          setSelectedImage(resolve.images[0]);
        })
        .catch(() => Error.Loading)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  if (!product) {
    return (
      <>
        {isLoading && <Loader />}
        {!isLoading && <NotFoundPage />}
      </>
    );
  }

  const { images, name } = product;

  return (
    <main className={cn('product-details-page', {
      'product-details-page--is-loading': isLoading,
    })}
    >
      <BreadCrumbs
        category={Categories.Phones}
        productName={name}
      />

      <button
        type="button"
        className="product-details-page__button-back"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="product-details-page__content">
        <h2 className="product-details-page__title">
          {name}
        </h2>

        <button
          type="button"
          className="product-details-page__gallery-selected"
        >
          <img
            src={API_URL + selectedImage}
            className="product-details-page__gallery-image"
            alt="phone"
          />
        </button>

        <ul className="product-details-page__gallery-list">
          {images.map(image => (
            <li key={image}>
              <button
                type="button"
                className={cn('product-details-page__gallery-button', {
                  'product-details-page__gallery-button--active':
                    image === selectedImage,
                })}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={API_URL + image}
                  className="product-details-page__gallery-image"
                  alt="phone"
                />
              </button>
            </li>
          ))}
        </ul>

        <section className="product-details-page__options">
          <Options product={product} />
        </section>

      </div>

    </main>
  );
};
