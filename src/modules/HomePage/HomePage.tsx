import { useEffect, useMemo, useState } from 'react';
import { getCatalogProducts } from '../../api/productsApi';
import { Product } from '../../api/types';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { getImageUrl } from '../../shared/utils/images';
import styles from './HomePage.module.scss';

const SLIDE_IMAGES = [
  getImageUrl('/img/phones/apple-iphone-14-pro/spaceblack/00.webp'),
  getImageUrl('/img/phones/apple-iphone-13-pro-max/sierrablue/00.webp'),
  getImageUrl('/img/tablets/apple-ipad-pro-11-2021/silver/00.webp'),
  getImageUrl('/img/accessories/apple-watch-series-3/space-gray/00.webp'),
  getImageUrl('/img/phones/apple-iphone-12/black/00.webp'),
];

export const HomePage = () => {
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setHasError(false);

    getCatalogProducts()
      .then(products => {
        if (cancelled) {
          return;
        }

        setCatalogProducts(products);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const hotPrices = useMemo(() => {
    const discounted = catalogProducts.filter(
      product => (product.fullPrice ?? 0) > (product.price ?? 0),
    );

    return [...discounted].sort(
      (a, b) =>
        (b.fullPrice ?? 0) -
        (b.price ?? 0) -
        ((a.fullPrice ?? 0) - (a.price ?? 0)),
    );
  }, [catalogProducts]);

  const newProducts = useMemo(
    () =>
      [...catalogProducts]
        .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
        .slice(0, 10)
        .map(product => ({ ...product, fullPrice: undefined })),
    [catalogProducts],
  );

  const counts = useMemo(() => {
    const result: Record<string, number> = {};

    for (const item of catalogProducts) {
      result[item.category] = (result[item.category] ?? 0) + 1;
    }

    return result;
  }, [catalogProducts]);

  if (isLoading) {
    return <div className={styles.home} />;
  }

  if (hasError) {
    return <p className={styles.error}>Something went wrong</p>;
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <h2 className={styles.welcomeTitle}>Welcome to Nice Gadgets store!</h2>
      <PicturesSlider images={SLIDE_IMAGES} />

      <section className={styles.section}>
        <ProductsSlider
          title="Brand new models"
          products={newProducts.slice(0, 10)}
        />
      </section>

      <section className={styles.section}>
        <ShopByCategory counts={counts} />
      </section>

      <section className={styles.section}>
        <ProductsSlider title="Hot prices" products={hotPrices.slice(0, 10)} />
      </section>
    </div>
  );
};
