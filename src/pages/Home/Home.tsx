import React, { useEffect, useState } from 'react';
import productsData from '../../../public/api/products.json';
import { CatalogProduct } from '../../../public/types';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';

import './Home.scss';

function Home() {
  const banners = [
    { id: 1, desktop: './img/Banner.png', mobile: './img/banner-mobile.svg' },
    {
      id: 2,
      desktop: './img/banner2.png',
      mobile: './img/banner2.png',
    },
    {
      id: 3,
      desktop: './img/banner3.png',
      mobile: './img/banner3.png',
    },
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const nextBanner = () => {
    setCurrentBannerIndex(prev => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  // Бонус: Автоперемикання кожні 5 секунд
  useEffect(() => {
    const interval = setInterval(nextBanner, 5000);

    return () => clearInterval(interval);
  }, []);
  // -------------------
  // BRAND NEW MODELS
  // -------------------
  const sortedProducts: CatalogProduct[] = [...productsData]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handlePrev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () =>
    setStartIndex(prev =>
      Math.min(prev + 1, sortedProducts.length - visibleCount),
    );

  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + visibleCount,
  );

  // -------------------
  // HOT PRICES
  // -------------------
  const discountProducts: CatalogProduct[] = [...productsData]
    .filter(product => product.fullPrice && product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 10); // обмеження на 10 карток

  const [hotStartIndex, setHotStartIndex] = useState(0);

  const handleHotPrev = () => setHotStartIndex(prev => Math.max(prev - 1, 0));
  const handleHotNext = () =>
    setHotStartIndex(prev =>
      Math.min(prev + 1, discountProducts.length - visibleCount),
    );

  const visibleDiscountProducts = discountProducts.slice(
    hotStartIndex,
    hotStartIndex + visibleCount,
  );

  const phonesCount = productsData.filter(p => p.category === 'phones').length;
  const tabletsCount = productsData.filter(
    p => p.category === 'tablets',
  ).length;
  const accessoriesCount = productsData.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <div className="home">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>

      {/* Banner carousel */}
      <section className="banner">
        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={prevBanner}>
            <img src="./img/Arrow_Left.svg" alt="Left" />
          </button>

          <div className="banner-home">
            <picture>
              <source
                srcSet={banners[currentBannerIndex].mobile}
                media="(max-width: 639px)"
              />
              <img
                src={banners[currentBannerIndex].desktop}
                alt={`Banner ${currentBannerIndex + 1}`}
                className="banner"
              />
            </picture>
          </div>

          <button className="carousel-arrow right" onClick={nextBanner}>
            <img src="./img/Arrow_Right.svg" alt="Right" />
          </button>
        </div>

        {/* Динамічні точки (dots) */}
        <div className="carousel-dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentBannerIndex ? 'active' : ''}`}
              onClick={() => setCurrentBannerIndex(index)} // можливість клікнути на точку
              style={{ cursor: 'pointer' }}
            >
              <img
                src={
                  index === currentBannerIndex
                    ? './img/Carousel_Dot_Active.svg'
                    : './img/Carousel_Dot.svg'
                }
                alt="Dot"
              />
            </span>
          ))}
        </div>
      </section>

      {/* Brand new models */}
      <section className="brand-new-models">
        <div className="container-products">
          <h2>Brand new models</h2>
          <div className="carousel-buttons">
            <button
              className="carousel-arrow left"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
              <img src="./img/Arrow_Left.svg" alt="Left" />
            </button>
            <button
              className="carousel-arrow right"
              onClick={handleNext}
              disabled={startIndex + visibleCount >= sortedProducts.length}
            >
              <img src="./img/Arrow_Right.svg" alt="Right" />
            </button>
          </div>
        </div>
        <div className="products-grid">
          {visibleProducts.map(product => (
            <ProductCard key={product.itemId} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2 className="categories__title">Shop by category</h2>
        <div className="categories__container">
          {/* Категорія: Телефони */}
          <Link
            to="/phones"
            className="categories__category"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="categories__category-img-container">
              <img src="./img/Phones.png" alt="Phones" />
            </div>
            <div className="category__name">Mobile phones</div>
            <div className="number-of-products">{phonesCount} models</div>
          </Link>

          {/* Категорія: Планшети */}
          <Link
            to="/tablets"
            className="categories__category"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="categories__category-img-container">
              <img src="./img/Tablets.png" alt="Tablets" />
            </div>
            <div className="category__name">Tablets</div>
            <div className="number-of-products">{tabletsCount} models</div>
          </Link>

          {/* Категорія: Аксесуари */}
          <Link
            to="/accessories"
            className="categories__category"
            onClick={() => window.scrollTo(0, 0)} // Додано сюди теж
          >
            <div className="categories__category-img-container">
              <img src="./img/Accessories.png" alt="Accessories" />
            </div>
            <div className="category__name">Accessories</div>
            <div className="number-of-products">{accessoriesCount} models</div>
          </Link>
        </div>
      </section>

      {/* Hot prices */}
      <section className="hot-prices">
        <div className="container-divider">
          <h2>Hot prices</h2>
          <div className="carousel-buttons">
            <button
              className="carousel-arrow left"
              onClick={handleHotPrev}
              disabled={hotStartIndex === 0}
            >
              <img src="./img/Arrow_Left.svg" alt="Left" />
            </button>
            <button
              className="carousel-arrow right"
              onClick={handleHotNext}
              disabled={hotStartIndex + visibleCount >= discountProducts.length}
            >
              <img src="./img/Arrow_Right.svg" alt="Right" />
            </button>
          </div>
        </div>
        <div className="products-grid">
          {visibleDiscountProducts.map(product => (
            <ProductCard key={product.itemId} product={product} showDiscount />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
