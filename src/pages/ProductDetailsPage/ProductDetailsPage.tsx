/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import { Error } from '../../components/Error/Error';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { getProduct } from '../../helpers/getProduct';
import './ProductDetailsPage.scss';
import '../../scss/blocks/grid.scss';
import { DetailProduct } from '../../types/DetailProduct';
import { getProducts } from '../../helpers/api';
import { Product } from '../../types/Product';
import '../../scss/blocks/addToCartButtons.scss';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { BuyFavButton } from '../../components/BuyFavButton/BuyFavButton';

const availableColors = ['#fcdbc1', '#5f7170', '#4c4c4c', '#f0f0f0'];
const capacity = ['64 GB', '256 GB', '512 GB'];

export const ProductDetailsPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [detailProduct, setDetailProduct] = useState<DetailProduct>();
  const [device, setDevice] = useState<Product>();
  const noError = !loadingError && !isLoading;
  const [selectedCapacity, setSelectedCapacity] = useState(capacity[0]);
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [mainPhoto, setMainPhoto] = useState<string>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const productId = path.split('/')[2];

  async function getInfo() {
    setIsLoading(true);
    try {
      setLoadingError(false);
      const responseProducts = await getProducts();
      const responseProduct = await getProduct(productId);

      const findDevice = responseProducts
        .find(product => product.id === productId);

      setSuggestedProducts(responseProducts);
      setDetailProduct(responseProduct);
      setDevice(findDevice);
      setMainPhoto(responseProduct?.images[0]);
    } catch (e) {
      setLoadingError(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    const abortController = new AbortController();

    getInfo();

    return () => {
      abortController.abort();
    };
  }, [path]);

  const getSuggestedProducts = useMemo(() => {
    const shuffledArr = suggestedProducts?.sort(() => {
      return Math.random() - 0.5;
    });

    return shuffledArr;
  }, [suggestedProducts]);

  return (
    <>
      {!isLoading && loadingError && (
        <div className="page__notification">
          <Error />
        </div>
      )}

      {isLoading && (
        <div className="page__notification">
          <Loader />
        </div>
      )}
      {noError && (
        <>
          <Breadcrumbs product={detailProduct} />
          <div className="page__backButton">
            <BackButton />
          </div>
          <section className="ProductDetailsPage">
            <h1 className="page__sectionTitle ProductDetailsPage__title">
              {detailProduct?.name}
            </h1>
            <section className="ProductDetailsPage__content page__section grid">
              <div className="
                ProductDetailsPage__smallPhotos
                grid__item--1-2"
              >
                {detailProduct?.images.map(image => (
                  <div
                    className={classNames(
                      'ProductDetailsPage__smallPhotoContainer',
                      {
                        'ProductDetailsPage__smallPhotoContainer--active':
                        image === mainPhoto,
                      },
                    )}
                    key={image}
                    onClick={() => setMainPhoto(image)}
                  >
                    <img
                      src={`https://mate-academy.github.io/react_phone-catalog/${image}`}
                      alt={detailProduct?.id}
                      className="ProductDetailsPage__smallImg"
                    />
                  </div>
                ))}
              </div>
              <div className="
                ProductDetailsPage__mainPhoto
                grid__item--3-12"
              >
                <div className="ProductDetailsPage__mainPhotoContainer">
                  <img
                    src={`https://mate-academy.github.io/react_phone-catalog/${mainPhoto}`}
                    alt={detailProduct?.id}
                    className="ProductDetailsPage__mainImg"
                  />
                </div>
              </div>
              <div className="
                ProductDetailsPage__parameters
                grid__item--14-20"
              >
                <div className="ProductDetailsPage__colors">
                  <p className="ProductDetailsPage__blockName">
                    Available colors
                  </p>
                  <div className="ProductDetailsPage__select">
                    {availableColors.map(color => (
                      <div
                        className={classNames(
                          'ProductDetailsPage__outSideBorder',
                          {
                            'ProductDetailsPage__outSideBorder--active':
                            selectedColor === color,
                          },
                        )}
                        key={color}
                        onClick={() => setSelectedColor(color)}
                      >
                        <div
                          className="ProductDetailsPage__color"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="ProductDetailsPage__line" />
                </div>
                <div className="ProductDetailsPage__capacity">
                  <p className="ProductDetailsPage__blockName">
                    Select capacity
                  </p>
                  <div className="ProductDetailsPage__select">
                    {capacity.map(GB => (
                      <button
                        type="button"
                        className={classNames(
                          'button',
                          'ProductDetailsPage__countGB',
                          { 'button--active': selectedCapacity === GB },
                        )}
                        key={GB}
                        onClick={() => setSelectedCapacity(GB)}
                      >
                        {GB}
                      </button>
                    ))}
                  </div>
                  <div className="
                    ProductDetailsPage__line
                    ProductDetailsPage__line--last"
                  />
                </div>
                <div className="ProductDetailsPage__price">
                  <span className="ProductDetailsPage__withDiscount">{`$${device?.price}`}</span>
                  {!!device?.discount && (
                    <span className="ProductDetailsPage__noDiscount">
                      {`$${Math.floor(device?.price * ((100 + device?.discount) / 100))}`}
                    </span>
                  )}
                </div>
                <div className="
                  ProductDetailsPage__buyButtons"
                >
                  <BuyFavButton product={device} />
                </div>
                <div className="productParameters ProductDetailsPage__params">
                  <div className="productParameters__parameter">
                    <span className="productParameters__character">Screen</span>
                    <span className="productParameters__value">
                      {device?.screen.replace(/ inches/, '"')}
                    </span>
                  </div>
                  <div className="productParameters__parameter">
                    <span className="productParameters__character">
                      Resolution
                    </span>
                    <span className="productParameters__value">
                      {detailProduct?.display.screenResolution}
                    </span>
                  </div>
                  <div className="productParameters__parameter">
                    <span className="productParameters__character">RAM</span>
                    <span className="productParameters__value">
                      {device?.ram}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="ProductDetailsPage__about page__section grid"
              data-cy="productDescription"
            >
              <div className="
                ProductDetailsPage__aboutText
                grid__item--1-12"
              >
                <h2 className="ProductDetailsPage__aboutTitle">
                  About
                </h2>
                <div className="
                  ProductDetailsPage__line--last
                  ProductDetailsPage__line"
                />
                <p className="ProductDetailsPage__text">
                  {detailProduct?.description}
                </p>
              </div>
              <div className="
                ProductDetailsPage__techSpecs
                grid__item--14-24"
              >
                <h2 className="ProductDetailsPage__aboutTitle">
                  Tech Specs
                </h2>
                <div className="ProductDetailsPage__line" />
                <div className="
                  productParameters
                  ProductDetailsPage__techSpecsParams"
                >
                  <div className="productParameters__parameter">
                    <span className="productParameters__character">Screen</span>
                    <span className="productParameters__value">
                      {device?.screen.replace(/ inches/, '"')}
                    </span>
                  </div>
                  <div className="productParameters__parameter">
                    <span className="productParameters__character">
                      Resolution
                    </span>
                    <span className="productParameters__value">
                      {detailProduct?.display.screenResolution}
                    </span>
                  </div>
                  <div className="productParameters__parameter">
                    <span className="productParameters__character">RAM</span>
                    <span className="productParameters__value">
                      {device?.ram}
                    </span>
                  </div>
                  <div className="productParameters__parameter">
                    <span className="productParameters__character">
                      Battery
                    </span>
                    <span className="productParameters__value">
                      {detailProduct?.battery.type}
                    </span>
                  </div>
                  <div className="productParameters__parameter">
                    <span className="productParameters__character">
                      Camera
                    </span>
                    <span className="productParameters__value">
                      {detailProduct?.camera.primary}
                    </span>
                  </div>
                  <div className="productParameters__parameter">
                    <span className="productParameters__character">
                      Bluetooth
                    </span>
                    <span className="productParameters__value">
                      {detailProduct?.connectivity.bluetooth}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="page__section ProductsSlider"
            >
              <ProductsSlider
                products={getSuggestedProducts}
                title="You may also like"
              />
            </section>
          </section>
        </>
      )}
    </>
  );
};
