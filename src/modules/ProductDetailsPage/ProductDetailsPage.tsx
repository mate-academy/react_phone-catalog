import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './ProductDetailsPage.module.scss';

import { CurrentPage } from '../../shared/components/CurrentPage';
import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { ProductInfo } from './components/ProductInfo';
import { ProductOverview } from './components/ProductOverview';
import { Loader } from '../../shared/components/Loader';

import { SectionTitles } from '../../shared/constants/sectionTitles';
import { SliderId } from '../../shared/constants/sliderId';
import { Product } from '../../shared/types/Product/Product';

import { getRandomInteger } from './utils/randomInteger';
import { getRandomProduct } from './utils/randomProduct';
import { getAllProducts } from '../../shared/services/apiServices';
import { getProduct } from './utils/currentProduct';
import { ProductNotFound } from './components/ProductNotFound';
import { useAppSelector } from '../../store/hooks';

export const ProductDetailsPage = () => {
  const data = useAppSelector(state => state.products.data);
  const [products, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const [, path, slug] = pathname.split('/');

  const randomIntegers = getRandomInteger(0, data.length, 30);
  const randomProducts = getRandomProduct(randomIntegers, data);

  const currentProduct = getProduct(products, slug);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getAllProducts(`/${path}.json`);

        setProduct(response.data);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [path, data]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentProduct) {
    return <ProductNotFound />;
  }

  return (
    <main className={styles.details}>
      <div className={styles.details__container}>
        <CurrentPage
          showProductsCount={products.length}
          currentProduct={currentProduct}
        />
        <ProductOverview product={currentProduct!} />
        <ProductInfo productInfo={currentProduct!} />
      </div>
      <ProductsSlider
        title={SectionTitles.AlsoLike}
        products={randomProducts}
        sliderId={SliderId.Like}
        isHotPrice={true}
      />
    </main>
  );
};
