import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { useLocation, useParams } from 'react-router-dom';
import {
  getDetailedAccessories,
  getDetailedPhones,
  getDetailedTablets,
} from '../../api/DetailedProduct';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Product } from '../../types/Product';
import './ProductDetailPage.scss';
import { SliderPhotos } from './SliderPhotos/SliderPhotos';
import { AvailableColors } from './AvailableProperties/AvailableColors';
import { CapacityAvailable } from './CapacityAvailable/CapacityAvailable';
import { ProductsSlider } from '../ProductsSlider';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import classNames from 'classnames';

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const { selectedProduct, onSelectedProduct, selectedImg, phones } =
    useContext(ProductContext);

  const youMayAlsoLike = getSuggestedProducts(phones);

  useEffect(() => {
    const getProductProperties = async () => {
      let detailsData: Product[] = [];

      if (pathname.includes('phones')) {
        detailsData = await getDetailedPhones();
      } else if (pathname.includes('tablets')) {
        detailsData = await getDetailedTablets();
      } else if (pathname.includes('accessories')) {
        detailsData = await getDetailedAccessories();
      }

      const data =
        detailsData.find(product => product.id === productId) || null;

      onSelectedProduct(data);
    };

    getProductProperties();
  }, []);

  if (!selectedProduct) {
    return;
  }

  const checkItemInCart = () => {
    return false;
  };

  const checkLikedItem = () => {
    return false;
  };

  return (
    <>
      <div className="details__wrapper container">
        <Breadcrumbs />
        <div className="details">
          <h1 className="details__title">{selectedProduct?.name}</h1>
          <div className="details__container">
            <div className="details__slider-photos">
              {selectedProduct.images.map(img => {
                return <SliderPhotos img={img} key={`img${img}`} />;
              })}
            </div>
            <div className="details__main-photo">
              {selectedImg ? (
                <img
                  className="details__main-photo--img"
                  src={selectedImg}
                  alt="main photo"
                />
              ) : (
                <img
                  className="details__main-photo--img"
                  src={selectedProduct.images[0]}
                  alt="main photo"
                />
              )}
            </div>

            <div className="details__properties">
              <p className="details__properties--text">Available colors</p>
              <AvailableColors
                selectedProduct={selectedProduct}
                property={'colors'}
              />
              <div className="line"></div>

              <CapacityAvailable selectedProduct={selectedProduct} />

              <div className="line"></div>
              <div className="details__buttons">
                <div className="details__prices">
                  <p className="details__prices--discount">
                    ${selectedProduct.priceDiscount}
                  </p>
                  <p className="details__prices--full">
                    ${selectedProduct.priceRegular}
                  </p>
                </div>
                <div className="details__button">
                  <button
                    className={classNames('details__button--add', {
                      'details__button--add--active': checkItemInCart(),
                    })}
                  >
                    Add to cart
                  </button>
                  <button className="details__button--like">
                    <div
                      className={classNames('details__button--like__link', {
                        'details__button--like__link__active': checkLikedItem(),
                      })}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="details__descriptions--container">
            <div className="details__items-about">
              <p className="details__items-about-title">About</p>
              <div className="line"></div>
              <div className="details__items-about__wrapper">
                {selectedProduct.description.map(item => {
                  return (
                    <React.Fragment key={`${item.text}`}>
                      <div className="details__items-about-container">
                        <p className="details__items-about-container-title">
                          {item.title}
                        </p>
                        <p className="details__items-about-container-text">
                          {item.text}
                        </p>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <div className="details__specs">
              <p className="details__specs__title">Tech specs</p>
              <div className="line"></div>
              <div className="details__specs__items">
                <div className="details__specs__item">
                  <p className="details__specs__item--name">Screen</p>
                  <p className="details__specs__item--description">
                    {selectedProduct.screen}
                  </p>
                </div>
                <div className="details__specs__item">
                  <p className="details__specs__item--name">Resolution</p>
                  <p className="details__specs__item--description">
                    {selectedProduct.resolution}
                  </p>
                </div>
                <div className="details__specs__item">
                  <p className="details__specs__item--name">Processor</p>
                  <p className="details__specs__item--description">
                    {selectedProduct.processor}
                  </p>
                </div>
                <div className="details__specs__item">
                  <p className="details__specs__item--name">RAM</p>
                  <p className="details__specs__item--description">
                    {selectedProduct.ram}
                  </p>
                </div>
                <div className="details__specs__item">
                  <p className="details__specs__item--name">Built in memory</p>
                  <p className="details__specs__item--description">
                    {selectedProduct.capacity}
                  </p>
                </div>
                <div className="details__specs__item">
                  <p className="details__specs__item--name">Camera</p>
                  <p className="details__specs__item--description">
                    {selectedProduct.camera}
                  </p>
                </div>
                <div className="details__specs__item">
                  <p className="details__specs__item--name">Zoom</p>
                  <p className="details__specs__item--description">
                    {selectedProduct.zoom}
                  </p>
                </div>
                <div className="details__specs__item">
                  <p className="details__specs__item--name">Cell</p>
                  <p className="details__specs__item--description">
                    {selectedProduct.cell}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductsSlider title={'You may also like'} products={youMayAlsoLike} />
      </div>
    </>
  );
};
