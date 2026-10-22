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
  // ProductImages,
} from '../../components/Loaders/ProductDetailsSkeleton';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<DetailedProductWithNumericId>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);

      return;
    }

    getProductById(productId)
      .then(setProduct)
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 500),
      );
  }, [productId]);

  if (!product) {
    return <p>Product was not found.</p>;
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
