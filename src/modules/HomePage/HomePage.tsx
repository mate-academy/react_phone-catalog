import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { request } from '../../utils/fetchResponse';

import { PicturesSlider } from '../../components/Slider/PicturesSlider';
import { CategoryProducts } from '../../components/CategoryProducts';
import { ProductsSlider } from '../../components/Slider/ProductsSlider';

import { PicturesSliderType } from './types/PicturesSliderType';
import { Product } from '../../types/Product';

import picturesSliderData from './picturesSliderData.json';

import styles from './HomePage.module.scss';

const banners: PicturesSliderType[] = picturesSliderData;

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    request<Product[]>('/products.json')
      .then(setProducts)
      .catch(() => {
        setHasError(true);
        toast.error('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const sortingNewModels = [...products].sort(
    (left, right) => right.year - left.year,
  );

  const hotPrice = products
    .filter(product => product.fullPrice > product.price)
    .sort(
      (left, right) =>
        right.fullPrice - right.price - (left.fullPrice - left.price),
    );

  return (
    <div className={styles['page-home']}>
      <div className={styles['page-home__wrapper']}>
        <h1 className={styles['visually-hidden']}>Product Catalog</h1>

        <section className={styles['section-pictures']}>
          <h2 className={styles['section-pictures__title']}>
            Welcome to Nice Gadgets store!
          </h2>

          <PicturesSlider slides={banners} />
        </section>

        <ProductsSlider
          products={sortingNewModels}
          title="Brand new models"
          isLoading={isLoading}
          isError={hasError}
          notVisibleFullPrice={true}
        />

        <CategoryProducts
          title="Shop by category"
          products={products}
          isLoading={isLoading}
        />

        <ProductsSlider
          products={hotPrice}
          title="Hot prices"
          isLoading={isLoading}
          isError={hasError}
        />
      </div>
    </div>
  );
}
