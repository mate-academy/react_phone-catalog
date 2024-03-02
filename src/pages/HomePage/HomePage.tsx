import { useEffect, useState } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider';
import './HomePage.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Categories';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // setIsError(false);
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getHotPriceProducts = (allProducts: Product[]) => {
    return [...allProducts].sort((product1, product2) => {
      return (product2.fullPrice - product2.price)
        - (product1.fullPrice - product1.price);
    });
  };

  const getBrandNewProducts = (allProducts: Product[]) => {
    return [...allProducts]
      .filter(product => product.name.includes('14'))
      .sort((product1, product2) => {
        return product2.price - product1.price;
      });
  };

  const hotPriceProducts = getHotPriceProducts(products);

  const brandNewProducts = getBrandNewProducts(products);

  return (
    <div className="home-page">
      <h1 hidden>Product Catalog</h1>
      <section className="home-page__section">
        <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
      </section>

      {!isError && !isLoading && (
        <section className="home-page__section">
          <ProductsSlider
            products={brandNewProducts.slice(0, 20)}
            title="Brand new models"
          />
        </section>
      )}

      <section className="home-page__section">
        <Categories />
      </section>

      <section className="home-page__section">
        <ProductsSlider
          products={hotPriceProducts.slice(0, 20)}
          title="Hot prices"
        />
      </section>
    </div>
  );
};
