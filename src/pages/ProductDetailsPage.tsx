import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { NoResults } from '../components/additional/NoResults';
import { Product } from '../types/Product';
import { Loader } from '../components/additional/Loader';
import { getProductDetails, getProducts } from '../helpers/api';
import { Slider } from '../components/Products/ProductsSlider';
import { ProductDetails } from '../components/ProductDeteils/ProductDetails';
import { Errors } from '../types/Errors';
import { NotFoundPage } from './NotFoundPage';
import { BackButton } from '../components/additional/BackButton';
import { Breadcrumbs } from '../components/additional/Breadcrumbs';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();

  const [productDeteils, setProductDeteils] = useState<Product>();
  const [productBasicDetails, setProductBasicDetails] = useState<Product>();
  const [productsRandom, setProductsRandom] = useState<Product[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWrongLink, setIsWrongLink] = useState(false);

  const getProduct = useCallback(async () => {
    setIsLoad(true);
    setIsError(false);

    try {
      const allProducts = await getProducts();
      const basicDetails = allProducts.find(prod => prod.id === productId);

      if (!basicDetails) {
        setIsWrongLink(true);
      } else {
        setIsWrongLink(false);
      }

      const product = await getProductDetails(productId);
      const randomArray = [...allProducts].sort(() => 0.5 - Math.random());

      setProductDeteils(product);
      setProductBasicDetails(basicDetails);
      setProductsRandom(randomArray);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  }, [productId, location]);

  useEffect(() => {
    getProduct();
  }, [productId, location]);

  return (
    <>
      {isWrongLink
        ? (<NotFoundPage />)
        : (
          <main className="main">

            <Breadcrumbs />

            <div className="page-heading">
              <BackButton />
              <h1>{productDeteils?.name}</h1>
            </div>

            {isLoad && (<Loader />)}

            {isError && (
              <NoResults text={Errors.FETCH} isShowButton={false} />)}

            {!isLoad && !isError && productBasicDetails && productDeteils && (
              <ProductDetails
                productDetails={productDeteils}
                productBasic={productBasicDetails}
              />
            )}

            {!isLoad && !isError && (
              <>
                <Slider
                  products={productsRandom}
                  title="You may also like"
                />
                {productsRandom.length === 0 && (
                  <NoResults text="No suggested product" isShowButton={false} />
                )}
              </>
            )}

          </main>
        )}
    </>
  );
};
