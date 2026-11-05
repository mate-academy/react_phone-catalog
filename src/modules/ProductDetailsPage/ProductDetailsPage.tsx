import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails, getSuggestedProducts } from '../../api/products';
import { NavPath } from '../shared/components/NavPath';
import { ProductGallery } from './components/ProductGallery';
import { ProductOptions } from './components/ProductOptions';
import { ProductAbout } from './components/ProductAbout';
import { ProductTechSpecs } from './components/ProductTechSpecs';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Product } from '../../types/Product';
import { Loader } from '../shared/components/Loader';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getSuggestedProducts().then(setSuggestedProducts);
  }, []);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    getProductDetails(productId)
      .then(data => {
        setProductDetails(data?.details);
        setProduct(data?.product);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading && !productDetails) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className={styles.productDetailsError}>
        <h1 className={styles.productDetailsErrorTitle}>
          Something went wrong
        </h1>

        <p className={styles.productDetailsErrorText}>
          We couldn&apos;t load this product. Please try again.
        </p>

        <button
          type="button"
          className={styles.productDetailsErrorButton}
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }

  if (!productDetails || !product) {
    return (
      <div className={styles.productDetailsNotFound}>
        <img
          src="img/product-not-found.png"
          alt=""
          className={styles.productDetailsNotFoundImage}
        />

        <h1 className={styles.productDetailsNotFoundTitle}>
          Product was not found
        </h1>
      </div>
    );
  }

  const category = productDetails.category;
  const categoryLabel = category[0].toUpperCase() + category.slice(1);

  return (
    <div className={styles.productDetails}>
      <NavPath
        items={[
          { label: categoryLabel, to: `/${category}` },
          { label: productDetails.name },
        ]}
      />

      <button
        type="button"
        className={styles.productDetailsBack}
        onClick={() => navigate(`/${category}`)}
      >
        <span aria-hidden="true" className={styles.productDetailsBackImage} />
        <span className={styles.productDetailsBackText}>Back</span>
      </button>

      <h1 className={styles.productDetailsTitle}>{productDetails.name}</h1>

      <div className={styles.productDetailsTop}>
        <ProductGallery
          images={productDetails.images}
          name={productDetails.name}
          key={productDetails.id}
        />

        <ProductOptions productDetails={productDetails} product={product} />
      </div>

      <div className={styles.productDetailsBottom}>
        <ProductAbout descriptions={productDetails.description} />

        <ProductTechSpecs product={productDetails} />
      </div>

      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </div>
  );
};
