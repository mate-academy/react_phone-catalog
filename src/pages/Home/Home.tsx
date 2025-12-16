// src/pages/Home/Home.tsx
import React, { useState, useEffect } from 'react';
import { useSearchVisibility } from '../../context/SearchVisibilityContext';
import styles from './Home.module.css';
import Banner from '../../components/Banner.tsx';
import Title from '../../components/Title/Title';
import ShopCategory from '../../components/ShopCategory/ShopCategory';
import phonesImg from '../../assets/img/shop-phones.png';
import tabletsImg from '../../assets/img/shop-tablets.png';
import accessoriesImg from '../../assets/img/shop-accessories.png';
import { phones, PhoneProduct } from '../../data/phones';
import { getDetailsLink } from '../../utils/getDetailsLink';
import { BrandNewModels } from '../../components/BrandNewModels';
import { hotPrices } from '../../data/hotPrice';
import btnLeft from '../../assets/img/Btn-Left.svg';
import btnRight from '../../assets/img/Btn-Right.svg';
import bannerMobile from '../../assets/img/Banner_mobile.png';
import bannerMobilePurple from '../../assets/img/Banner-mobile-purple.png';
import bannerMobilePink from '../../assets/img/Banner-mobile-pink.png';

type SectionWithTitleProps = {
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  sectionClassName?: string;
  titleTestId?: string;
  sectionTestId?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'banner'; // nova prop
};

const mobileImgs = [bannerMobile, bannerMobilePurple, bannerMobilePink];

const SectionWithTitle: React.FC<SectionWithTitleProps> = ({
  title,
  titleLevel = 1,
  sectionClassName = '',
  titleTestId,
  sectionTestId,
  ariaLabel,
  children,
  variant = 'default',
}) => {
  return (
    <section
      className={`${styles.brandSection} ${sectionClassName}`}
      aria-label={ariaLabel}
      data-testid={sectionTestId}
    >
      {title ? (
        <Title
          text={title}
          level={titleLevel}
          variant={variant}
          data-testid={titleTestId}
        />
      ) : null}

      {children}
    </section>
  );
};

