import { useState, useEffect } from 'react';
import { getProducts } from '../../api/api';
import { ProductSlider } from '../../components/ProductSlider';
import { ProductType } from '../../types/ProductType';
import { SortType } from '../../types/SortType';
import './HomePage.scss';
import { BannerSlider } from '../../components/BannerSlider';

export const HomePage = () => {
  const [newestProducts, setNewestProducts] = useState<ProductType[]>([]);
  const [hotProducts, setHotProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    const newestProducts = await getProducts();
    const hotProducts = await getProducts({ sortBy: SortType.Discount });

    setNewestProducts(newestProducts.products);
    setHotProducts(hotProducts.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>

      <div className="home-page__container">
        <section className="home-page__banner">
          <BannerSlider />
        </section>

        <section className="home-page__models">
          <ProductSlider products={newestProducts} title="Brand new models" />
        </section>

        <section className="home-page__categories home-page__section">
          <h2 className="home-page__section-title">Shop by category</h2>

          <div className="home-page__categories-container">
            <div className="home-page__categories-category">
              <img
                className="home-page__categories-category-photo"
                src="/categories/phones.png"
                alt="Phones category photo"
              />
              <h4 className="home-page__categories-category-title">
                Mobile phones
              </h4>
              <p className="body-text home-page__categories-category-subtitle">
                95 models
              </p>
            </div>

            <div className="home-page__categories-category">
              <img
                className="home-page__categories-category-photo"
                src="/categories/tablets.png"
                alt="Phones category photo"
              />
              <h4 className="home-page__categories-category-title">Tablets</h4>
              <p className="body-text home-page__categories-category-subtitle">
                24 models
              </p>
            </div>

            <div className="home-page__categories-category">
              <img
                className="home-page__categories-category-photo"
                src="/categories/accessories.png"
                alt="Phones category photo"
              />
              <h4 className="home-page__categories-category-title">
                Accessories
              </h4>
              <p className="body-text home-page__categories-category-subtitle">
                100 models
              </p>
            </div>
          </div>
        </section>

        <section className="home-page__hot-prices">
          <ProductSlider products={hotProducts} title="Hot prices" />
        </section>
      </div>
    </div>
  );
};
