import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/products';
import type { Product } from '../../types/Product';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '../shared/components/Icons/Icons';

const banners = [
  {
    src: 'img/banner-main.webp',
    alt: 'iPhone 14 Pro is now available in our store',
  },
  {
    src: 'img/banner-slide-2.webp',
    alt: 'iPhone 11 in every colour',
  },
  {
    src: 'img/banner-slide-3.webp',
    alt: 'Cases, wallets and MagSafe accessories',
  },
];

const SLIDE_INTERVAL = 5000;

const categoryMeta: Record<string, { title: string; image: string }> = {
  phones: {
    title: 'Mobile phones',
    image: 'img/category-phones.webp',
  },
  tablets: {
    title: 'Tablets',
    image: 'img/category-tablets.webp',
  },
  accessories: {
    title: 'Accessories',
    image: 'img/category-accessories.webp',
  },
};

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveSlide(prev => (prev + 1) % banners.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timerId);
  }, []);

  const goToSlide = (index: number) => () => {
    setActiveSlide((index + banners.length) % banners.length);
  };

  const hotPrices = useMemo(() => {
    const wanted: Array<[string, string]> = [
      [
        'apple-iphone-11-pro-64gb-midnightgreen',
        'img/hot-prices/midnightgreen.png',
      ],
      ['apple-iphone-11-pro-max-64gb-gold', 'img/hot-prices/gold.png'],
      ['apple-iphone-11-64gb-purple', 'img/hot-prices/purple.png'],
      ['apple-iphone-11-64gb-red', 'img/hot-prices/red.png'],
    ];

    return wanted
      .map(([id, image]) => {
        const product = products.find(p => p.itemId === id);

        return product ? { ...product, image } : null;
      })
      .filter((p): p is Product => Boolean(p));
  }, [products]);

  const brandNew = useMemo(() => {
    const wanted: Array<[string, string]> = [
      ['apple-iphone-14-pro-256gb-silver', 'img/brand-new/silver.png'],
      ['apple-iphone-14-pro-256gb-deeppurple', 'img/brand-new/deeppurple.png'],
      ['apple-iphone-14-pro-128gb-gold', 'img/brand-new/gold.png'],
      ['apple-iphone-14-pro-256gb-productred', 'img/brand-new/productred.png'],
    ];

    return wanted
      .map(([id, image]) => {
        const product = products.find(p => p.itemId === id);

        return product ? { ...product, image } : null;
      })
      .filter((p): p is Product => Boolean(p));
  }, [products]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };

    products.forEach(product => {
      if (counts[product.category] !== undefined) {
        counts[product.category]++;
      }
    });

    return counts;
  }, [products]);

  return (
    <div className="page home">
      <h1 className="visually-hidden">Product Catalog</h1>

      <h2 className="home__section-title">Welcome to Nice Gadgets store!</h2>

      <div className="slider">
        <button
          type="button"
          className="slider__button"
          aria-label="Previous slide"
          onClick={goToSlide(activeSlide - 1)}
        >
          <ArrowLeftIcon size={16} />
        </button>

        <div className="slider__viewport">
          <div
            className="slider__track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {banners.map(banner => (
              <img
                key={banner.src}
                src={`${import.meta.env.BASE_URL}${banner.src}`}
                alt={banner.alt}
                className="slider__image"
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="slider__button"
          aria-label="Next slide"
          onClick={goToSlide(activeSlide + 1)}
        >
          <ArrowRightIcon size={16} />
        </button>

        <div className="dots">
          {banners.map((banner, index) => (
            <button
              key={banner.src}
              type="button"
              className={index === activeSlide ? 'active' : undefined}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide}
              onClick={goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {products.length ? (
        <ProductsSlider
          title="Brand new models"
          products={brandNew}
          withDiscount={false}
        />
      ) : (
        !error && <Loader />
      )}

      <section className="home__section">
        <div className="section-topline">
          <h2 className="home__section-title">Shop by category</h2>
        </div>
        <div className="categories">
          {(['phones', 'tablets', 'accessories'] as const).map(category => {
            const meta = categoryMeta[category];
            const count = categoryCounts[category] ?? 0;

            return (
              <Link
                to={`/${category}`}
                className="category-card"
                key={category}
              >
                <div className="category-card__image-wrapper">
                  <img
                    src={`${import.meta.env.BASE_URL}${meta.image}`}
                    alt={meta.title}
                    className="category-card__image"
                    loading="lazy"
                  />
                </div>
                <h3 className="category-card__title">{meta.title}</h3>
                <p className="category-card__count">{count} models</p>
              </Link>
            );
          })}
        </div>
      </section>

      {products.length > 0 && (
        <ProductsSlider title="Hot prices" products={hotPrices} />
      )}
    </div>
  );
};
