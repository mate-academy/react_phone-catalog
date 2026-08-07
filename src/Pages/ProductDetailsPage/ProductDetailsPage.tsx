// ProductDetailsPage.tsx

import { BackBtn } from '../../components/BackBtn';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductOverview } from './components/ProductOverview/ProductOverview';
import styles from './ProductDetailsPage.module.scss';
import type { ProductDetails } from '../../types/ProductDetails';
import type { Product } from '../../types/Product';
import { useState, useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { getProductId } from '../../services/getProductId';
import { ErrorItem } from '../../components/ErrorItem';
import { YouMayAlsoLike } from './components/YouMayAlsoLike/YouMayAlsoLike';

interface ProductDetailsPageProps {
  category?: string;
  title?: string;
  likeProducts: Product[];
}

export const ProductDetailsPage = ({
  category: categoryFromProps,
  likeProducts,
}: ProductDetailsPageProps) => {
  // 1. Отримуємо category та productId з URL-параметрів
  const { category: categoryFromParams, productId } = useParams<{
    category?: string;
    productId: string;
  }>();

  // 2. Якщо пропс не передали, беремо категорію з URL (або за замовчуванням 'phones')
  const category = categoryFromProps || categoryFromParams || 'phones';

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      setIsError(true);

      return;
    }

    setIsLoading(true);
    setIsError(false);

    getProductId(productId)
      .then(item => {
        setProduct(item);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product) {
    return <ErrorItem message="Product was not found" />;
  }

  return (
    <section className={styles.productDetailsPage}>
      <div className="productDetailsPage__container">
        <Breadcrumbs category={category} productName={product?.name} />
        <BackBtn className={styles.backBtnMargin} />
        <ProductOverview product={product} category={category} />
        <YouMayAlsoLike likeProducts={likeProducts} />
      </div>
    </section>
  );
};
