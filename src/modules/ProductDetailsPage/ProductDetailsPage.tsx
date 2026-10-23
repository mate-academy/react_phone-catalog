import styles from './ProductDetailsPage.module.scss';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getProductById,
  type DetailedProductWithNumericId,
} from '../../api/productDetails';
import { IconTrail } from '../../components/IconTrail/IconTrail';

import {
  ProductAbout,
  ProductImages,
  ProductOpitions,
} from '../../components/Details';
import { ProductTechSpecs } from '../../components/Details/ProductTechSpecs';
import { ProductsSlider } from '../../components/ProductsSlider';

import {
  ProductAboutSkeleton,
  ProductImagesSkeleton,
  ProductOptionsSkeleton,
  ProductTechSpecsSkeleton,
} from '../../components/Loaders/ProductDetailsSkeleton';

import { ErrorPage } from '../ErrorPage';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<DetailedProductWithNumericId>();
  const [isLoading, setIsLoading] = useState(true);

  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    if (!productId) {
      setIsLoading(false);
      setHasError(true);

      return;
    }

    getProductById(productId)
      .then(setProduct)
      .catch(() => setHasError(true))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 500),
      );
  }, [productId]);

  if (hasError || (!isLoading && !product)) {
    return <ErrorPage title="Product was not found." />;
  }

  if (!product) {
    return null;
  }

  return (
    <section className={styles.details}>
      <IconTrail name={product.category} choseProduct={product.name} />
      <div className={styles.details__backTrail}>
        <img
          onClick={() => {
            navigate(-1);
          }}
          src="./icons/ChevronArrowLeft.svg"
          alt="Go back"
        />
        <a
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </a>
      </div>
      <div className={styles.details__name}>
        <p>{product.name}</p>
      </div>

      {isLoading ? (
        <ProductImagesSkeleton />
      ) : (
        product && <ProductImages key={product.id} product={product} />
      )}

      {isLoading ? (
        <ProductOptionsSkeleton />
      ) : (
        product && <ProductOpitions product={product} />
      )}

      {isLoading ? (
        <ProductAboutSkeleton />
      ) : (
        product && <ProductAbout product={product} />
      )}

      {isLoading ? (
        <ProductTechSpecsSkeleton />
      ) : (
        product && <ProductTechSpecs product={product} />
      )}

      <ProductsSlider
        title="You may also like"
        category={product.category}
        excludeId={product.id}
        sortBy="random"
      />
    </section>
  );
};
