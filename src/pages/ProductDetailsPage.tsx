/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-confusing-arrow */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { API_URL, getProductDetails } from '../utils/api-phones';
// import { shuffleArrays } from '../utils/shuffleArrays';
import { ProductDetails } from '../types/ProductDetails';
import { Error } from '../types/Error';
import { Categories } from '../types/Categories';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { Loader } from '../components/Loader';
import { NotFoundPage } from './NotFoundPage';
import { Options } from '../components/Options';
import { About } from '../components/About';
import { TechSpecs } from '../components/TechSpecs';
import { ProductsSlider } from '../components/ProductsSlider';
import { BackButton } from '../components/BackButton';

import '../styles/ProductDetailsPage.scss';
import { Product } from '../types/Product';
import { shuffleArrays } from '../utils/shuffleArrays';
import { GlobalContext } from '../GlobalContext';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { products, isLoading, setIsLoading } = useContext(GlobalContext);

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>(products);
  const [selectedImage, setSelectedImage] = useState<string | undefined>('');

  const randomSliderTitle = 'You may also like';

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      window.scrollTo(0, 0);

      getProductDetails(productId)
        .then((resolve) => {
          setProduct(resolve);
          setShuffledProducts(shuffleArrays(products));
          setSelectedImage(resolve.images[0]);
        })
        .catch(() => Error.Loading)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId, products, setIsLoading]);

  if (!product) {
    return (
      <>
        {isLoading && <Loader />}
        {!isLoading && <NotFoundPage />}
      </>
    );
  }

  const { images, name, description } = product;

  return (
    <main className={cn('product-details-page', {
      'product-details-page--is-loading': isLoading,
    })}
    >
      <BreadCrumbs
        category={Categories.Phones}
        productName={name}
      />

      <BackButton />

      <div className="product-details-page__content">
        <div className="product-details-page__content-top">
          <h2 className="product-details-page__title">
            {name}
          </h2>

          <div className="product-details-page__gallery-selected">
            <img
              src={API_URL + selectedImage}
              className="product-details-page__gallery-image"
              alt="phone"
            />
          </div>

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

        <div className="product-details-page__content-button">
          <section
            className="product-details-page__about"
            data-cy="productDescription"
          >
            <About description={description} />
          </section>

          <section
            className="product-details-page__tech-specs"
          >
            <TechSpecs product={product} />
          </section>
        </div>

        <ProductsSlider
          products={shuffledProducts}
          title={randomSliderTitle}
        />

      </div>

    </main>
  );
};
