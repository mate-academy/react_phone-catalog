import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '@/types/Product';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Loader } from '../shared/components/Loader';
import styles from './ProductDetailsPage.module.scss';

const CATEGORY_LABELS: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProduct(null);

    const controller = new AbortController();

    fetch('/api/products.json', { signal: controller.signal })
      .then(res => res.json())
      .then((data: Product[]) => {
        const foundProduct = data.find(p => p.itemId === productId);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError('Something went wrong');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: categoryLabel, path: `/${product.category}` },
          { label: product.name },
        ]}
      />

      <h1 className={styles.title}>{product.name}</h1>

      <img
        className={styles.image}
        src={`/${product.image}`}
        alt={product.name}
      />
    </div>
  );
};