const Home: React.FC = () => {
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const { setVisible } = useSearchVisibility();

  // estados para Hot Price
  const [hotStartIndex, setHotStartIndex] = useState(0);

  const ITEMS_PER_PAGE = 4;
  const [brandStartIndex, setBrandStartIndex] = useState(0);

  useEffect(() => {
    setVisible(true);

    return () => setVisible(false);
  }, [setVisible]);

  const toggleFavourite = (id: string) => {
    setFavourites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // handlers
  const handleHotPrev = () => {
    setHotStartIndex(prev => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  const handleHotNext = () => {
    setHotStartIndex(prev =>
      Math.min(prev + ITEMS_PER_PAGE, hotPrices.length - ITEMS_PER_PAGE),
    );
  };

  const handleBrandPrev = () => {
    setBrandStartIndex(prev => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  const handleBrandNext = () => {
    setBrandStartIndex(prev =>
      Math.min(
        prev + ITEMS_PER_PAGE,
        Math.max(0, phones.length - ITEMS_PER_PAGE),
      ),
    );
  };

  // lista visível
  const visibleHotPrices = hotPrices.slice(
    hotStartIndex,
    hotStartIndex + ITEMS_PER_PAGE,
  );

  const visibleBrandPhones = phones.slice(
    brandStartIndex,
    brandStartIndex + ITEMS_PER_PAGE,
  );

  return (
    <div role="main" className={styles.homeMain}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      {/* BANNER */}
      <section
        className={styles.sectionBanner}
        aria-label="Banner title"
        data-testid="banner-section"
      >
        <Title
          text="Welcome to Nice Gadgets store!"
          level={2}
          className={styles.bannerTitle}
        />
      </section>

      <div className={styles.containerBanner} data-testid="container-banner">
        <Banner mobileImages={mobileImgs} />
      </div>

      {/* BRAND NEW MODELS */}
      <SectionWithTitle
        title=""
        titleLevel={2}
        titleTestId="brand-title"
        sectionTestId="brand-section"
        ariaLabel="Brand new models"
        sectionClassName={styles.brandSection}
      >
        {/* bloco de título + botões isolado */}
        <div className={styles.brandHeader} data-testid="brand-header">
          <Title className={styles.title} text="Brand new models" level={2} />
          <div className={styles.titleRowButtons}>
            <button
              type="button"
              aria-label="Previous brand models"
              onClick={handleBrandPrev}
              disabled={brandStartIndex === 0}
            >
              <img src={btnLeft} alt="Previous" />
            </button>
            <button
              type="button"
              aria-label="Next brand models"
              onClick={handleBrandNext}
              disabled={brandStartIndex + ITEMS_PER_PAGE >= phones.length}
            >
              <img src={btnRight} alt="Next" />
            </button>
          </div>
        </div>

        {/* bloco de cards isolado */}
        <div
          className={styles.containerGeneral}
          data-testid="container-general"
        >
          <div className={styles.brandScrollerGrid}>
            {visibleBrandPhones.map((p: PhoneProduct) => (
              <BrandNewModels
                id={p.id}
                key={p.id}
                detailsLink={getDetailsLink(p)}
                title={p.title}
                imageSrc={p.imageSrc}
                imageAlt={p.title}
                price={p.price}
                specs={p.specs}
                onFavouriteClick={() => toggleFavourite(p.id)}
                isFavourite={!!favourites[p.id]}
                data-testid={`brand-card-${p.id}`}
              />
            ))}
          </div>
        </div>
      </SectionWithTitle>

      {/* SHOP CATEGORY */}
      <SectionWithTitle
        title=""
        titleLevel={2}
        titleTestId="shop-title"
        sectionTestId="shop-section"
        ariaLabel="Shop by category"
      >
        <div className={styles.shopHeader}>
          <div className={styles.titleRow}>
            <h2 className={styles.shopTitle}>Shop Category</h2>
          </div>
        </div>

        <div className={styles.shopContainer}>
          <div className={styles.shopCategory}>
            <ShopCategory
              link="/phones"
              imageAlt="Smartphones"
              className={styles.shopCard}
              backgroundImage={phonesImg}
              data-testid="shop-card-smartphones"
            >
              <div className={styles.textContent}>
                <h3>Smartphones</h3>
                <p>Latest models and deals</p>
              </div>
            </ShopCategory>

            <ShopCategory
              link="/tablets"
              imageAlt="Tablets"
              className={styles.shopCard}
              backgroundImage={tabletsImg}
              data-testid="shop-card-tablets"
            >
              <div className={styles.textContent}>
                <h3>Tablets</h3>
                <p>Portable and powerful</p>
              </div>
            </ShopCategory>

            <ShopCategory
              link="/accessories"
              imageAlt="Accessories"
              className={styles.shopCard}
              backgroundImage={accessoriesImg}
              data-testid="shop-card-accessories"
            >
              <div className={styles.textContent}>
                <h3>Accessories</h3>
                <p>Cases, chargers and more</p>
              </div>
            </ShopCategory>
          </div>
        </div>
      </SectionWithTitle>

      {/* HOT PRICE */}
      <SectionWithTitle
        title=""
        titleLevel={2}
        titleTestId="hot-title"
        sectionTestId="hot-section"
        ariaLabel="Hot prices"
        sectionClassName={styles.hotSection}
      >
        {/* bloco de título + botões isolado */}
        <div className={styles.hotHeader} data-testid="hot-header">
          <div className={styles.titleRow}>
            <Title className={styles.title} text="Hot prices" level={2} />
          </div>
          <div className={styles.hotTitleRowButtons}>
            <button
              type="button"
              aria-label="Previous hot prices"
              onClick={handleHotPrev}
              disabled={hotStartIndex === 0}
            >
              <img src={btnLeft} alt="Previous" />
            </button>
            <button
              type="button"
              aria-label="Next hot prices"
              onClick={handleHotNext}
              disabled={hotStartIndex + ITEMS_PER_PAGE >= hotPrices.length}
            >
              <img src={btnRight} alt="Next" />
            </button>
          </div>
        </div>

        {/* bloco de cards isolado */}
        <div
          className={styles.hotContainerGeneral}
          data-testid="hot-container-general"
        >
          <div className={styles.hotScrollerGrid} aria-label="Hot prices list">
            {visibleHotPrices.map((p: PhoneProduct) => (
              <BrandNewModels
                id={p.id}
                key={p.id}
                detailsLink={getDetailsLink(p)}
                title={p.title}
                imageSrc={p.imageSrc}
                imageAlt={p.title}
                price={p.price}
                specs={p.specs}
                onFavouriteClick={() => toggleFavourite(p.id)}
                isFavourite={!!favourites[p.id]}
                data-testid={`hot-card-${p.id}`}
              />
            ))}
          </div>
        </div>
      </SectionWithTitle>
    </div>
  );
};

export default Home;
