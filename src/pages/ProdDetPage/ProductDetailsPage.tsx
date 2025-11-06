import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductFull } from '../../types/Product_full';
import { client } from '../../api/httpClient';
import { ProductInfo } from './components/ProductInfo/ProductInfo';
import { SliderSection } from '../shared/SliderSection/SliderSection';
import { ProductContext } from '../../store/ProductContext';
import { shuffleArray } from '../../helpers/shuffleProducts';
import { ErrorContext } from '../../store/ErrorContext';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../shared/Breadcrumbs/Breadcrumbs';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { category, productId } = useParams();
  const { products } = useContext(ProductContext);
  const { isLoading, errorMessage, setIsLoading, setErrorMessage } =
    useContext(ErrorContext);

  const [product, setProduct] = useState<ProductFull | undefined>(undefined);

  const suggestedProducts = shuffleArray(products);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    client
      .getProductById(productId || '', category || '')
      .then(setProduct)
      .catch(() => setErrorMessage('Unable to load product details'))
      .finally(() => setIsLoading(false));
  }, [productId, category]);

  return (
    <div className={styles.productDetailsPage}>
      <div className="container">
        <div className={styles.productDetailsPage__breadcrumbs}>
          <Breadcrumbs endpoint={product?.name} category={category || ''} />
        </div>
        <button
          onClick={() => navigate(-1)}
          className={styles.productDetailsPage__backButton}
        >
          Back
        </button>
        <article className={styles.productDetailsPage__article}>
          {isLoading && <Loader />}
          {!isLoading && errorMessage && (
            <div className="error">
              <p className="errorMessage">{errorMessage}</p>
              <button
                className="errorButton"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}
          {!isLoading && !errorMessage && !product && (
            <>
              <p className="errorMessage">Product not found</p>
              <img
                src="img/product-not-found.png"
                alt="product not found image"
                width="100%"
                className="errorImage"
              />
            </>
          )}
          {!isLoading && !errorMessage && product && (
            <ProductInfo product={product} />
          )}
        </article>
        <section className={styles.productDetailsPage__slider}>
          <SliderSection
            title="You may also like"
            products={suggestedProducts}
          />
        </section>
      </div>
    </div>
  );
};
