import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.module.scss';
import { ProductCard } from '../../components/ProductList/ProductCard';
import { Product } from '../../components/types/Product';
import { getProducts } from '../../components/api/products';
import styles from './HomePage.module.scss';
import { useRef } from 'react';
import { getCarouselStep } from '../../utils/carouselHelpers';

const images: string[] = [
  "./img/Banner.png",
  "./img/banner-phones.png",
  "./img/banner-tablets.png",
  "./img/banner-accessories.png",
];

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const [brandNewOffset, setBrandNewOffset] = useState(0);
  const [hotPricesOffset, setHotPricesOffset] = useState(0);

  const brandNewRef = useRef<HTMLDivElement>(null);
  const hotPricesRef = useRef<HTMLDivElement>(null);
  
  //const getStep = () => {
   // const width = window.innerWidth;
    //if (width < 640) return 228; // 212px картка + 16px gap
   // if (width < 1200) return 253; // 237px картка + 16px gap
   // return 288; // 272px картка + 16px gap
  //};

  const handleNext = (
    setOffset: React.Dispatch<React.SetStateAction<number>>,
    containerRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (!containerRef.current || !containerRef.current.parentElement) return;

    const step = getCarouselStep(containerRef);
    //const listNode = containerRef.current;
    //const wrapperNode = containerRef.current.parentElement;
    const maxOffset =
      containerRef.current.scrollWidth -
      containerRef.current.parentElement!.offsetWidth;

    setOffset(prev => {
      const next = prev + step;
      return next > maxOffset ? maxOffset : next;
    });
  };

  const handlePrev = (
    setOffset: React.Dispatch<React.SetStateAction<number>>,
    containerRef: React.RefObject<HTMLDivElement>,
  ) => {
    const step = getCarouselStep(containerRef);
    setOffset(prev => Math.max(prev - step, 0));
  };

  const isNextDisabled = (
    offset: number,
    containerRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (!containerRef.current || !containerRef.current.parentElement)
      return false;
    const maxOffset =
      containerRef.current.scrollWidth -
      containerRef.current.parentElement!.offsetWidth;
    return offset >= maxOffset - 5;
  };

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setBrandNewOffset(0);
      setHotPricesOffset(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentImages = isMobile
    ? [
        "./img/BannerMobile.png",
        images[1],
        images[2],
        images[3],
      ]
    : images;

 const brandNewNoDiscount = products
   .filter(product => product.year >= 2022)
   .slice(0, 8)
   .map(product => ({
     ...product,
     price: product.fullPrice,
     discount: 0,
   }));


 const hotPrices = products
   .filter(product => {
     const regular = product.priceRegular || product.fullPrice || 0;
     const discount = product.priceDiscount || product.price || 0;
     return regular - discount > 50;
   })
   .slice(0, 8);


  const nextBanner = () =>
    setCurrentBannerIndex(prev => (prev + 1) % images.length);
  const prevBanner = () =>
    setCurrentBannerIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <main className={styles.home}>
      <div className={styles.container}>
        <h1 className={`${styles.home__title} h1`}>
          Welcome to Nice Gadgets store!
        </h1>

        {/* 1. БАНЕР */}
        <section className={styles.slider}>
          <button className={styles.slider__arrow} onClick={prevBanner}>
            {'<'}
          </button>
          <div className={styles.slider__window}>
            <img
              src={currentImages[currentBannerIndex]}
              alt="Banner"
              className={styles.banner_image}
            />
          </div>
          <button className={styles.slider__arrow} onClick={nextBanner}>
            {'>'}
          </button>
        </section>

        <div className={styles.dots}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${index === currentBannerIndex ? styles.dot_active : ''}`}
              onClick={() => setCurrentBannerIndex(index)}
            />
          ))}
        </div>

        {/* 2. BRAND NEW MODELS */}
        <section className={styles.section}>
          <div className={styles.section__header}>
            <h2 className={`${styles.section__title} h2`}>Brand new models</h2>
            <div className={styles.arrows}>
              <button
                className={styles.arrow_btn}
                onClick={() => handlePrev(setBrandNewOffset, brandNewRef)}
                disabled={brandNewOffset <= 0}
              >
                {'<'}
              </button>
              <button
                className={styles.arrow_btn}
                onClick={() => handleNext(setBrandNewOffset, brandNewRef)}
                disabled={isNextDisabled(brandNewOffset, brandNewRef)}
              >
                {'>'}
              </button>
            </div>
          </div>

          <div className={styles.product_list_container}>
            <div
              className={styles.product_list}
              ref={brandNewRef}
              style={{ transform: `translateX(-${brandNewOffset}px)` }}
            >
              {brandNewNoDiscount.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={styles.card_home_custom}
                  hideDiscount={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. CATEGORIES */}
        <section className={styles.categories}>
          <div className={styles.categories__content}>
            <h2 className={`${styles.categories__title} h2`}>
              Shop by category
            </h2>
            <div className={styles.categories__list}>
              <Link to="/phones" className={styles.category}>
                <div className={styles.category__image_phones}>
                  <img src="./img/phones/Phones.png" alt="Phones" />
                </div>
                <h4 className={styles.category__name}>Mobile phones</h4>
                <p className={styles.category__count}>
                  {products.filter(p => p.category === 'phones').length} models
                </p>
              </Link>
              <Link to="/tablets" className={styles.category}>
                <div className={styles.category__image_tablets}>
                  <img src="./img/tablets/Tablets.png" alt="Tablets" />
                </div>
                <h4 className={styles.category__name}>Tablets</h4>
                <p className={styles.category__count}>
                  {products.filter(p => p.category === 'tablets').length} models
                </p>
              </Link>
              <Link to="/accessories" className={styles.category}>
                <div className={styles.category__image_accessories}>
                  <img
                    src="./img/accessories/Accessories.png"
                    alt="Accessories"
                  />
                </div>
                <h4 className={styles.category__name}>Accessories</h4>
                <p className={styles.category__count}>
                  {products.filter(p => p.category === 'accessories').length}{' '}
                  models
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. HOT PRICES */}
        <section className={styles.section}>
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Hot prices</h2>
            <div className={styles.arrows}>
              <button
                className={styles.arrow_btn}
                onClick={() => handlePrev(setHotPricesOffset, hotPricesRef)}
                disabled={hotPricesOffset <= 0}
              >
                {'<'}
              </button>
              <button
                className={styles.arrow_btn}
                onClick={() => handleNext(setHotPricesOffset, hotPricesRef)}
                disabled={isNextDisabled(hotPricesOffset, hotPricesRef)}
              >
                {'>'}
              </button>
            </div>
          </div>

          <div className={styles.product_list_container}>
            <div
              className={styles.product_list}
              ref={hotPricesRef}
              style={{ transform: `translateX(-${hotPricesOffset}px)` }}
            >
              {hotPrices.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={styles.card_home_custom}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
