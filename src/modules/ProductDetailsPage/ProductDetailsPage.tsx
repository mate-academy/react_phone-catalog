import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '@/types/Product';
import type { ProductDetail } from '@/types/ProductDetail';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Loader } from '../shared/components/Loader';
import { ImageSlider } from './components/ImageSlider';
import chevronIcon from '@/assets/icons/icon-chevron.svg';
import styles from './ProductDetailsPage.module.scss';

const CATEGORY_LABELS: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProduct(null);
    setDetail(null);

    const controller = new AbortController();

    fetch('/api/products.json', { signal: controller.signal })
      .then(res => res.json())
      .then((data: Product[]) => {
        const foundProduct = data.find(p => p.itemId === productId);

        if (!foundProduct) {
          setError('Product not found');

          return;
        }

        setProduct(foundProduct);

        return fetch(`/api/${foundProduct.category}.json`, {
          signal: controller.signal,
        });
      })
      .then(res => res?.json())
      .then((data: ProductDetail[] | undefined) => {
        if (!data) {
          return;
        }

        const foundDetail = data.find(d => d.id === productId);

        if (foundDetail) {
          setDetail(foundDetail);
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

      <button className={styles.back} onClick={() => navigate(-1)}>
        <img
          src={chevronIcon}
          alt=""
          aria-hidden="true"
          className={styles.backChevron}
        />
        <span className={styles.backText}>Back</span>
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.contentGrid}>
        <div className={styles.imageSection}>
          {detail && <ImageSlider images={detail.images} alt={product.name} />}
        </div>
        <div className={styles.details} />
      </div>
    </div>
  );
};
