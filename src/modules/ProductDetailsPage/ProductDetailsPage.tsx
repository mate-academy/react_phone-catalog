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
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
      <ProductImages key={product.id} product={product} />
      <ProductOpitions product={product} />
      <ProductAbout product={product} />
      <ProductTechSpecs product={product} />
      <ProductsSlider
        title="You may also like"
        category={product.category}
        excludeId={product.id}
        sortBy="random"
      />
    </section>
  );
};
