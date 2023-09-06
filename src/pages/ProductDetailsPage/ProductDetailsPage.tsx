import './ProductDetailsPage.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductDetails } from '../../types/ProductDetails';
import {
  getProductById,
  getProductDetails,
  getSuggestedProducts,
} from '../../helpers/FetchProducts';
import { BackButton } from '../../components/BackButton/BackButton';
import { ProductColor } from '../../components/ProductColor/ProductColor';
import { ProductPhotos } from '../../components/ProductPhotos/ProductPhotos';
import {
  ProductCapacity,
} from '../../components/ProductCapacity/ProductCapacity';
import { ProductInfo } from '../../components/ProductInfo/ProductInfo';
import { ButtonCart } from '../../components/ButtonCart/ButtonCart';
import { ButtonFav } from '../../components/ButtonFav/ButtonFav';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ProductSection } from '../../types/ProductSection';
import { Loader } from '../../components/Loader';
import { PageNotFound } from '../PageNotFound/PageNotFound';

export const ProductDetailsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails]
    = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mainPhoto, setMainPhoto] = useState<string>();
  const [product, setProduct] = useState<Product>();
  const { productId = '' } = useParams();

  const fetchProductDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const getDetailsFromServer = await getProductDetails(id);

      setProductDetails(getDetailsFromServer);
      setMainPhoto(getDetailsFromServer?.images[0]);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProduct = async () => {
    const productFromServer = await getProductById(productId);

    setProduct(productFromServer);
  };

  const fetchRandomProducts = async () => {
    setIsLoading(true);
    try {
      const randomProductsFromServer: Product[] = await getSuggestedProducts();

      setProducts(randomProductsFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails(productId);
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  const images = productDetails?.images || [];
  const mainImg = mainPhoto || '';

  const handlePhotoClick = (photo: string) => {
    setMainPhoto(photo);
  };

  return (
    <section className="product-details">
      <div
        data-cy="breadCrumbs"
        className="product-details__nav"
      >
        <Breadcrumbs />
      </div>

      <div className="product-details__back-btn">
        <BackButton />
      </div>

      {!product && <PageNotFound />}

      {!isError && isLoading && <Loader />}
      {!isError && !isLoading && (
        <div className="product-details__content">
          <h1 className="product-details__title">
            {productDetails?.name}
          </h1>
          <div className="product-details__presentation">
            <ProductPhotos
              photos={images}
              mainPhoto={mainImg}
              handlePhotoClick={handlePhotoClick}
            />
            <div className="product-details__main-info">
              <div className="product-details__colors">
                {productDetails && (
                  <ProductColor
                    productDetails={productDetails}
                  />
                )}
              </div>

              <div className="product-details__capacitys">
                {productDetails && (
                  <ProductCapacity
                    productDetails={productDetails}
                  />
                )}
              </div>

              <div className="product-details__price">
                <h1 className="product-details__current-price">
                  {`$${productDetails?.priceDiscount}`}
                </h1>
                <div className="product-details__full-price">
                  {`$${productDetails?.priceRegular}`}
                </div>
              </div>

              <div className="product-details__actions">
                <div className="product-details__button">
                  {product && (
                    <ButtonCart
                      product={product}
                    />
                  )}
                </div>
                <div className="product-details__fav">
                  {product && (
                    <ButtonFav
                      product={product}
                    />
                  )}

                </div>
              </div>

              <ul className="product-details__info">
                <li className="product-details__info-item">
                  <div className="product-details__info-title">Screen</div>
                  <div className="product-details__info-value">
                    {productDetails?.screen}
                  </div>
                </li>
                <li className="product-details__info-item">
                  <div
                    className="product-details__info-title"
                  >
                    Resolution
                  </div>
                  <div className="product-details__info-value">
                    {productDetails?.resolution}
                  </div>
                </li>
                <li className="product-details__info-item">
                  <div className="product-details__info-title">Processor</div>
                  <div className="product-details__info-value">
                    {productDetails?.processor}
                  </div>
                </li>
                <li className="product-details__info-item">
                  <div className="product-details__info-title">RAM</div>
                  <div className="product-details__info-value">
                    {productDetails?.ram}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="product-details__additional-info">
            {productDetails && (
              <ProductInfo
                details={productDetails}
              />
            )}
          </div>

          <div className="product-details__offer">
            <ProductsSlider
              title={ProductSection.RandomProducts}
              products={products}
            />
          </div>
        </div>
      )}
    </section>
  );
};
