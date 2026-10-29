import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductGallery } from '../../components/ProductGallery';
import { ProductInfo } from '../../components/ProductInfo';
import { ProductOptions } from '../../components/ProductOptions';
import { ProductsSlider } from '../../components/ProductsSlider';
import type { Product } from '../../types/Product';
import type { ProductDetails } from '../../types/ProductDetails';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import styles from './ProductPage.module.scss';

export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [listItem, setListItem] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [suggested, setSuggested] = useState<Product[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setHasError(false);
      setProduct(null);
      setListItem(null);

      try {
        const productsResponse = await fetch('api/products.json');
        const products: Product[] = await productsResponse.json();
        const found = products.find(item => item.itemId === productId);

        if (found) {
          setListItem(found);
          const detailsResponse = await fetch(`api/${found.category}.json`);
          const details: ProductDetails[] = await detailsResponse.json();

          setProduct(details.find(item => item.id === productId) || null);
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  useEffect(() => {
    if (!product) {
      return;
    }

    getSuggestedProducts(product.category, product.id)
      .then(setSuggested)
      .catch(() => setSuggested([]));
  }, [product]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.page}>
        <div className={styles.message}>
          <p>Something went wrong</p>

          <button
            type="button"
            className={styles.reload}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (!product || !listItem) {
    return (
      <div className={styles.page}>
        <BackButton />

        <p className={styles.message}>Product was not found</p>
      </div>
    );
  }

  const categoryTitle =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className={styles.page}>
      <Breadcrumbs
        crumbs={[
          { label: categoryTitle, to: `/${product.category}` },
          { label: product.name },
        ]}
      />

      <BackButton />

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <ProductGallery
            key={product.id}
            images={product.images}
            alt={product.name}
          />
        </div>

        <div className={styles.options}>
          <ProductOptions product={product} listItem={listItem} />
        </div>
      </div>

      <ProductInfo product={product} />

      <ProductsSlider title="You may also like" products={suggested} />
    </div>
  );
};
