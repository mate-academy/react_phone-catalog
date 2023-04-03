import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { Loader } from '../../components/Loader';
import { ModalWindow } from '../../components/ModalWindow';
import { PagePath } from '../../components/PagePath';
import { ThumbsGallery } from '../../components/ThumbsGallery';
import { getProductDetails } from '../../helpers/fetchData';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductDetailsInfo } from '../../components/ProductDetailsInfo';

import './ProductDetailsPage.scss';
import './About.scss';
import './TechSpecs.scss';
import { CatalogProduct } from '../../types/CatalogProduct';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getSuggestedProducts } from '../../helpers/pagesMethods';
import { MobileSwiper } from '../../components/MobileSwiper';

export const ProductDetailsPage: FC = () => {
  const { productId = '' } = useParams();
  const location = useLocation();

  const path = location.pathname;
  const category = path.slice(1, path.indexOf(productId) - 1);

  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentProduct, setCurrentProduct]
    = useState<ProductDetails | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestedItems, setSuggestedItems] = useState<CatalogProduct[]>([]);
  const [isError, setIsError] = useState(false);

  const handleLoading = async () => {
    try {
      setIsLoading(true);

      const product = await getProductDetails(productId);

      setCurrentProduct(product);

      const suggested = await getSuggestedProducts(
        product.screen,
        product.currentCapacity,
        productId,
      );

      setSuggestedItems(suggested);
      setIsInitialized(true);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const handleOpenModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      document.body.style.overflowY = 'hidden';
    }
  };

  const handleModalClose = () => {
    document.body.style.overflowY = 'unset';
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleLoading();
  }, [productId]);

  return (
    <div
      className="
        main__products-page
        main__products-page--width
        products-page
      "
    >
      {isError && (
        <>
          <h1
            className="
            products-page__title
            page-title
            products-page__title--product
            products-page__title--not-found
          "
          >
            Phone was not found
          </h1>

          <div
            className="
            no-results__image-container
            no-results__wasnt-found
            "
          >
            <img
              src="/new/img/Wasnt_found.jpg"
              alt="Wasn't found"
              className="no-results__image"
            />
          </div>
        </>
      )}

      {isLoading && !isError && <Loader />}

      {isInitialized && !isLoading && !isError && currentProduct && (
        <>
          <PagePath
            url={`/${category}`}
            title={category}
            productName={currentProduct.name}
          />

          <BackButton />

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
                <ThumbsGallery
                  picturesUrl={currentProduct.images}
                  onOpenModal={handleOpenModal}
                />

                <ModalWindow
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                >
                  <ThumbsGallery picturesUrl={currentProduct.images} />
                </ModalWindow>
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
              <div className="product-details__about about">
                <h2 className="about__description-title description-title">
                  About
                </h2>

                <div className="about__description-text">
                  {currentProduct.description.map(section => (
                    <div className="about__container" key={section.title}>
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
            products={suggestedItems}
          />

          <MobileSwiper
            title="You may also like"
            products={suggestedItems}
          />
        </>
      )}
    </div>
  );
};
