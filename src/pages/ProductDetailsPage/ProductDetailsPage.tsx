import './ProductDetailsPage.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import {
  getProductDetails,
  getProductsById,
  getSuggestedProducts,
} from '../../helpers/fetchProducts';
import { ProductTitles } from '../../types/ProductTitles';

import { HistoryLocation } from '../../components/HistoryLocation';
import { Loader } from '../../components/Loader';
import { ButtonCart } from '../../components/Button/ButtonCart';
import { ButtonFavorites } from '../../components/Button/ButtonFavorites';
import { ProductSlider } from '../../components/Product/Slider';
import { Galery } from '../../components/Product/Galery';
import { ColorChoose } from '../../components/Product/ColorChoose';
import { Capacity } from '../../components/Product/Capacity';
import { Description } from '../../components/Product/Description/Description';
import { PageNotFound } from '../PageNotFound/PageNotFound';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const { pathname } = location;

  const productPath = pathname.split('/').filter(part => part !== '');
  const productId = productPath[productPath.length - 1];

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mainPhoto, setMainPhoto] = useState<string>();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [productDetails, setProductDetails]
    = useState<ProductDetails | null>(null);

  const fetchProductDetails = async () => {
    setIsLoading(true);

    try {
      const getDetailsFromServer = await getProductDetails(productId);

      setProductDetails(getDetailsFromServer);
      setMainPhoto(productDetails?.images[0]);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    const productFromServer = await getProductsById(productId);

    setCurrentProduct(productFromServer);
  };

  const fetchSuggestedProducts = async () => {
    setIsLoading(true);

    try {
      const suggestedProductsFromServer: Product[]
        = await getSuggestedProducts();

      setProducts(suggestedProductsFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productDetails?.images.length) {
      setMainPhoto(productDetails.images[0]);
    }
  }, [productDetails]);

  useEffect(() => {
    fetchProductDetails();
    fetchProducts();
  }, [productId]);

  useEffect(() => {
    fetchSuggestedProducts();
  }, []);

  const colors = productDetails?.colorsAvailable || [];
  const currentColor = productDetails?.color || '';
  const images = productDetails?.images || [];
  const mainImg = mainPhoto || '';
  const capacities = productDetails?.capacityAvailable || [];

  const handlePhotoChosen = (photo: string) => {
    setMainPhoto(photo);
  };

  return (
    <section className="product-details container">
      <HistoryLocation />

      {!currentProduct && <PageNotFound />}

      {!isError && isLoading && <Loader />}

      {!isError && !isLoading && currentProduct && (
        <>
          <h1 className="product-details--title">
            {productDetails?.name}
          </h1>

          <div className="product-details__top-content">
            <div className="product-details--galery">
              <Galery
                photos={images}
                mainPhoto={mainImg}
                photoClick={handlePhotoChosen}
              />
            </div>

            <div className="product-details__virables">

              <div className="product-details__choose">
                <div className="product-details--colors">
                  <ColorChoose
                    colors={colors}
                    currentColor={currentColor}
                    productDetails={productDetails}
                  />
                </div>

                <div className="product-detais--capacity">
                  <Capacity
                    capacities={capacities}
                    productDetails={productDetails}
                  />
                </div>

                <div className="product-details__price">
                  {productDetails?.priceDiscount
                    === productDetails?.priceRegular
                    ? (
                      <h1 className="
                        product-card__price-regular
                        product-details__price-regular"
                      >
                        {`$${productDetails?.priceRegular}`}
                      </h1>
                    ) : (
                      <>
                        <h1 className="
                          product-card__price-regular
                          product-details__price-regular"
                        >
                          {`$${productDetails?.priceDiscount}`}
                        </h1>

                        <h2 className="
                          product-card__price-discount
                          product-details__price-discount"
                        >
                          {`$${productDetails?.priceRegular}`}
                        </h2>
                      </>
                    )}
                </div>
              </div>
              <div className="product-details__actions">

                <div className="product-details__actions--cart">
                  <ButtonCart product={currentProduct} />
                </div>
                <div className="product-details__actions--favorites">
                  <ButtonFavorites product={currentProduct} />
                </div>
              </div>

              <ul className="product-details__info">
                <li className="product-details__info--item">
                  <div className="product-details__info--item-title">
                    Screen
                  </div>
                  <div className="product-details__info--item-value">
                    {productDetails?.screen}
                  </div>
                </li>
                <li className="product-details__info--item">
                  <div className="product-details__info--item-title">
                    Resolution
                  </div>
                  <div className="product-details__info--item-value">
                    {productDetails?.resolution}
                  </div>
                </li>
                <li className="product-details__info--item">
                  <div className="product-details__info--item-title">
                    Processor
                  </div>
                  <div className="product-details__info--item-value">
                    {productDetails?.processor}
                  </div>
                </li>
                <li className="product-details__info--item">
                  <div className="product-details__info--item-title">
                    RAM
                  </div>
                  <div className="product-details__info--item-value">
                    {productDetails?.ram}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="product-details__about">
            {productDetails && (
              <Description details={productDetails} />
            )}
          </div>

          <ProductSlider
            title={ProductTitles.RandomProducts}
            products={products}
          />
        </>
      )}
    </section>
  );
};
