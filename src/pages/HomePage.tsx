import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';
import { Loader } from '../components/Loader';
import { ProductsSlider } from '../components/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory';
import { Banner } from '../components/Banner';
import { Message } from '../components/Message';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getHotPriceProducts = () => {
    return products
      .filter(product => product.discount > 0)
      .sort((productA, productB) => {
        return productB.price * productB.discount
          - productA.price * productA.discount;
      });
  };

  const getBrandNewProduct = () => {
    return products
      .filter(product => !product.discount)
      .sort((productA, productB) => productB.price - productA.price);
  };

  const hotPriceProducts = getHotPriceProducts();
  const newProducts = getBrandNewProduct();

  const getQuantity = (productType: string) => {
    return products
      .filter(currentProduct => currentProduct.type === productType)
      .length;
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(loadedProducts => setProducts(loadedProducts))
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="home-page">
      <section className="home-page__top-slider">
        <Banner />
      </section>

      <section className="home-page__hot-prices">
        {!isError && !isLoading && (
          <ProductsSlider products={hotPriceProducts} title="Hot prices" />
        )}
        {isError && (
          <Message message="Failed to load products" isError />
        )}
        {isLoading && (
          <Loader />
        )}
      </section>

      <section className="home-page__shop-by-category">
        <ShopByCategory
          phonesQuantity={getQuantity('phone')}
          tabletsQuantity={getQuantity('tablet')}
          accessoriesQuantity={getQuantity('accessorie')}
        />
      </section>

      <section className="home-page__new-models">
        {!isError && !isLoading && (
          <ProductsSlider products={newProducts} title="Brand new models" />
        )}
        {isError && (
          <Message message="Failed to load products" isError />
        )}
        {isLoading && (
          <Loader />
        )}
      </section>
    </div>
  );
};
