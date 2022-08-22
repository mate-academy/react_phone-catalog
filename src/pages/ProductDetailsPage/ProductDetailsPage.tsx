/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import './ProductDetailsPage.scss';
import * as request from '../../api/request';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';

import { Loader } from '../../components/Loader/Loader';
import { ProductsContext } from '../../helpers/ProductContext';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    addToLocalStorage,
    removeFromLocalStorage,
    getLocalStorageArray,
  } = useContext(ProductsContext);

  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState<boolean>();
  const [addedToFavorites, setAddedToFavorites] = useState<boolean>();
  const [mainImage, setMainImage] = useState<string>();
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [phoneNotFound, setPhoneNotFound] = useState<boolean>(false);

  const navigate = useNavigate();
  const { selectedProduct } = useParams();

  useEffect(() => {
    const getProductDetails = async () => {
      const data = await request.getProductDetails(selectedProduct)
        .then(setProductDetails)
        .catch(() => setPhoneNotFound(true));

      setIsLoaded(true);

      return data;
    };

    getProductDetails();
    setMainImage('');
  }, [selectedProduct]);

  useEffect(() => {
    const getSuggestedProducts = async () => {
      const data = await request.getSuggestedProducts()
        .then(setSuggestedProducts);

      return data;
    };

    getSuggestedProducts();
  }, []);

  const product: Product | undefined = products
    .find(item => item.id === productDetails?.id);

  const itemInLocaleStorage = (key: string) => {
    const array: Product[] = getLocalStorageArray(key);

    return array.find(item => item.id === product?.id);
  };

  const goBackPage = () => {
    navigate(-1);
  };

  if (!isLoaded) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (phoneNotFound) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }

  return (
    <>
      <div className="details-page">
        <div className="details-page-wrapper">
          <div className="breadcrumbs-container" data-cy="breadCrumbs">
            <Link to="/">
              <i className="fa-solid fa-house icon" />
            </Link>
            <i className="fa-solid fa-angle-right icon" />
            <Link to="/phones">
              <span className="icon-title">Phones</span>
            </Link>
            <i className="fa-solid fa-angle-right icon" />
            <div className="breadcrumbs_title-container">
              <span className="icon-title">
                {productDetails?.name.replace('™', '')}
              </span>
            </div>
          </div>
          <div
            className="icons-container"
            onClick={() => goBackPage()}
            data-cy="backButton"
          >
            <i className="fa-solid fa-angle-left icon" />
            <span className="icon-title">Back</span>
          </div>

          <div className="header-container">
            <h1 className="product-title">
              {productDetails?.name.replace('™', '')}
            </h1>
          </div>

          <div className="product-details">
            <div className="product-details-wrapper">
              {product
                && (
                  <>
                    <div className="product-photo">
                      <div className="product-photo_slider">
                        {productDetails?.images.map(img => (
                          <img
                            className={classNames(
                              'img-slider',
                              { selected: mainImage === img },
                            )}
                            key={img}
                            src={img}
                            alt={img}
                            onClick={() => setMainImage(img)}
                          />
                        ))}
                      </div>
                      <div className="product-photo_main">
                        <img
                          className="product-image_details-page"
                          src={mainImage || productDetails?.images[0]}
                          alt={product.name}
                        />
                      </div>
                    </div>

                    <div className="product-details-container">
                      <div className="product-price">
                        <div className="product-price-title">
                          {product.discount !== 0
                            && (
                              <p className="price">{`$${Math.round(product.price - (product.price / product.discount))}`}</p>
                            )}
                          <p className={(product.discount
                            ? 'has-discount'
                            : 'price')}
                          >
                            {`$${product.price}`}
                          </p>
                        </div>

                        <div className="product-content-info">
                          <div className="product-info">
                            <p className="product-value">Screen</p>
                            <p className="product-description">
                              {product.screen || 'No data'}
                            </p>
                          </div>
                          <div className="product-info">
                            <p className="product-value">
                              Capacity
                            </p>
                            <p className="product-description">
                              {product.capacity || 'No data'}
                            </p>
                          </div>
                          <div className="product-info">
                            <p className="product-value">RAM</p>
                            <p className="product-description">
                              {product.ram || 'No data'}
                            </p>
                          </div>
                        </div>
                        <div className="product-footer">
                          {!itemInLocaleStorage('cart') && !addedToCart
                            ? (
                              <button
                                type="button"
                                className="
                                product-button-add
                                button-description"
                                onClick={() => {
                                  addToLocalStorage('cart', product);
                                  setAddedToCart(true);
                                }}
                              >
                                Add to cart
                              </button>
                            )
                            : (
                              <button
                                type="button"
                                className="
                                product-button-add
                                added
                                button-description"
                                onClick={() => {
                                  removeFromLocalStorage('cart', product);
                                  setAddedToCart(false);
                                }}
                              >
                                Added to cart
                              </button>
                            )}
                          {!itemInLocaleStorage('favorites')
                            && !addedToFavorites
                            ? (
                              <button
                                type="button"
                                className="product-button-favorites"
                                data-cy="addToFavorite"
                                onClick={() => {
                                  addToLocalStorage('favorites', product);
                                  setAddedToFavorites(true);
                                }}
                              >
                                <i className="fa-regular fa-heart" />
                              </button>
                            )
                            : (
                              <button
                                type="button"
                                className="product-button-favorites added"
                                data-cy="addToFavorite"
                                onClick={() => {
                                  removeFromLocalStorage('favorites', product);
                                  setAddedToFavorites(false);
                                }}
                              >
                                <i className="fa-solid fa-heart red-color" />
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="product-about" data-cy="productDescription">
                      <div className="product-about_title-container">
                        <p className="product-about_title">About</p>
                      </div>
                      <div className="product-about_description-container">
                        <p className="product-about_description">
                          {productDetails?.description}
                        </p>
                      </div>
                    </div>

                    <div className="product-tech_specs">
                      <div className="product-about_title-container">
                        <p className="product-about_title">Tech Specs</p>
                      </div>
                      <div className="product-info-container">
                        <div className="product-info">
                          <p className="product-value_details-page">
                            Resolution
                          </p>
                          <p className="product-description">
                            {productDetails?.display.screenResolution
                              || 'No data'}
                          </p>
                        </div>
                        <div className="product-info">
                          <p className="product-value_details-page">Camera</p>
                          <p className="product-description">
                            {productDetails?.camera.primary || 'No data'}
                          </p>
                        </div>
                        <div className="product-info">
                          <p className="product-value_details-page">
                            Bluetooth
                          </p>
                          <p className="product-description">
                            {productDetails?.connectivity.bluetooth
                              || 'No data'}
                          </p>
                        </div>
                        <div className="product-info">
                          <p className="product-value_details-page">
                            Battery capacity
                          </p>
                          <p className="product-description">
                            {productDetails?.battery.standbyTime || 'No data'}
                          </p>
                        </div>
                        <div className="product-info">
                          <p className="product-value_details-page">USB</p>
                          <p className="product-description">
                            {productDetails?.hardware.usb || 'No data'}
                          </p>
                        </div>
                        <div className="product-info">
                          <p className="product-value_details-page">Weight</p>
                          <p className="product-description">
                            {productDetails?.sizeAndWeight.weight || 'No data'}
                          </p>
                        </div>
                        <div className="product-info">
                          <p className="product-value_details-page">CPU</p>
                          <p className="product-description">
                            {productDetails?.hardware.cpu || 'No data'}
                          </p>
                        </div>
                        <div className="product-info">
                          <p className="product-value_details-page">Wi-Fi</p>
                          <p className="product-description">
                            {productDetails?.connectivity.wifi || 'No data'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </div>
            <div className="you-may-also-like">
              <ProductSlider
                products={suggestedProducts}
                title="You may also like"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
