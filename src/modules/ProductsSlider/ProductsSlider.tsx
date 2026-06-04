import React, { useEffect, useState } from 'react';

import styles from './ProductsSlider.module.scss';

import { getProducts } from '../../api/products.api';
import { ProductType } from '../../types/product.types';
import { ProductsPresetType, SortType } from '../../types/sorting.types';
import { Spinner } from '../../components/Spinner';
import { ProductCard } from '../../components/ProductCard';
import { useSlider } from '../../hooks/useSlider';
import { ArrowButton } from '../../components/ArrowButton';
import { sortProducts } from '../../utils/sorting';
import { filterProductsByCategory } from '../../utils/filtering';
import classNames from 'classnames';

interface ProductsSliderProps {
  title: string;
  productsPresetType?: ProductsPresetType;
  category?: string;
  excludeItemId?: string;
  className?: string;
}

const resolveProductsByPreset = (
  allProducts: ProductType[],
  preset?: ProductsPresetType,
  category?: string,
  excludeItemId?: string,
): ProductType[] => {
  let filtered = [...allProducts];

  if (category) {
    filtered = filterProductsByCategory(allProducts, category);
  }

  if (excludeItemId) {
    filtered = filtered.filter(product => product.id !== excludeItemId);
  }

  if (!preset) {
    filtered = filtered.sort(() => Math.random() - 0.5);
  }

  if (filtered.length < 12) {
    const otherProducts = allProducts
      .filter(
        product =>
          product.category !== category && product.id !== excludeItemId,
      )
      .sort(() => Math.random() - 0.5);

    filtered = [...filtered, ...otherProducts];
  }

  switch (preset) {
    case ProductsPresetType.Newest:
      return filtered.slice(-12).reverse();

    case ProductsPresetType.HotPrices:
      return sortProducts(filtered, SortType.HotPrices).slice(0, 12);

    default:
      return filtered.slice(0, 12);
  }
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  productsPresetType,
  category,
  excludeItemId,
  className,
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setWindowWidth] = useState(window.innerWidth);
  const { sliderRef, next, prev, pause, resume } = useSlider({
    mode: 'scroll',
    autoDelay: 5000,
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(data => {
        const allProducts = data as unknown as ProductType[];

        const result = resolveProductsByPreset(
          allProducts,
          productsPresetType,
          category,
          excludeItemId,
        );

        setProducts(result);
      })
      .finally(() => setLoading(false));
  }, [productsPresetType, category, excludeItemId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={classNames(styles.productSlider, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttonBox}>
          <ArrowButton
            onClick={prev}
            className={styles.buttonLeft}
            arrowClassName={styles.arrowLeft}
          />

          <ArrowButton
            onClick={next}
            className={styles.buttonRight}
            arrowClassName={styles.arrowRight}
          />
        </div>
      </div>

      <div
        ref={sliderRef}
        className={styles.slider}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {products.map(product => (
          <div className={styles.slide} key={product.id}>
            <ProductCard className={styles.productCard} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
