import { useEffect, useRef, useState } from 'react';
import './HomePage.scss';
import classNames from 'classnames';
import { ProductItem } from '../types/Phone';
import { SimilarProduct } from '../SimilarProduct';
import { Link } from 'react-router-dom';
import { CountItem } from '../CountItem';

const sliderImages = [
  '/img/banner-accessories.png',
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
];

const categoryImages = [
  ['/img/category-phones.webp', 'phones', '#6D6474', 'Mobile phones'],
  ['/img/category-tablets.webp', 'tablets', '#8D8D92', 'Tablets'],
  ['/img/category-accessories.webp', 'accessories', '#D53C51', 'Accessories'],
];

export const HomePage = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [slideWidth, setSlideWidth] = useState(1040);
  const [index, setIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const sortProductByDiscount = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );
  const sortProductByYear = [...products].sort((a, b) => b.year - a.year);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setSlideWidth(320);
      } else if (width < 1200) {
        setSlideWidth(490);
      } else {
        setSlideWidth(1040);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const smoothScroll = (target: number, duration = 500) => {
    const el = sliderRef.current;

    if (!el) {
      return;
    }

    setTimeout(() => {
      const start = el.scrollLeft;
      const distance = target - start;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        el.scrollLeft = start + distance * progress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, 10); // Затримка 5 мс перед запуском анімації
  };

  const setNextImg = (delta: number) => {
    const newIndex =
      (index + delta + sliderImages.length) % sliderImages.length;

    setIndex(newIndex);
    smoothScroll(newIndex * slideWidth);
  };

  const jumpToIndex = (i: number) => {
    setIndex(i);
    smoothScroll(i * slideWidth);
  };

  useEffect(() => {
    const el = sliderRef.current;

    if (slideWidth !== 320 || !el) {
      return;
    }

    let scrollTimeout: NodeJS.Timeout;

    const onScroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const currentIndex = Math.round(el.scrollLeft / slideWidth);
        const targetScrollLeft = currentIndex * slideWidth;

        smoothScroll(targetScrollLeft);

        setIndex(prev => (prev !== currentIndex ? currentIndex : prev));
      }, 100);
    };

    el.addEventListener('scroll', onScroll);

    return () => {
      el.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [slideWidth]);

  return (
    <div className="home__page">
      <h1 className="main__title title">Welcome to Nice Gadgets store!</h1>

      <section className="section__slider">
        {slideWidth > 320 && (
          <button
            className="slider-button__left slider__button"
            onClick={() => setNextImg(-1)}
          ></button>
        )}

        <div className="slider" ref={sliderRef}>
          <div className="slider__container" style={{ display: 'flex' }}>
            {sliderImages.map((img, i) => (
              <div
                key={i}
                className="slider__image"
                style={{
                  backgroundImage: `url(${img})`,
                  minWidth: `${slideWidth}px`,
                  height: '100%',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>
        </div>

        {slideWidth > 320 && (
          <button
            className="slider-button__right slider__button"
            onClick={() => setNextImg(1)}
          ></button>
        )}
      </section>

      <div className="box__tick-slide">
        {sliderImages.map((_, i) => (
          <button
            key={i}
            className={classNames('button__tick-slide', {
              'tick-active': index === i,
            })}
            onClick={() => jumpToIndex(i)}
          ></button>
        ))}
      </div>

      <section className="section__new-models">
        <SimilarProduct
          products={sortProductByYear}
          title="Brand new models"
          link
        />
      </section>

      <section className="shop-categories">
        <h2 className="title by-category__text">Shop by category</h2>
        <div className="box-category__images">
          {categoryImages.map(([imgSrc, category, bgColor, label], i) => (
            <Link to={`/${category}`} key={i} className="link-category__image">
              <div
                className="category__image"
                style={{
                  backgroundImage: `url(${imgSrc})`,
                  backgroundColor: bgColor,
                }}
              />
              <div className="category-text__for-image first-category">
                <p className="category-text__main">{label}</p>
                <CountItem
                  count={products.filter(p => p.category === category).length}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="hot-prices">
        <SimilarProduct
          products={sortProductByDiscount}
          title="Hot prices"
          link
        />
      </section>
    </div>
  );
};
