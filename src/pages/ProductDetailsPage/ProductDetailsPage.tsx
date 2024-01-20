import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../helpers/fetchClient';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader';
import { getProducts } from '../../api';
import { YouMayAlsoLikes } from '../../components/YouMayAlsoLike';
import { AddToCart } from '../../components/AddToCart';
import { AddToLike } from '../../components/AddToLike';

import './ProductDetailsPage.scss';

export const getProductById = (products: Product[], id: string) => {
  return products.find(product => product.id === id);
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId?: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const addToCartStyles = {
    width: '263px',
    height: '48px',
  };

  const addToLikeStyles = {
    width: '48px',
    height: '48px',
  };

  useEffect(() => {
    /* eslint-disable no-console */
    console.log('ProductId:', productId);

    if (productId) {
      setIsLoading(true);

      getProductDetails(productId)
        .then((response) => {
          /* eslint-disable no-console */
          console.log('API Response:', response);

          setProduct(response as ProductDetails);
          setCurrentImage((response as ProductDetails).images[0]);
          console.log('Product');
        })
        .catch((error) => {
          /* eslint-disable no-console */
          console.error('API Error:', error);
          setIsLoadError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => {
        setIsLoadError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  const productInList = product && getProductById(products, product.id);

  let price = 0;

  if (productInList) {
    price = productInList?.price - productInList?.discount;
  }

  console.log(isLoadError);

  return (
    <>
      {isLoading
        ? <Loader />
        : (
          <>
            <div className="container">
              <div className="ProductDetailsPage">
                <BreadCrumbs product={product} />
                <h1 className="ProductDetailsPage__title">{product?.name}</h1>

                <section className="ProductDetailsPage__content">
                  <div className="ProductDetailsPage__content-imgs-wrapper">
                    <div className="ProductDetailsPage__images">
                      {product?.images.map(img => (
                        <button
                          key={img}
                          type="button"
                          className={cn('ProductDetailsPage__images-button', {
                            'image-active': img === currentImage,
                          })}
                          onClick={() => setCurrentImage(img)}
                        >
                          <img
                            src={img}
                            alt={img}
                            className="ProductDetailsPage__images-item"
                          />
                        </button>
                      ))}
                    </div>
                    <div
                      className="ProductDetailsPage__current-image"
                      key={Math.random()}
                    >
                      <img
                        src={currentImage}
                        alt=""
                        className="ProductDetailsPage__current-image-item"
                      />
                    </div>
                    <div className="ProductDetailsPage__actions">
                      <div className="ProductDetailsPage__options">
                        <p className="ProductDetailsPage__options-title">
                          Available colors
                        </p>
                        <div className="ProductDetailsPage__options-list">
                          <button
                            type="button"
                            aria-label="color"
                            className="ProductDetailsPage__options-color"
                          />
                        </div>
                      </div>
                      {product?.storage.flash
                        && (
                          <div className="ProductDetailsPage__options">
                            <p className="ProductDetailsPage__options-title">
                              Select capacity
                            </p>
                            <div className="ProductDetailsPage__options-list">
                              <button
                                type="button"
                                aria-label="color"
                                className="ProductDetailsPage__options-ram"
                              >
                                {product?.storage.flash}
                              </button>
                            </div>
                          </div>
                        )}
                      <div className="ProductDetailsPage__prices">
                        <span className="ProductDetailsPage__prices-now">
                          {`$${price}`}
                        </span>

                        <span className="ProductDetailsPage__prices-before">
                          {`$${productInList?.price}`}
                        </span>
                      </div>
                      {productInList && (
                        <div className="ProductDetailsPage__buttons">
                          <AddToCart
                            product={productInList}
                            styles={addToCartStyles}
                          />
                          <AddToLike
                            product={productInList}
                            styles={addToLikeStyles}
                          />
                        </div>
                      )}
                      <div className="ProductDetailsPage__info">
                        <div className="ProductDetailsPage__info-container">
                          <span className="ProductDetailsPage__info-title">
                            Screen
                          </span>
                          <span
                            className="ProductDetailsPage__info-specification"
                          >
                            {product?.display.screenSize}
                          </span>
                        </div>

                        <div className="ProductDetailsPage__info-container">
                          <span className="ProductDetailsPage__info-title">
                            Resolution
                          </span>
                          <span
                            className="ProductDetailsPage__info-specification"
                          >
                            {product?.display.screenResolution}
                          </span>
                        </div>

                        <div className="ProductDetailsPage__info-container">
                          <span className="ProductDetailsPage__info-title">
                            Processor
                          </span>
                          <span
                            className="ProductDetailsPage__info-specification"
                          >
                            {product?.hardware.cpu}
                          </span>
                        </div>

                        <div className="ProductDetailsPage__info-container">
                          <span className="ProductDetailsPage__info-title">
                            RAM
                          </span>
                          <span
                            className="ProductDetailsPage__info-specification"
                          >
                            {product?.storage.ram ? `${product?.storage.ram}` : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="ProductDetailsPage__more">
                  <div className="ProductDetailsPage__more-about">
                    <div className="ProductDetailsPage__more-title">
                      <h2 className="ProductDetailsPage__more-title-item">
                        About
                      </h2>
                      <div
                        className="ProductDetailsPage__more-description"
                      >
                        {product?.description}
                      </div>
                    </div>
                  </div>
                  <div className="ProductDetailsPage__more-tech">
                    <div className="ProductDetailsPage__more-title">
                      <h2 className="ProductDetailsPage__more-title-item">
                        Tech specs
                      </h2>
                    </div>
                    <div className="ProductDetailsPage__more-tech-content">
                      <div className="ProductDetailsPage__more-tech-wrap">
                        <p className="ProductDetailsPage__more-tech-property">
                          Screen
                        </p>
                        <p className="ProductDetailsPage__more-tech-value">
                          {product?.display.screenSize}
                        </p>
                      </div>
                      <div className="ProductDetailsPage__more-tech-wrap">
                        <p className="ProductDetailsPage__more-tech-property">
                          Resolution
                        </p>
                        <p className="ProductDetailsPage__more-tech-value">
                          {product?.display.screenResolution}
                        </p>
                      </div>
                      <div className="ProductDetailsPage__more-tech-wrap">
                        <p className="ProductDetailsPage__more-tech-property">
                          Processor
                        </p>
                        <p className="ProductDetailsPage__more-tech-value">
                          {product?.hardware.cpu}
                        </p>
                      </div>

                      <div className="ProductDetailsPage__more-tech-wrap">
                        <p className="ProductDetailsPage__more-tech-property">
                          RAM
                        </p>
                        <p className="ProductDetailsPage__more-tech-value">
                          {product?.storage.ram
                            ? product.storage.ram : '-'}
                        </p>
                      </div>
                      <div className="ProductDetailsPage__more-tech-wrap">
                        <p className="ProductDetailsPage__more-tech-property">
                          Built in memory
                        </p>
                        <p className="ProductDetailsPage__more-tech-value">
                          {product?.storage.flash
                            ? product.storage.flash : '-'}
                        </p>
                      </div>
                      <div className="ProductDetailsPage__more-tech-wrap">
                        <p className="ProductDetailsPage__more-tech-property">
                          Camera
                        </p>
                        <p className="ProductDetailsPage__more-tech-value">
                          {product?.camera.primary
                            ? product.camera.primary : '-'}
                        </p>
                      </div>

                      <div className="ProductDetailsPage__more-tech-wrap">
                        <p className="ProductDetailsPage__more-tech-property">
                          Zoom
                        </p>
                        <p className="ProductDetailsPage__more-tech-value">
                          -
                        </p>
                      </div>

                      <div className="ProductDetailsPage__more-tech-wrap">
                        <p className="ProductDetailsPage__more-tech-property">
                          Cell
                        </p>
                        <p className="ProductDetailsPage__more-tech-value">
                          {product?.connectivity.cell}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <YouMayAlsoLikes phones={products} />
          </>
        )}
    </>
  );
};
