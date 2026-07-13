import React, { useEffect, useState, useMemo } from 'react';
import { BannerSlider } from './components/PicturesSlider';
import styles from './HomePage.module.scss';
import { Carousel } from '../shared/components/Carousel';
import { CarouselProduct, Product } from '../shared/types/Product';
import { getProducts } from '../shared/utils/api';
import { Loader } from '../shared/components/Loader';
import { Categories } from './components/Categories';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const { newModels, hotPrices } = useMemo(() => {
    const newModelsData = [...products]
      .sort((a, b) => b.year - a.year)
      .slice(0, 10);

    const hotPricesData = [...products]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 10);

    const mapToCarousel = (p: Product): CarouselProduct => ({
      id: p.itemId,
      img: p.image,
      name: p.name,
      category: p.category,
      capacity: p.capacity,
      priceRegular: p.fullPrice,
      priceDiscount: p.price,
      ram: p.ram,
      screen: p.screen,
    });

    return {
      newModels: newModelsData.map(mapToCarousel),
      hotPrices: hotPricesData.map(mapToCarousel),
    };
  }, [products]);

  if (isLoading) {
    return (
      <div className={styles.home_page__loader_container}>
        <Loader />
      </div>
    );
  }

  if (hasError || !products) {
    return <h2 className={styles.home_page__error_text}>Product not found</h2>;
  }

  return (
    <div className={styles.home_page}>
      <h1>Product Catalog</h1>
      <BannerSlider />
      <Carousel title="Brand new models" cards={newModels} />
      <Categories />
      <Carousel title="Hot prices" cards={hotPrices} />
    </div>
  );
};
