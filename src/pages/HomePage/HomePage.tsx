import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { useGlobalState } from '../../hooks/hooks';
import { Slider } from '../../components/Slider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Loader } from '../../components/Loader';
import './HomePage.scss';
import '../../styles/container.scss';

export const HomePage = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);
  const { loading, errorMessage, products } = useGlobalState();

  useEffect(() => {
    const newProd = [...products]
      .sort((product1, product2) => product2.year - product1.year)
      .slice(0, 10);

    const hotPrices = [...products]
      .map(product => ({
        ...product,
        discount: product.fullPrice - product.price,
      }))
      .sort((product1, product2) => product2.discount - product1.discount)
      .slice(0, 10);

    setNewProducts(newProd);
    setHotPricesProducts(hotPrices);
  }, [products]);

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <div className="home">
        <div className="container">
          <div className="home__content">
            <h1 className="home__title">{errorMessage}</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="container">
        <div className="home__content">
          <section>
            <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
            <Slider />
          </section>
          <ProductsSlider
            productsForSlider={newProducts}
            title="Brand new models"
            classMod="new"
          />
          <ShopByCategory />
          <ProductsSlider
            productsForSlider={hotPricesProducts}
            title="Hot prices"
            classMod="hot"
          />
        </div>
      </div>
    </div>
  );
};
