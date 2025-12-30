import React, { useEffect, useRef, useState } from 'react';

import '../../styles/grid.scss';
import './HomePage.scss';
import { ProductList } from '../../components/ProductList';
import { Banner } from '../../components/Banner';
import { CategoryCard } from '../../components/CategoryCard';
import { getCategoryCounts } from '../../utils/getCategoryCounts';
import { Product } from '../../types/Product';

export const HomePage: React.FC = () => {
  const trackRefNew = useRef<HTMLDivElement>(null);
  const trackRefHot = useRef<HTMLDivElement>(null);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [counts, setCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  // -------------------------------
  // Load all products
  // -------------------------------
  useEffect(() => {
    setLoading(true);

    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        setAllProducts(data);
        setLoading(false);
      });
  }, []);

  // -------------------------------
  // Category counts
  // -------------------------------
  useEffect(() => {
    getCategoryCounts().then(setCounts);
  }, []);

  // -------------------------------
  // NEW MODELS (сортуємо по year)
  // -------------------------------

  const phones = allProducts.filter(p => p.category === 'phones');

  const newProducts = [...phones]
    .filter(p => ['13', '14'].some(model => p.itemId.includes(model)))
    .map(p => ({
      ...p,
      price: p.fullPrice, // підміняємо на regular price
    }))
    .slice(0, 10);

  // -------------------------------
  // HOT PRICES (сортуємо по ціні)
  // -------------------------------
  const hotProducts = [...phones]
    .filter(p => p.price < p.fullPrice)
    .sort((a, b) => (a.price ?? a.fullPrice!) - (b.price ?? b.fullPrice!))
    .slice(0, 10);

  // -------------------------------
  // Slider scroll
  // -------------------------------
  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right',
  ) => {
    if (!ref.current) {
      return;
    }

    const scrollAmount = 272 + 16;

    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount * 4 : scrollAmount * 4,
      behavior: 'smooth',
    });
  };

  return (
    <main className="home">
      <div className="container">
        <div className="grid">
          <h1 className="home__title">Product Catalog</h1>

          {/* Banner */}
          <Banner />

          {/* Brand new */}
          <section className="home__section">
            <div className="home__grid">
              <h2 className="home__subtitle">Brand new models</h2>
              <div className="product-list__arrow">
                <button
                  className="product-list__arrow product-list__arrow-left"
                  onClick={() => handleScroll(trackRefNew, 'left')}
                >
                  <img src="/img/icons/left.svg" alt="Prev" />
                </button>

                <button
                  className="product-list__arrow product-list__arrow-right"
                  onClick={() => handleScroll(trackRefNew, 'right')}
                >
                  <img src="/img/icons/right.svg" alt="Next" />
                </button>
              </div>
            </div>
            <ProductList
              products={newProducts}
              isLoading={loading}
              mode="slider"
              trackRef={trackRefNew}
            />
          </section>

          {/* Categories */}
          <section className="home__section">
            <h2 className="home__subtitle">Shop by category</h2>

            <div className="category-grid">
              <CategoryCard
                title="Mobile phones"
                count={counts.phones}
                image="/img/category-phones.webp"
                bg="#6D6474"
                mod="phones"
              />

              <CategoryCard
                title="Tablets"
                count={counts.tablets}
                image="/img/category-tablets.webp"
                bg="#8D8D92"
                mod="tablets"
              />

              <CategoryCard
                title="Accessories"
                count={counts.accessories}
                image="/img/category-accessories.webp"
                bg="#FFC0CB"
                mod="accessories"
              />
            </div>
          </section>

          {/* Hot prices */}
          <section className="home__section">
            <div className="home__grid">
              <h2 className="home__subtitle">Hot prices</h2>
              <div className="product-list__arrow">
                <button
                  className="product-list__arrow product-list__arrow-left"
                  onClick={() => handleScroll(trackRefHot, 'left')}
                >
                  <img src="/img/icons/left.svg" alt="Prev" />
                </button>

                <button
                  className="product-list__arrow product-list__arrow-right"
                  onClick={() => handleScroll(trackRefHot, 'right')}
                >
                  <img src="/img/icons/right.svg" alt="Next" />
                </button>
              </div>
            </div>
            <ProductList
              products={hotProducts}
              isLoading={loading}
              mode="slider"
              trackRef={trackRefHot}
            />
          </section>
        </div>
      </div>
    </main>
  );
};
