import { Product, ProductDetailsWithArticle } from '@/types/Product';
import { FC, memo, useMemo } from 'react';

import styles from './Content.module.scss';
import { GallerySlider } from '../../../shared/components/GallerySlider';
import { MainInfo } from '../MainInfo';
import { About } from '../About';
import { TechSpecs } from '../TechSpecs';
import { ProductsSlider } from '@/modules/shared/components/ProductsSlider';
import { useFetch } from '@/modules/shared/hooks/useFetch';
import { getRandomProducts } from '@/api/product.service';
import { FetchOptions } from '@/types/FetchOptions';

interface Props {
  product: ProductDetailsWithArticle;
}

const PRODUCTS_SLIDES_COUNT = 10;

export const Content: FC<Props> = memo(function Content({ product }) {
  const {
    article,
    name,
    screen,
    images,
    description,
    resolution,
    processor,
    ram,
    category,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

  const { data: products, loading } = useFetch<Product[]>(
    (options: FetchOptions) =>
      getRandomProducts(article, options, PRODUCTS_SLIDES_COUNT),
    {
      initialValue: [],
      dependency: [article],
    },
  );

  const productSpecs = useMemo(() => {
    return Object.fromEntries(
      Object.entries({
        screen,
        resolution,
        processor,
        RAM: ram,
        [category === 'accessories' ? 'size' : 'built in memory']: capacity,
        camera,
        zoom,
        cell: cell.join(', '),
      }).filter(([, value]) => value),
    );
  }, [
    screen,
    resolution,
    processor,
    ram,
    category,
    capacity,
    camera,
    zoom,
    cell,
  ]);

  return (
    <>
      <h1 className={styles.productTitle}>{name}</h1>

      <section className={styles.hero}>
        <GallerySlider images={images} className={styles.slider} />

        <MainInfo product={product} />
      </section>

      <div className={styles.productDetails}>
        <About description={description} />

        <TechSpecs specs={productSpecs} />
      </div>

      <section className={styles.productsSlider}>
        <ProductsSlider
          products={products}
          title="You may also like"
          isLoading={loading}
        />
      </section>
    </>
  );
});
