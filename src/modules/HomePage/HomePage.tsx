import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { useProducts } from '../shared/hooks/useProducts';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { NavLink } from 'react-router-dom';
import { Loader } from '../shared/components/Loader';
import { getPublicPath } from '../shared/utils/getPublicPath';

const slides = [
  {
    image: getPublicPath('/img/banner-phones.jpg'),
    title: 'Now available in our store!',
    text: 'Be the first!',
    link: '/phones',
  },
  {
    image: getPublicPath('/img/banner-tablets.png'),
    title: 'Tablets for work and play',
    text: 'Choose your perfect device',
    link: '/tablets',
  },
  {
    image: getPublicPath('/img/banner-accessories.jpg'),
    title: 'Accessories for every day',
    text: 'Complete your setup',
    link: '/accessories',
  },
];

export const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { products, loading, error } = useProducts();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const phones = products.filter(item => item.category === 'phones');
  const tablets = products.filter(item => item.category === 'tablets');
  const accessories = products.filter(item => item.category === 'accessories');

  const slide = slides[activeSlide];

  const showNextSlide = () => {
    setActiveSlide(current => (current + 1) % slides.length);
  };

  const showPreviousSlide = () => {
    setActiveSlide(current =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => showNextSlide(), 5000);

    return () => clearInterval(intervalId);
  }, [activeSlide]);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) {
      return;
    }

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      showNextSlide();
    }

    if (isRightSwipe) {
      showPreviousSlide();
    }
  };

  const brandNewProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 13);
  const hotPrices = products
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  if (loading) {
    return <Loader />;
  }

  if (error || !products) {
    return <p>Products not found</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.homePageTitle}>Product Catalog</h1>

      <div className={styles.homePageSlider}>
        <div
          className={styles.homePageCenter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className={styles.homePageArrow}
            type="button"
            onClick={showPreviousSlide}
            aria-label="Previous slide"
          >
            <img
              className={styles.homePageArrowImg}
              src={getPublicPath('img/footer-button-arrow.png')}
              alt="123"
            />
          </button>

          <div className={styles.homePagePosters}>
            <img
              className={styles.homePagePosterImg}
              src={slide.image}
              alt=""
            />
            <div className={styles.homePagePosterContent}>
              <h2 className={styles.homePagePosterTitle}>{slide.title}</h2>
              <p className={styles.homePagePosterText}>{slide.text}</p>

              <a className={styles.homePagePosterButton} href={slide.link}>
                ORDER NOW
              </a>
            </div>
          </div>

          <button
            className={styles.homePageArrow}
            type="button"
            onClick={showNextSlide}
            aria-label="Next slide"
          >
            <img
              className={`${styles.homePageArrowImg} ${styles.homePageArrowImgRight}`}
              src={getPublicPath('img/footer-button-arrow.png')}
              alt="123"
            />
          </button>
        </div>

        <div className={styles.homePageIndicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.homePageIndicator} ${
                index === activeSlide ? styles.homePageIndicatorActive : ''
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.homePageGridContainer}>
        <ProductsSlider title="Brand new models" products={brandNewProducts} />
      </div>

      <div className={styles.homePageShopByCategory}>
        <h2 className={styles.homePageShopByCategoryTitle}>Shop by category</h2>

        <div className={styles.homePageShopByCategoryCards}>
          <NavLink to="/phones" className={styles.homePageShopByCategoryCard}>
            <img
              className={styles.homePageShopByCategoryImg}
              src={getPublicPath('img/category-phones.jpg')}
              alt=""
            />
            <h3 className={styles.homePageShopByCategoryText}>Mobile phones</h3>
            <h4 className={styles.homePageShopByCategoryCount}>
              {phones.length} models
            </h4>
          </NavLink>

          <NavLink to="/tablets" className={styles.homePageShopByCategoryCard}>
            <img
              className={styles.homePageShopByCategoryImg}
              src={getPublicPath('img/category-tablets.png')}
              alt=""
            />
            <h3 className={styles.homePageShopByCategoryText}>Tablets</h3>
            <h4 className={styles.homePageShopByCategoryCount}>
              {tablets.length} models
            </h4>
          </NavLink>

          <NavLink
            to="/accessories"
            className={styles.homePageShopByCategoryCard}
          >
            <img
              className={styles.homePageShopByCategoryImg}
              src={getPublicPath('img/category-accessories.jpg')}
              alt=""
            />
            <h3 className={styles.homePageShopByCategoryText}>Accessories</h3>
            <h4 className={styles.homePageShopByCategoryCount}>
              {accessories.length} models
            </h4>
          </NavLink>
        </div>
      </div>

      <div className={styles.homePageGridContainer}>
        <ProductsSlider title="Hot prices" products={hotPrices} />
      </div>
    </div>
  );
};
