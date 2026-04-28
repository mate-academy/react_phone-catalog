import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../../public/api/products.json';
import { CatalogProduct } from '../../../public/types';
import ProductCard from '../../components/ProductCard/ProductCard';

import s from './Home.module.scss';

const banners = [
  { id: 1, desktop: './img/Banner.png', mobile: './img/banner-mobile.svg' },
  { id: 2, desktop: './img/banner2.png', mobile: './img/banner2.png' },
  { id: 3, desktop: './img/banner3.png', mobile: './img/banner3.png' },
];

export const Home: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const visibleCount = 4;

  const nextBanner = () => {
    setCurrentBannerIndex(prev => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextBanner, 5000);
    return () => clearInterval(interval);
  }, []);

  const sortedProducts: CatalogProduct[] = [...(productsData as CatalogProduct[])]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () =>
    setStartIndex(prev => Math.min(prev + 1, sortedProducts.length - visibleCount));

  const visibleProducts = sortedProducts.slice(startIndex, startIndex + visibleCount);

  const discountProducts: CatalogProduct[] = [...(productsData as CatalogProduct[])]
    .filter(product => product.fullPrice && product.fullPrice > product.price)
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
    .slice(0, 10);

  const [hotStartIndex, setHotStartIndex] = useState(0);

  const handleHotPrev = () => setHotStartIndex(prev => Math.max(prev - 1, 0));
  const handleHotNext = () =>
    setHotStartIndex(prev => Math.min(prev + 1, discountProducts.length - visibleCount));

  const visibleDiscountProducts = discountProducts.slice(hotStartIndex, hotStartIndex + visibleCount);

  const phonesCount = productsData.filter(p => p.category === 'phones').length;
  const tabletsCount = productsData.filter(p => p.category === 'tablets').length;
  const accessoriesCount = productsData.filter(p => p.category === 'accessories').length;

  return (
    <div className={s.home}>
      <h1 className={s.visuallyHidden}>Product Catalog</h1>
      <h2 className={s.homeTitle}>Welcome to Nice Gadgets store!</h2>

      <section className={s.bannerSection}>
        <div className={s.carouselWrapper}>
          <button className={`${s.carouselArrow} ${s.left}`} onClick={prevBanner}>
            <img src="./img/Arrow_Left.svg" alt="Left" />
          </button>

          <div className={s.bannerHome}>
            <picture>
              <source
                srcSet={banners[currentBannerIndex].mobile}
                media="(max-width: 639px)"
              />
              <img
                src={banners[currentBannerIndex].desktop}
                alt={`Banner ${currentBannerIndex + 1}`}
                className={s.bannerImage}
              />
            </picture>
          </div>

          <button className={`${s.carouselArrow} ${s.right}`} onClick={nextBanner}>
            <img src="./img/Arrow_Right.svg" alt="Right" />
          </button>
        </div>

        <div className={s.carouselDots}>
          {banners.map((_, index) => (
            <span
              key={index}
              className={`${s.dot} ${index === currentBannerIndex ? s.active : ''}`}
              onClick={() => setCurrentBannerIndex(index)}
            >
              <img
                src={index === currentBannerIndex ? './img/Carousel_Dot_Active.svg' : './img/Carousel_Dot.svg'}
                alt="Dot"
              />
            </span>
          ))}
        </div>
      </section>

      <section className={s.brandNewModels}>
        <div className={s.containerProducts}>
          <h3>Brand new models</h3>
          <div className={s.carouselButtons}>
            <button className={s.carouselArrowSmall} onClick={handlePrev} disabled={startIndex === 0}>
              <img src="./img/Arrow_Left.svg" alt="Left" />
            </button>
            <button className={s.carouselArrowSmall} onClick={handleNext} disabled={startIndex + visibleCount >= sortedProducts.length}>
              <img src="./img/Arrow_Right.svg" alt="Right" />
            </button>
          </div>
        </div>
        <div className={s.productsGrid}>
          {visibleProducts.map(product => (
            <ProductCard key={product.itemId} product={product} />
          ))}
        </div>
      </section>

      <section className={s.categories}>
        <h3 className={s.categoriesTitle}>Shop by category</h3>
        <div className={s.categoriesContainer}>
          <Link to="/phones" className={s.categoriesCategory} onClick={() => window.scrollTo(0, 0)}>
            <div className={s.categoryImgContainer}>
              <img src="./img/Phones.png" alt="Phones" />
            </div>
            <div className={s.categoryName}>Mobile phones</div>
            <div className={s.numberOfProducts}>{phonesCount} models</div>
          </Link>

          <Link to="/tablets" className={s.categoriesCategory} onClick={() => window.scrollTo(0, 0)}>
            <div className={s.categoryImgContainer}>
              <img src="./img/Tablets.png" alt="Tablets" />
            </div>
            <div className={s.categoryName}>Tablets</div>
            <div className={s.numberOfProducts}>{tabletsCount} models</div>
          </Link>

          <Link to="/accessories" className={s.categoriesCategory} onClick={() => window.scrollTo(0, 0)}>
            <div className={s.categoryImgContainer}>
              <img src="./img/Accessories.png" alt="Accessories" />
            </div>
            <div className={s.categoryName}>Accessories</div>
            <div className={s.numberOfProducts}>{accessoriesCount} models</div>
          </Link>
        </div>
      </section>

      <section className={s.hotPrices}>
        <div className={s.containerDivider}>
          <h3>Hot prices</h3>
          <div className={s.carouselButtons}>
            <button className={s.carouselArrowSmall} onClick={handleHotPrev} disabled={hotStartIndex === 0}>
              <img src="./img/Arrow_Left.svg" alt="Left" />
            </button>
            <button className={s.carouselArrowSmall} onClick={handleHotNext} disabled={hotStartIndex + visibleCount >= discountProducts.length}>
              <img src="./img/Arrow_Right.svg" alt="Right" />
            </button>
          </div>
        </div>
        <div className={s.productsGrid}>
          {visibleDiscountProducts.map(product => (
            <ProductCard key={product.itemId} product={product} showDiscount />
          ))}
        </div>
      </section>
    </div>
  );
};

