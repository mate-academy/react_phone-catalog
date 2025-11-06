import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './test.module.scss';
import { ErrorContext } from './store/ErrorContext';
import { ProductContext } from './store/ProductContext';
import { shuffleArray } from './helpers/shuffleProducts';
import { ProductFull } from './types/Product_full';
import { client } from './api/httpClient';
import { Breadcrumbs } from './pages/shared/Breadcrumbs/Breadcrumbs';
import { Loader } from './components/Loader';
import { ProductInfo } from './pages/ProdDetPage/components/ProductInfo/ProductInfo';
import { SliderSection } from './pages/shared/SliderSection/SliderSection';

export const TestPage = () => {
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
      <div className="newContainer">
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
                src="/public/img/product-not-found.png"
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

        <section>
          <SliderSection
            title="You may also like"
            products={suggestedProducts}
          />
        </section>
      </div>
    </div>
  );
};
