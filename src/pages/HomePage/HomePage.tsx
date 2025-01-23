import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/api';
import { ProductSlider } from '../../components/ProductSlider';
import { ProductType } from '../../types/ProductType';
import { SortType } from '../../types/SortType';
import { BannerSlider } from '../../components/BannerSlider';
import './HomePage.scss';

const BANNERS = [
  {
    desktop: 'banners/iphone_14_pro.png',
    mobile: 'banners/iphone_14_pro_mobile.png',
    link: 'product/apple-iphone-14-512gb-midnight',
  },
  {
    desktop: 'banners/watch_series_6.png',
    mobile: 'banners/watch_series_6_mobile.png',
    link: 'product/apple-watch-series-6-44mm-space-gray',
  },
  {
    desktop: 'banners/ipad_pro_11.png',
    mobile: 'banners/ipad_pro_11_mobile.png',
    link: 'product/apple-ipad-pro-11-2021-128gb-spacegray',
  },
];

const CATEGORIES = [
  {
    image: 'categories/phones.png',
    title: 'Mobile phones',
    link: 'phones',
    model_count: 95,
  },
  {
    image: 'categories/tablets.png',
    title: 'Tablets',
    link: 'tablets',
    model_count: 24,
  },
  {
    image: 'categories/accessories.png',
    title: 'Accessories',
    link: 'accessories',
    model_count: 100,
  },
];

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
          <BannerSlider banners={BANNERS} />
        </section>

        <section className="home-page__models">
          <ProductSlider products={newestProducts} title="Brand new models" />
        </section>

        <section className="home-page__categories home-page__section">
          <h2 className="home-page__section-title">Shop by category</h2>

          <div className="home-page__categories-container">
            {CATEGORIES.map(category => (
              <Link
                key={category.title}
                to={category.link}
                className="home-page__categories-category"
              >
                <img
                  className="home-page__categories-category-photo"
                  src={category.image}
                  alt="Phones category photo"
                />
                <h4 className="home-page__categories-category-title">
                  {category.title}
                </h4>
                <p className="body-text home-page__categories-category-subtitle">
                  {category.model_count} models
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-page__hot-prices">
          <ProductSlider products={hotProducts} title="Hot prices" />
        </section>
      </div>
    </div>
  );
};
