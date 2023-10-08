import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import {
  getProductDetails,
  getProductById,
  getSuggestedProducts,
} from '../../helpers/FetchProducts';
import { BackButton } from '../BackButton/BackButton';
import { ProductCapacity } from '../ProductCapacity/ProductCapacity';
import { ButtonCart } from '../ButtonCart/ButtonCart';
import { ButtonFav } from '../ButtonFav/ButtonFav';
import { ProductSection } from '../../types/ProductSection';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import { ProductColor } from '../ProductColor/ProductColor';
import { ProductPhoto } from '../ProductPhotos/ProductPhotos';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ProductsSlider } from '../ProductSlider/ProductSlider';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const { pathname } = location;
  const productAdress = pathname.split('/').filter(item => item !== '');
  const productId = productAdress[productAdress.length - 1];

  const [product, setProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails]
    = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [mainPhoto, setMainPhoto] = useState<string>();

  const fetchProduct = async () => {
    const productFromServer = await getProductById(productId);

    setProduct(productFromServer);
  };

  const fetchProductDetails = async () => {
    setIsLoading(true);

    try {
      const getDetailsFromServer = await getProductDetails(productId);

      setProductDetails(getDetailsFromServer);
      setMainPhoto(productDetails?.images[0]);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRandomProducts = async () => {
    setIsLoading(true);
    try {
      const getRandomProductsFromServer: Product[]
        = await getSuggestedProducts();

      setProducts(getRandomProductsFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  useEffect(() => {
    if (productDetails?.images.length) {
      setMainPhoto(productDetails.images[0]);
    }
  }, [productDetails]);

  const colors = productDetails?.colorsAvailable || [];
  const currentColor = productDetails?.color || '';
  const images = productDetails?.images || [];
  const mainImg = mainPhoto || '';
  const capacitys = productDetails?.capacityAvailable || [];

  // console.log(isError, qqqq);
  // console.log(isLoading, www);

  const handleChangePhoto = (photo: string) => {
    setMainPhoto(photo);
  };

  // console.log('productId:', productId);

  return (
    <section className="product-details">
      <div
        className="product-details__navigation"
        data-cy="breadCrumbs"
      >
        <Breadcrumbs />
      </div>
      <div className="product-details__back-button">
        <BackButton />
      </div>
      <h1 className="product-details__title">
        {productDetails?.name}
      </h1>
      {!isLoading && !isError && (
        <div className="product-details__presentation">
          <ProductPhoto
            photos={images}
            mainPhoto={mainImg}
            handleChangePhoto={handleChangePhoto}
          />

          <div className="product-details__main-info">
            <div className="product-details__colors">
              {productDetails && (
                <ProductColor
                  colors={colors}
                  currentColor={currentColor}
                  productDetails={productDetails}
                />
              )}
            </div>
            <div className="product-details__capacity">
              {productDetails && (
                <ProductCapacity
                  capacitys={capacitys}
                  productDetails={productDetails}
                />
              )}
            </div>
            <div className="product-details__price">
              <h1 className="product-details__current-price">
                {`${productDetails?.priceDiscount}`}
              </h1>
              <div className="product-details__full-price">
                {`${productDetails?.priceRegular}`}
              </div>
            </div>

            <div className="product-details__action">
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
                <div className="product-details__info-title">Resolution</div>
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
      )}
      <div className="product-details__info-additional">
        {productDetails && (
          <ProductInfo
            details={productDetails}
          />
        )}
      </div>

      <ProductsSlider
        title={ProductSection.RandomProducts}
        products={products}
      />
    </section>
  );
};
