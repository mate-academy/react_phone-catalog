import './HomePage.scss';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import { Carousel } from '../../components/Carousel/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Product } from '../../types/Product';
import { Categories } from '../../components/Categories/Categories';
import { Banner } from '../../components/Banner/Banner';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const hotPricesProducts = products.sort((p1, p2) => (
    p2.fullPrice - p2.price) - (p1.fullPrice - p1.price));
  const brandNewProducts = products.sort((p1, p2) => p2.year - p1.year);

  useEffect(() => {
    setIsLoader(true);
    getProducts()
      .then(setProducts)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  if (isError) {
    return (<Banner message="Error occured. Try again later" />);
  }

  return (
    <main className="homepage">
      <Carousel />

      <ProductsSlider
        title="Hot prices"
        products={hotPricesProducts}
        isLoader={isLoader}
      />

      <Categories
        products={products}
        isLoader={isLoader}
      />

      <ProductsSlider
        title="Brand new models"
        products={brandNewProducts}
        isLoader={isLoader}
      />
    </main>
  );
};
