import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getProductItem } from '../../api/api';
import { ProductItem } from '../../types/ProductItem';
import { ProductInfo } from '../../types/ProductInfo';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { BackBtn } from '../../components/BackBtn';
import { AddToCartBtn } from '../../components/AddToCartBtn';
import { AddFavouriteBtn } from '../../components/AddFavouriteBtn';
import { ProductsSlider } from '../../components/ProductsSlider';

import './productDetails.scss';

export const ProductDetails: React.FC = () => {
  const [productDetails, setProductDetails] = useState<ProductInfo>();
  const [productInfo, setProductInfo] = useState<ProductItem>();
  const { productId } = useParams();
  const [currentImage, setCurrentImage] = useState('');
  const [suggProducts, setSuggProducts] = useState<ProductItem[]>([]);

  const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/';

  useEffect(() => {
    if (productId !== undefined) {
      getProductItem(productId, setProductDetails, setCurrentImage);

      fetch(`${BASE_URL}api/products.json`)
        .then((resp) => resp.json())
        .then((data) => {
          setSuggProducts(data);
          setProductInfo(data.find((item: ProductItem) => (
            item.id === productId
          )));
        });
    }
  }, []);

  const setPrice = (() => {
    if (productInfo) {
      if (productInfo.discount > 0) {
        const discount = (productInfo.price / 100) * productInfo.discount;

        return (
          <>
            {`$${productInfo.price - discount}`}
            <span>{`$${productInfo.price}`}</span>
          </>
        );
      }

      return (
        <>
          {`$${productInfo.price}`}
        </>
      );
    }

    return '';
  });

  const getsuggProducts = () => {
    return suggProducts;
  };

  return (
    <div className="product">
      {productDetails && (
        <div className="container">
          <BreadCrumbs title={productDetails.name} />

          <BackBtn />

          <div className="product__content">
            <h1 className="product__title">
              {productDetails.name}
            </h1>
            <div className="product__block">
              {productDetails.images && (
                <div className="product__gallary gallary">
                  <div className="gallary__thumbs">
                    {productDetails.images.map((image) => (
                      <button
                        key={image}
                        type="button"
                        className={classNames(
                          'gallary__thumbItem',
                          {
                            gallary__thumbItem_active: currentImage === image,
                          },
                        )}
                        onClick={() => setCurrentImage(image)}
                      >
                        <img src={`${window.location.origin}/${image}`} alt="" />
                      </button>
                    ))}
                  </div>
                  <div className="gallary__image">
                    <img src={`${window.location.origin}/${currentImage}`} alt="" />
                  </div>
                </div>
              )}

              <div className="product-options">
                {productInfo && (
                  <div className="product-options__price">
                    {setPrice()}
                  </div>
                )}
                <div className="product-options__buttons">
                  {productId && productInfo && (
                    <>
                      <AddToCartBtn id={productId} card={productInfo} />
                      <AddFavouriteBtn id={productId} card={productInfo} />
                    </>
                  )}
                </div>
                <div className="tech-specs__block">
                  {productDetails.display.screenSize && (
                    <div className="tech-specs__item">
                      <span>Screen</span>
                      <p>{productDetails.display.screenSize}</p>
                    </div>
                  )}
                  {productDetails.display.screenResolution && (
                    <div className="tech-specs__item">
                      <span>Resolution</span>
                      <p>{productDetails.display.screenResolution}</p>
                    </div>
                  )}
                  {productDetails.hardware.cpu && (
                    <div className="tech-specs__item">
                      <span>Processor</span>
                      <p>{productDetails.hardware.cpu}</p>
                    </div>
                  )}
                  {productDetails.storage.ram && (
                    <div className="tech-specs__item">
                      <span>RAM</span>
                      <p>{productDetails.storage.ram}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
            <div className="product__bottom">
              <div className="product__descr">
                <h2 className="product__subtitle">
                  About
                </h2>
                <p>
                  {productDetails.description}
                </p>
              </div>
              <div className="tech-specs">
                <h2 className="product__subtitle">
                  Tech specs
                </h2>
                <div className="tech-specs__block">
                  {productDetails.display.screenSize && (
                    <div className="tech-specs__item">
                      <span>Screen</span>
                      <p>{productDetails.display.screenSize}</p>
                    </div>
                  )}
                  {productDetails.display.screenResolution && (
                    <div className="tech-specs__item">
                      <span>Resolution</span>
                      <p>{productDetails.display.screenResolution}</p>
                    </div>
                  )}
                  {productDetails.hardware.cpu && (
                    <div className="tech-specs__item">
                      <span>Processor</span>
                      <p>{productDetails.hardware.cpu}</p>
                    </div>
                  )}
                  {productDetails.storage.ram && (
                    <div className="tech-specs__item">
                      <span>RAM</span>
                      <p>{productDetails.storage.ram}</p>
                    </div>
                  )}
                  {productDetails.storage.flash && (
                    <div className="tech-specs__item">
                      <span>Built in memory</span>
                      <p>{productDetails.storage.flash}</p>
                    </div>
                  )}
                  {productDetails.camera.primary && (
                    <div className="tech-specs__item">
                      <span>Camera</span>
                      <p>{productDetails.camera.primary}</p>
                    </div>
                  )}
                  {productDetails.connectivity.cell && (
                    <div className="tech-specs__item">
                      <span>Cell</span>
                      <p>{productDetails.connectivity.cell}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProductsSlider
        productsList={getsuggProducts()}
        title="Hot prices"
        sliderSettings={{
          dots: false,
          arrows: true,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
        }}
      />
    </div>
  );
};
