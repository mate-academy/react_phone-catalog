// src/pages/Home/Home.tsx
import React, { useState } from 'react';
import styles from './Home.module.css';
import Banner from '../../components/Banner.tsx';
import Title from '../../components/Title';
import ShopCategory from '../../components/ShopCategory/ShopCategory';
import phonesImg from '../../assets/img/shop-phones .png';
import tabletsImg from '../../assets/img/shop-tablets.png';
import accessoriesImg from '../../assets/img/shop-accessories.png';

import { BrandNewModels } from '../../components/BrandNewModels';
import { products } from '../../data/products';
import { hotPrices } from '../../data/hotPrice';

export type TitleSections = {
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  'data-testid'?: string;
  className?: string;
};

type SectionWithTitleProps = {
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  sectionClassName?: string;
  titleClassName?: string;
  titleTestId?: string;
  sectionTestId?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
};

const TitleSection: React.FC<TitleSections> = ({
  title = '',
  titleLevel = 1,
  'data-testid': dataTestId,
  className = '',
}) => {
  if (!title) {
    return null;
  }

  return (
    <div
      className={`${styles.containerTitle} ${className}`}
      data-testid={dataTestId}
    >
      <Title text={title} level={titleLevel} />
    </div>
  );
};

const SectionWithTitle: React.FC<SectionWithTitleProps> = ({
  title,
  titleLevel = 1,
  sectionClassName = '',
  titleClassName = '',
  titleTestId,
  sectionTestId,
  ariaLabel,
  children,
}) => {
  return (
    <section
      className={`${styles.brandSection} ${sectionClassName}`}
      aria-label={ariaLabel}
      data-testid={sectionTestId}
    >
      {title ? (
        <TitleSection
          title={title}
          titleLevel={titleLevel}
          className={titleClassName}
          data-testid={titleTestId}
        />
      ) : null}

      {children}
    </section>
  );
};

const Home: React.FC = () => {
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});

  const toggleFavourite = (id: string) => {
    setFavourites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main>
      <SectionWithTitle
        title="Product Catalog"
        titleLevel={1}
        titleTestId="banner-section"
        ariaLabel="Banner section"
        sectionClassName={styles.sectionBanner}
        titleClassName={styles.TitleBanner}
      ></SectionWithTitle>
      <div className={styles.containerBanner} data-testid="container-banner">
        <Banner />
      </div>

      {/* BRAND NEW MODELS */}
      <SectionWithTitle
        title="Brand new models"
        titleLevel={2}
        titleTestId="brand-title"
        sectionTestId="brand-section"
        ariaLabel="Brand new models"
      >
        <div className={styles.brandGrid}>
          {products.map(p => (
            <BrandNewModels
              key={p.id}
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
      </SectionWithTitle>

      {/* SHOP CATEGORY */}
      <SectionWithTitle
        title="Shop by category"
        titleLevel={2}
        titleTestId="shop-title"
        sectionTestId="shop-section"
        ariaLabel="Shop by category"
      >
        <div className={styles.brandGrid}>
          <ShopCategory
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
      </SectionWithTitle>

      {/* HOT PRICE */}
      <SectionWithTitle
        title="Hot prices"
        titleLevel={2}
        titleTestId="hot-title"
        sectionTestId="hot-section"
        ariaLabel="Hot prices"
      >
        <div className={styles.brandGrid}>
          {hotPrices.map(p => (
            <BrandNewModels
              key={p.id}
              title={p.title}
              imageSrc={p.imageSrc}
              imageAlt={p.title}
              price={p.price}
              specs={p.specs}
              onButtonClick={() => addToCart(p)}
              onFavouriteClick={() => toggleFavourite(p.id)}
              isFavourite={!!favourites[p.id]}
              data-testid={`hot-card-${p.id}`}
            />
          ))}
        </div>
      </SectionWithTitle>
    </main>
  );
};

export default Home;
