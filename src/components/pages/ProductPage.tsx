/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
// import React from 'react'

import { useEffect, useMemo, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import SectionTopBar from '../SectionTopBar';
import { Product } from '../../types/Phone';
import {
  // ProductType,
  getProducts,
  // getProductsWithType,
  getSingleProduct,
} from '../../api/getProducts';
import ProductCard from '../ProductCard';
import { ProductFeatures } from '../../types/ProductFeatures';
import Loader from '../Loader';
import { getPrevPrice } from '../../utils/getPrevPrice';
import { IconSlideLeft } from '../../utils/Icons';
import AsideRoute from '../AsideRoute';

// const images = ['https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75&q=75', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwLCJLAkkHvZLGCy_zRGHTDaeQCiaHZAn3HBdskrYU24R9wWkiC7wa8PvEefHnWeiKQug&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOKSs05sHWtPpkha6yJZwU4R_4WJox85ZiDjL2TpkzzpViTcE9NzEdn3wwng3Fj3g4GhE&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VLcXcsu6HZeRmdLu21uqglf_JCtHwRj80LyQfVGGir363JkDLKRpH02977LIFat-A10&usqp=CAU', 'https://media.zigcdn.com/media/content/2013/Mar/honda-activa-het-update-action-side-shot-roadtest-2132013-thumb.jpg'];

const ProductPage = () => {
  // const type = ProductType.PHONE;
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4;

  const [currentProductFeatures, setCurrentProductFeatures]
    = useState<ProductFeatures | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSingleProduct(productId || '')
      .then((productFromAPI) => setCurrentProductFeatures(productFromAPI))
      .finally(() => setIsLoading(false));
  }, []);

  const [srcOfShownImage, setSrcOfShownImage] = useState(
    currentProductFeatures?.images[0],
  );

  useEffect(() => {
    getProducts().then((productsFromAPI) => setProducts(productsFromAPI));
  }, []);

  const currentProduct = useMemo(() => products
    .find((productFromAPI => productFromAPI.id === currentProductFeatures?.id)),
  [currentProductFeatures]);

  const visibleProducts = useMemo(
    () => products?.slice(currentIndex, currentIndex + productsPerPage),
    [products, currentIndex],
  );

  return !isLoading && currentProductFeatures && currentProduct ? (
    <main className="main-product-page container">
      <AsideRoute product={currentProduct} productName={currentProduct.name} />

      <Link to="/" className="link-go-back">
        <IconSlideLeft />
        <span className="link-go-back__caption">Back</span>
      </Link>

      <section className="section-product">
        <h1 className="section-product__title">
          {currentProductFeatures.name}
        </h1>

        <article className="section-product__images">
          <div className="section-product__images--block">
            <div className="section-product__images--other">
              {currentProductFeatures.images.map((url) => (
                <img
                  key={url}
                  onClick={() => setSrcOfShownImage(url)}
                  src={url}
                  className={`section-product__images--small${
                    srcOfShownImage === url ? '--picked' : ''
                  }`}
                  alt="img"
                />
              ))}
            </div>

            <img
              src={srcOfShownImage}
              className="section-product__images--is-shown"
              alt="6"
            />
          </div>
        </article>

        <article className="section-product__purchase">
          <div className="section-product__price product-card--price">
            <h3 className="product-card--new-price">
              {`$${currentProduct.price}`}
            </h3>

            {currentProduct.discount !== 0 && (
              <p className="product-card--old-price">
                {`$${getPrevPrice(currentProduct.price, currentProduct.discount)}`}
              </p>
            )}
          </div>

          <div className="section-product__buttons product-card--buttons">
            <button
              type="button"
              className="product-card--add-to-cart"
              style={{ width: '263px', height: '48px' }}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="product-card--add-to-favorites"
              style={{ width: '48px', height: '48px' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.62852 1.63137C10.1584 1.4118 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.4118 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98394 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66667C15.6679 6.24028 15.5549 6.80827 15.3353 7.33819C15.1158 7.86806 14.794 8.34949 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.82501 0.33252 5.66667C0.33252 4.50833 0.792668 3.39743 1.61174 2.57836C2.43081 1.75929 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75929 7.78835 2.57836L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57844 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07392 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07392 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.56831C6.24189 3.01179 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01179 2.60169 3.56831C2.04517 4.12483 1.73252 4.87963 1.73252 5.66667C1.73252 6.4537 2.04517 7.20851 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48953 13.8928 7.16231 14.042 6.80228C14.1911 6.44226 14.2679 6.05637 14.2679 5.66667C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17103 13.6739 3.84369 13.3983 3.56819Z"
                  fill="#333333"
                />
              </svg>
            </button>
          </div>

          <div className="product-card--features">
            <div className="product-card--feature">
              <h4 className="product-card--feature-title">CPU</h4>
              <p className="product-card--feature-value">
                {currentProductFeatures.hardware.cpu}
              </p>
            </div>
            <div className="product-card--feature">
              <p className="product-card--feature-title">
                Battery stand by time
              </p>
              <p className="product-card--feature-value">
                {currentProductFeatures.battery.standbyTime}
              </p>
            </div>
            <div className="product-card--feature">
              <p className="product-card--feature-title">Display</p>
              <p className="product-card--feature-value">
                {currentProductFeatures.display.screenResolution}
              </p>
            </div>
          </div>
        </article>

        <article className="section-product__description">
          <h3 className="section-product__description--title">About</h3>

          <p className="section-product__description--paragraph">
            {currentProductFeatures.description}
          </p>
        </article>

        <article className="section-product__description">
          <h3 className="section-product__description--title">Tech specs</h3>

          <div className="section-product__description--specs">
            <div className="section-product__description--feature">
              <p className="section-product__description--feature--name">
                Battery type
              </p>

              <p className="section-product__description--feature--value">
                {currentProductFeatures.battery.type}
              </p>
            </div>

            <div className="section-product__description--feature">
              <p className="section-product__description--feature--name">
                WiFi
              </p>

              <p className="section-product__description--feature--value">
                {currentProductFeatures.connectivity.wifi}
              </p>
            </div>

            {currentProductFeatures.camera.primary && (
              <div className="section-product__description--feature">
                <p className="section-product__description--feature--name">
                  Camera
                </p>

                <p className="section-product__description--feature--value">
                  {currentProductFeatures.camera.primary}
                </p>
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="section section-other">
        <SectionTopBar
          title="You may also like"
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          productsPerPage={productsPerPage}
          filteredProducts={products}
        />

        <div className="browse-products">
          {visibleProducts?.map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </main>
  ) : (
    <Loader />
  );
};

export default ProductPage;
