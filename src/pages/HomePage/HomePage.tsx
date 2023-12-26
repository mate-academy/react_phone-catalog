import { useContext, useEffect, useState } from 'react';
import { BannersSlider } from '../../components/BannersSlider/BannersSlider';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ProductContext } from '../../helpers/ProductsContext';
import {
  getBrandNewProducts, getHotPriceProducts, getProducts,
} from '../../helpers/productsServise';
import { Product } from '../../helpers/types';

import './HomePage.scss';

export function HomePage() {
  const { products, setProducts } = useContext(ProductContext);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts().then(setProducts);
    getHotPriceProducts().then(setHotPriceProducts);
    getBrandNewProducts().then(setBrandNewProducts)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="home-page">
      {isLoading
        ? <Loader />
        : (
          <>
            <section className="home-page__section">
              <BannersSlider />
            </section>

            <section className="home-page__section hot-prices">
              <ProductsSlider title="Hot prices" products={hotPriceProducts} />
            </section>

            <section className="home-page__section categories">
              <h1 className="categories__title">Shop by category</h1>

              <div
                className="categories__content"
                data-cy="categoryLinksContainer"
              >
                <div className="categories__category category">
                  <a href="#/phones" className="category__link">
                    <img
                      src="./img/categories/phones.jpg"
                      width="368px"
                      alt="mobile phones"
                      className="category__img"
                    />
                    <h2 className="category__title">Mobile phones</h2>
                  </a>

                  <p className="category__subtitle">
                    {`${products.filter(item => item.category === 'phones').length} models`}
                  </p>
                </div>

                <div className="categories__category category">
                  <a href="#/phones" className="category__link">
                    <img
                      src="./img/categories/tabs.jpg"
                      width="368px"
                      alt="mobile phones"
                      className="category__img"
                    />
                    <h2 className="category__title">Tablets</h2>
                  </a>

                  <p className="category__subtitle">
                    {`${products.filter(item => item.category === 'tablets').length} models`}
                  </p>
                </div>

                <div className="categories__category category">
                  <a href="#/phones" className="category__link">
                    <img
                      src="./img/categories/accessories.jpg"
                      width="368px"
                      alt="mobile phones"
                      className="category__img"
                    />
                    <h2 className="category__title">Accessories</h2>
                  </a>

                  <p className="category__subtitle">
                    {`${products.filter(item => item.category === 'accessories').length} models`}
                  </p>
                </div>
              </div>
            </section>

            <section className="home-page__section new-models">
              <ProductsSlider
                title="Brand new models"
                products={brandNewProducts}
              />
            </section>
          </>
        )}
    </div>
  );
}
