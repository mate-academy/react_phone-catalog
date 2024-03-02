import { useContext, useEffect, useState } from 'react';
import { getBrandNewProducts, getHotPriceProducts } from '../../api';
import './HomePage.scss';
import { Product } from '../../type/Product';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Banner } from '../../components/Banner';
import slides from '../../data/carouselData.json';
import { CartContext } from '../../components/CartContext/CartContext';
import { NotificationWindow } from '../../components/NotificationWindow';

export const HomePage = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  const { products, isLoading, isError } = useContext(CartContext);

  useEffect(() => {
    getHotPriceProducts()
      .then(setHotPriceProducts);
  }, []);

  useEffect(() => {
    getBrandNewProducts()
      .then(setNewProducts);
  }, []);

  return (
    <div className="container container--home">
      <div className="home-page">
        <section className="home-page__section home-page__section--banner ">
          <Banner slides={slides} />
        </section>
        <section className="home-page__section ">
          {isError && (
            <p className="has-text-danger">
              Something went wrong
            </p>
          )}
          {
            isLoading ? (
              <Loader />
            ) : (
              <ProductsSlider
                products={hotPriceProducts}
                title="Hot prices"
              />
            )
          }
        </section>
        <section className="home-page__section ">
          <ShopByCategory products={products} />
        </section>
        <section className="home-page__section ">
          {
            isError && (
              <p className="has-text-danger">
                Something went wrong
              </p>
            )
          }
          {
            isLoading ? (
              <Loader />
            ) : (
              <ProductsSlider
                products={newProducts}
                title="Brand new models"
                hasDiscount={false}
              />
            )
          }
        </section>
        <NotificationWindow />
      </div>
    </div>
  );
};
