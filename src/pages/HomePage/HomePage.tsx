import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.scss';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';

const CARD_GAP = 16;

const useCardsSlider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scroll = (direction: 1 | -1) => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + CARD_GAP : 272 + CARD_GAP;

    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return { ref, canPrev, canNext, update, scroll };
};

export const HomePage = () => {
  const banners = [
    {
      id: 1,
      desktop: '/img/home-page-banner.png',
      mobile: '/img/home-page-banner-mobile.png',
    },
    {
      id: 2,
      desktop: '/img/home-page-banner.png',
      mobile: '/img/home-page-banner-mobile.png',
    },
    {
      id: 3,
      desktop: '/img/home-page-banner.png',
      mobile: '/img/home-page-banner-mobile.png',
    },
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentBannerIndex, banners.length]);

  const goToNextBanner = () => {
    setCurrentBannerIndex(prevIndex => (prevIndex + 1) % banners.length);
  };

  const goToPreviousBanner = () => {
    setCurrentBannerIndex(
      prevIndex => (prevIndex - 1 + banners.length) % banners.length,
    );
  };

  const uniqueForBrandNew = phones.filter(
    (product, index, self) =>
      index === self.findIndex(p => p.namespaceId === product.namespaceId),
  );

  const getModelNumber = (namespaceId: string) => {
    const match = namespaceId.match(/\d+/);

    return match ? parseInt(match[0], 10) : 0;
  };

  const brandNewProducts = [...uniqueForBrandNew].sort((a, b) => {
    return getModelNumber(b.namespaceId) - getModelNumber(a.namespaceId);
  });

  const uniqueProducts = phones.filter(
    (product, index, self) =>
      index === self.findIndex(p => p.namespaceId === product.namespaceId),
  );

  const hotPricesProducts = [...uniqueProducts]
    .filter(p => p.priceRegular > p.priceDiscount)
    .sort(
      (a, b) =>
        b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount),
    );

  const brandNew = useCardsSlider();
  const hotPrices = useCardsSlider();

  const phonesCount = phones.length;
  const tabletsCount = tablets.length;
  const accessoriesCount = accessories.length;

  return (
    <div className={styles.container}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.mainTitle}>Welcome to Nice Gadgets store!</h2>

      <section className={styles.slider}>
        <button type="button" onClick={goToPreviousBanner}>
          <img src="/img/icons/arrow-left.svg" alt="Previous" />
        </button>

        <picture className={styles.bannerPicture}>
          <source
            media="(max-width: 639px)"
            srcSet={banners[currentBannerIndex].mobile}
          />
          <img
            className={styles.banner}
            src={banners[currentBannerIndex].desktop}
            alt="Banner"
          />
        </picture>

        <button type="button" onClick={goToNextBanner}>
          <img src="/img/icons/arrow-right.svg" alt="Next" />
        </button>
      </section>

      <div className={styles.pagination}>
        {banners.map((banner, index) => (
          <span
            key={banner.id}
            className={`${styles.dot} ${index === currentBannerIndex ? styles.active : ''}`}
            onClick={() => setCurrentBannerIndex(index)}
          />
        ))}
      </div>

      <section className={styles.brandNewSection}>
        <div className={styles.brandNewHeader}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>
          <div className={styles.brandNewArrows}>
            <button
              type="button"
              onClick={() => brandNew.scroll(-1)}
              disabled={!brandNew.canPrev}
            >
              <img src="/img/icons/arrow-left.svg" alt="Previous" />
            </button>

            <button
              type="button"
              onClick={() => brandNew.scroll(1)}
              disabled={!brandNew.canNext}
            >
              <img src="/img/icons/arrow-right.svg" alt="Next" />
            </button>
          </div>
        </div>

        <div
          className={styles.cardsContainer}
          ref={brandNew.ref}
          onScroll={brandNew.update}
        >
          {brandNewProducts.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} showOldPrice={false} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.shopByCategory}>
        <h2 className={styles.sectionTitle}>Shop by category</h2>

        <div className={styles.categoryGrid}>
          <Link to="/phones" className={styles.categoryCard}>
            <div className={`${styles.imageWrapper} ${styles.phonesBg}`}>
              <img src="/img/category-phones.webp" alt="Mobile phones" />
            </div>
            <h4 className={styles.cardTitle}>Mobile phones</h4>
            <p className={styles.cardCount}>{`${phonesCount} models`}</p>
          </Link>

          <Link to="/tablets" className={styles.categoryCard}>
            <div className={`${styles.imageWrapper} ${styles.tabletsBg}`}>
              <img src="/img/category-tablets.webp" alt="Tablets" />
            </div>
            <h4 className={styles.cardTitle}>Tablets</h4>
            <p className={styles.cardCount}>{`${tabletsCount} models`}</p>
          </Link>

          <Link to="/accessories" className={styles.categoryCard}>
            <div className={`${styles.imageWrapper} ${styles.accessoriesBg}`}>
              <img src="/img/category-accessories.webp" alt="Accessories" />
            </div>
            <h4 className={styles.cardTitle}>Accessories</h4>
            <p className={styles.cardCount}>{`${accessoriesCount} models`}</p>
          </Link>
        </div>
      </section>

      <section className={styles.brandNewSection}>
        <div className={styles.brandNewHeader}>
          <h2 className={styles.sectionTitle}>Hot prices</h2>
          <div className={styles.brandNewArrows}>
            <button
              type="button"
              onClick={() => hotPrices.scroll(-1)}
              disabled={!hotPrices.canPrev}
            >
              <img src="/img/icons/arrow-left.svg" alt="Previous" />
            </button>

            <button
              type="button"
              onClick={() => hotPrices.scroll(1)}
              disabled={!hotPrices.canNext}
            >
              <img src="/img/icons/arrow-right.svg" alt="Next" />
            </button>
          </div>
        </div>

        <div
          className={styles.cardsContainer}
          ref={hotPrices.ref}
          onScroll={hotPrices.update}
        >
          {hotPricesProducts.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
