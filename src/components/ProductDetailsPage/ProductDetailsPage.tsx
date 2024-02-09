import React, { useContext, useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { getProductDetails } from '../../api/products';
import { ProductDetails } from '../../types/ProductDetails';
import { Buttons } from '../Buttons';
import { ProductPictures } from '../ProductPictures';
import { GlobalContext } from '../../GlobalContext';
import { getLink } from '../../services/getLink';
import { AvailableColors } from '../AvailableColors';
import { AboutProduct } from '../AboutProduct';
import { TechSpecs } from '../TechSpecs/TechSpecs';
import { ProductsSlider } from '../ProductsSlider';
import { Loader } from '../Loader';
import { ButtonBack } from '../ButtonBack';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { productsList, isLoading, setIsLoading } = useContext(GlobalContext);
  const [errorMsg, setErrorMsg] = useState('');

  const [
    productDetails, setProductDetails,
  ] = useState<ProductDetails | null>(null);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    if (productId) {
      getProductDetails(productId)
        .then(setProductDetails)
        .catch(() => setErrorMsg('Phone was not found'))
        .finally(() => setIsLoading(false));
    }
  }, [productId, setIsLoading, setErrorMsg]);

  const itemId = productsList
    .find(item => item.itemId === productDetails?.id)?.id
    .padStart(6, '0') || '0';

  const mayAlsoLikeList = productsList.filter(item => (
    productDetails
      ? item.itemId.includes(productDetails.namespaceId)
      : []
  ));

  return (
    <>
      {isLoading && (
        <Loader />
      )}

      {!isLoading && errorMsg && (
        <h1
          className="
            ProductDetailsPage__title
            ProductDetailsPage__title--error
          "
        >
          {errorMsg}
        </h1>
      )}

      {!isLoading && productDetails && !errorMsg && (
        <>
          <div className="ProductDetailsPage">
            <ButtonBack />

            <h1 className="ProductDetailsPage__title">
              {productDetails.name}
            </h1>

            <ProductPictures
              pictures={productDetails.images}
            />

            <div className="ProductDetailsPage__top-center">
              <div className="ProductDetailsPage__top-center-wrapper">
                <div className="ProductDetailsPage__top-center-content">
                  <p className="ProductDetailsPage__small-text">
                    Available colors
                  </p>

                  <AvailableColors
                    colorsAvailable={productDetails.colorsAvailable}
                    currentColor={productDetails.color}
                    linkPart={productDetails.namespaceId}
                    capacity={productDetails.capacity}
                  />
                </div>

                <div className="ProductDetailsPage__deviding-line" />

                <div className="ProductDetailsPage__top-center-content">
                  <p className="ProductDetailsPage__small-text">
                    Select capacity
                  </p>

                  <ul
                    style={{
                      display: 'flex',
                      columnGap: '8px',
                    }}
                  >
                    {productDetails.capacityAvailable.map(cap => (
                      <li key={cap}>
                        <Link
                          to={`../${getLink(productDetails.namespaceId, cap, productDetails.color)}`}
                          className={classNames(
                            'ProductDetailsPage__link-capacity',
                            {
                              'ProductDetailsPage__link-capacity--active':
                                productDetails.capacity === cap,
                            },
                          )}
                        >
                          {`${cap.slice(0, -2)} ${cap.slice(-2)}`}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ProductDetailsPage__deviding-line" />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '16px',
                  marginBottom: '32px',
                }}
              >
                <div style={{
                  display: 'flex',
                  columnGap: '8px',
                  alignItems: 'center',
                }}
                >
                  <h1 className="ProductDetailsPage__price">
                    {productDetails.priceDiscount}
                  </h1>
                  <h2
                    className="
                  ProductDetailsPage__price
                  ProductDetailsPage__price--full
                "
                  >
                    {productDetails.priceRegular}
                  </h2>
                </div>

                <Buttons
                  id={productDetails.id}
                  height="48px"
                  width="48px"
                />

              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '8px',
                }}
              >
                <div className="ProductDetailsPage__info">
                  <span className="ProductDetailsPage__info-name">
                    Screen
                  </span>
                  <span className="ProductDetailsPage__info-value">
                    {productDetails.screen}
                  </span>
                </div>
                <div className="ProductDetailsPage__info">
                  <span className="ProductDetailsPage__info-name">
                    Processor
                  </span>
                  <span className="ProductDetailsPage__info-value">
                    {productDetails.processor}
                  </span>
                </div>
                <div className="ProductDetailsPage__info">
                  <span className="ProductDetailsPage__info-name">
                    Resolution
                  </span>
                  <span className="ProductDetailsPage__info-value">
                    {productDetails.resolution}
                  </span>
                </div>
                <div className="ProductDetailsPage__info">
                  <span className="ProductDetailsPage__info-name">
                    RAM
                  </span>
                  <span className="ProductDetailsPage__info-value">
                    {productDetails.ram}
                  </span>
                </div>
              </div>
            </div>

            <div className="ProductDetailsPage__top-right">
              <span
                className="ProductDetailsPage__id-name"
              >
                {`ID: ${itemId}`}
              </span>
            </div>

            <div
              style={{
                gridColumn: 'span 24',
                height: '80px',
              }}
            />

            <div className="ProductDetailsPage__about">
              <h2 className="ProductDetailsPage__subtitle">
                About
              </h2>

              <div className="ProductDetailsPage__deviding-line" />

              <AboutProduct description={productDetails.description} />
            </div>

            <div className="ProductDetailsPage__tech-specs">
              <h2 className="ProductDetailsPage__subtitle">
                Tech specs
              </h2>

              <div className="ProductDetailsPage__deviding-line" />

              <TechSpecs
                screen={productDetails.screen}
                resolution={productDetails.resolution}
                processor={productDetails.processor}
                ram={productDetails.ram}
                camera={productDetails.camera}
                zoom={productDetails.zoom}
                cell={productDetails.cell}
              />
            </div>
          </div>

          <ProductsSlider
            products={mayAlsoLikeList}
            title="You may also like"
          />
        </>
      )}
    </>
  );
};
