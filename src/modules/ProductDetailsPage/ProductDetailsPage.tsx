import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { getProductList, getProducts, Product } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SkeletonProductDetails } from './components/SkeletonProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Category, CATEGORY_TITLES } from '../../types/category/category';
import { NotFoundPage } from '../NotFoundPage';
import { ProductGallery } from './components/ProductGallery/ProductGallery';
import { ProductOptions } from './components/ProductOptions/ProductOptions';
import { AddToCartBtn, FavoriteBtn } from '../../components/Buttons';
import { TechSpecs } from '../../components/TechSpecs';

import { delay } from '../../utils';
import styles from './ProductDetailsPage.module.scss';
import { ErrorState } from '../../components/ErrorState';

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams<{
    category?: string;
    productId?: string;
  }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [allVariants, setAllVariants] = useState<Product[]>([]);
  const [productNumericId, setProductNumericId] = useState<number>(0);

  const load = async (id = productId) => {
    setLoading(true);
    setError(false);

    try {
      const cat = category as Category;
      const [fullInfo, shortInfo] = await Promise.all([
        getProducts(cat),
        getProductList(),
        delay(800),
      ]);

      if (!fullInfo || fullInfo.length === 0) {
        setError(true);

        return;
      }

      const found = fullInfo.find(p => p.id === id || p.itemId === id) || null;

      setProduct(found);
      setProductNumericId(Math.floor(100000 + Math.random() * 900000));

      if (found) {
        const variants = fullInfo.filter(
          p =>
            p.namespaceId === found.namespaceId &&
            p.category === found.category,
        );

        setAllVariants(variants);

        const shuffled = [...shortInfo]
          .filter(p => p.id !== found.id)
          .sort(() => 0.5 - Math.random());

        setSuggested(shuffled.slice(0, 10));
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleColor = (c: string) => {
    if (!product) {
      return;
    }

    const capacity = searchParams.get('capacity') || product.capacity || '';
    const variant =
      allVariants.find(v => v.color === c && v.capacity === capacity) ||
      allVariants.find(v => v.color === c);

    if (variant) {
      navigate(
        `/${category}/${variant.id}?color=${variant.color}&capacity=${variant.capacity}`,
      );
    }
  };

  const handleCapacity = (c: string) => {
    if (!product) {
      return;
    }

    const color = searchParams.get('color') || product.color || '';
    const variant =
      allVariants.find(v => v.capacity === c && v.color === color) ||
      allVariants.find(v => v.capacity === c);

    if (variant) {
      navigate(
        `/${category}/${variant.id}?color=${variant.color}&capacity=${variant.capacity}`,
      );
    }
  };

  if (loading) {
    return <SkeletonProductDetails />;
  }

  if (error) {
    return <ErrorState message="Something went wrong" onRetry={load} />;
  }

  if (!product || !category) {
    return <NotFoundPage />;
  }

  const p = product;
  const color = searchParams.get('color') || p.color || '';
  const capacity = searchParams.get('capacity') || p.capacity || '';
  const cat = category as Category;
  const categoryName =
    CATEGORY_TITLES[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);

  const shortSpecs = [
    { label: 'Screen', value: p.screen },
    { label: 'Resolution', value: p.resolution },
    { label: 'Processor', value: p.processor },
    { label: 'RAM', value: p.ram },
  ];

  const fullSpecs = [
    ...shortSpecs,
    { label: 'Built in memory', value: p.capacity },
    { label: 'Camera', value: p.camera },
    { label: 'Zoom', value: p.zoom },
    { label: 'Cell', value: p.cell },
  ];

  return (
    <section className={styles.productDetails}>
      <Breadcrumbs
        showBreadcrumbs={true}
        breadcrumbs={[
          { name: categoryName, path: `/${category}` },
          { name: p.name },
        ]}
        backButton={true}
      />

      <h2 className={styles.productDetails__title}>{p.name}</h2>

      <div className={styles.productDetails__mainGrid}>
        <ProductGallery
          images={Array.isArray(p.images) ? p.images : [p.image]}
          name={p.name}
        />

        <div className={styles.productDetails__infoBlock}>
          <div className={styles.productDetails__options}>
            <ProductOptions
              product={p}
              currentColor={color}
              currentCapacity={capacity}
              onColorChange={handleColor}
              onCapacityChange={handleCapacity}
            />

            <div className={styles.productDetails__pricesBlock}>
              <div className={styles.productDetails__pricesRow}>
                <span className={styles.productDetails__price}>
                  ${p.priceDiscount ?? p.price ?? '-'}
                </span>
                {p.priceRegular && (
                  <span className={styles.productDetails__oldPrice}>
                    ${p.priceRegular}
                  </span>
                )}
              </div>

              <div className={styles.productDetails__buttons}>
                <AddToCartBtn
                  product={p}
                  className={styles.productDetails__cartBtn}
                />
                <FavoriteBtn
                  product={p}
                  className={styles.productDetails__favBtn}
                />
              </div>

              <TechSpecs specs={shortSpecs} type="short" />
            </div>
          </div>
        </div>
        <span className={styles.productDetails__id}>
          ID: {productNumericId}
        </span>

        {p.description && (
          <div className={styles.productDetails__aboutBlock}>
            <h3 className={styles.productDetails__blockTitle}>About</h3>
            <div className={styles.productDetails__line} />
            {p.description.map((d, i) => (
              <div key={i} className={styles.productDetails__aboutSection}>
                <h4 className={styles.productDetails__aboutTitle}>{d.title}</h4>
                {d.text.map((t, j) => (
                  <p key={j} className={styles.productDetails__aboutText}>
                    {t}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className={styles.productDetails__techSpecsBlock}>
          <h3 className={styles.productDetails__blockTitle}>Tech specs</h3>
          <div
            className={classNames(
              styles.productDetails__line,
              styles['productDetails__line--techSpecs'],
            )}
          />
          <TechSpecs specs={fullSpecs} type="full" />
        </div>
      </div>

      <ProductsSlider title="You may also like" products={suggested} />
    </section>
  );
};
