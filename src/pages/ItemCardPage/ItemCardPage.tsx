import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../utils/fetchData';
import { getSuggestProducts } from '../../helpers/pagesMethods';
import { CatalogProduct } from '../../types/CatalogProduct';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductSlider/ProductSlider';
import { MobileSwiper } from '../../components/MobileSwiper/MobileSwiper';
import { PagePath } from '../../components/PagePath/PagePath';
import {
  ProductDetailsInfo,
} from '../../components/ProductDetailsInfo/ProductDetailsInfo';
import {
  ProductImagesSlider,
} from '../../components/ProductImagesSlider/ProductImagesSlider';

import './ItemCardPage.scss';

export const ItemCardPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [suggestItems, setSuggestItems] = useState<CatalogProduct[]>([]);
  const [currentProduct, setCurrentProduct]
    = useState<ProductDetails | null>(null);

  const { productId = '' } = useParams();
  const location = useLocation();

  const path = location.pathname;
  const category = path.slice(1, path.indexOf(productId) - 1);

  const handleLoading = async () => {
    try {
      setIsLoading(true);

      const product = await getProductDetails(productId);

      setCurrentProduct(product);

      const suggest = await getSuggestProducts(
        product.screen,
        product.capacity,
        productId,
      );

      setIsInitialized(true);
      setIsLoading(false);
      setSuggestItems(suggest);
    } catch (error) {
      setIsError(true);
    }
  };

  const navigate = useNavigate();

  const handeBackNavigateClick = () => {
    navigate(-1);
  };

  const handleKeyBack = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handeBackNavigateClick();
    }
  };

  useEffect(() => {
    handleLoading();
  }, [productId]);

  return (
    <div className="
      main__products-page
      main__products-page--width
      products-page"
    >
      {isLoading && !isError && <Loader />}

      {isError && (
        <>
          <h1
            className="
              products-page__title
              page-title
              products-page__title--product
              products-page__title--not-found"
          >
            Phone was not found
          </h1>

          <div
            className="
              no-results__image-container
              no-results__wasnt-found"
          >
            <img
              src="img/isError.jpg"
              alt="Wasn't found"
              className="no-results__image"
            />
          </div>
        </>
      )}

      {isInitialized && !isLoading && !isError && currentProduct && (
        <>
          <PagePath
            url={`/${category}`}
            title={category}
            productName={currentProduct.name}
          />

          <div className="products-page__back-button back-button">
            <div className="back-button__arrow" />

            <div
              onClick={handeBackNavigateClick}
              className="back-button__button"
              role="button"
              tabIndex={0}
              aria-label="back-button"
              onKeyDown={handleKeyBack}
              data-cy="backButton"
            >
              Back
            </div>
          </div>

          <h1
            className="
            products-page__title
            page-title
            products-page__title--product
          "
          >
            {currentProduct.name}
          </h1>

          <div className="product-details product-details__container">
            <div className="product-details__options">
              <div
                className="interactive-gallery"
              >
                <ProductImagesSlider images={currentProduct.images} />
              </div>

              <div className="product-details__info-block">
                <ProductDetailsInfo
                  id={currentProduct.id}
                  colors={currentProduct.colorsAvailable}
                  currentColor={currentProduct.color}
                  priceDiscount={currentProduct.priceDiscount}
                  priceRegular={currentProduct.priceRegular}
                  screen={currentProduct.screen}
                  resolution={currentProduct.resolution}
                  processor={currentProduct.processor}
                  ram={currentProduct.ram}
                  capacities={currentProduct.capacityAvailable}
                  currentCapacity={currentProduct.capacity}
                  category={category}
                  nameId={currentProduct.namespaceId}
                  images={currentProduct.images}
                  name={currentProduct.name}
                />
              </div>

              <div className="product-details__id">
                {`ID: ${currentProduct.namespaceId}`}
              </div>
            </div>

            <div className="product-details__description">
              <div
                className="product-details__about about"
                data-cy="productDescription"
              >
                <h2 className="about__description-title description-title">
                  About
                </h2>

                <div className="about__description-text">
                  {currentProduct.description.map(section => (
                    <div
                      className="about__container"
                      key={section.title}
                      data-cy="breadCrumbs"
                    >
                      <p className="about__section-title">
                        {section.title}
                      </p>

                      <p className="about__section-text">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-details__tech-specs tech-specs">
                <h2
                  className="
                  tech-specs__description-title
                  description-title
                "
                >
                  Tech specs
                </h2>

                <div className="tech-specs__description-specs specs">
                  <div className="specs__info-spec">
                    <p className="specs__info-title">
                      Screen
                    </p>

                    <div className="specs__info-value">
                      {currentProduct.screen}
                    </div>
                  </div>

                  <div className="specs__info-spec">
                    <p className="specs__info-title">
                      Resolution
                    </p>

                    <div className="specs__info-value">
                      {currentProduct.resolution}
                    </div>
                  </div>

                  <div className="specs__info-spec">
                    <p className="specs__info-title">
                      Processor
                    </p>

                    <div className="specs__info-value">
                      {currentProduct.processor}
                    </div>
                  </div>

                  <div className="specs__info-spec">
                    <p className="specs__info-title">
                      RAM
                    </p>

                    <div className="specs__info-value">
                      {currentProduct.ram}
                    </div>
                  </div>

                  <div className="specs__info-spec">
                    <p className="specs__info-title">
                      Built in memory
                    </p>

                    <div className="specs__info-value">
                      {currentProduct.capacity}
                    </div>
                  </div>

                  <div className="specs__info-spec">
                    <p className="specs__info-title">
                      Camera
                    </p>

                    <div className="specs__info-value">
                      {currentProduct.camera}
                    </div>
                  </div>

                  <div className="specs__info-spec">
                    <p className="specs__info-title">
                      Zoom
                    </p>

                    <div className="specs__info-value">
                      {currentProduct.zoom}
                    </div>
                  </div>

                  <div className="specs__info-spec">
                    <p className="specs__info-title">
                      Cell
                    </p>

                    <div className="specs__info-value">
                      {currentProduct.cell.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductsSlider
            title="You may also like"
            products={suggestItems}
          />

          <MobileSwiper
            title="You may also like"
            products={suggestItems}
          />
        </>
      )}
    </div>
  );
};
