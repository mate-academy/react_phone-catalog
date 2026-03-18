import React, { useMemo } from 'react';
import { CardCarousel } from '../CardCarousel';
import { Carousel } from '../Carousel';
import styles from './HomePage.module.scss';
import { Category } from '../Category';
import { useProducts } from '../../hooks/useProducts';
import ContentLoader from 'react-content-loader';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { phones, products, tablets, accessories, isLoading } = useProducts();
  const newest = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);
  const { t } = useTranslation();

  const hotPrices = useMemo(() => {
    return [...products]
      .filter(p => p.fullPrice > p.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
  }, [products]);

  return (
    <>
      <main className={styles.main}>
        <h1 style={{ position: 'absolute', left: '-9999px' }}>
          Product Catalog
        </h1>
        <p className={styles.title}>{t('title')}</p>
      </main>

      <Carousel />
      <CardCarousel
        products={newest}
        title={t('titlebrend')}
        fullPrice={false}
      />
      <div className={styles.box}>
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <ContentLoader
              key={index}
              speed={2}
              width={288}
              height={506}
              viewBox="0 0 288 506"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="47" y="47" rx="0" ry="0" width="121" height="116" />
              <rect x="7" y="179" rx="0" ry="0" width="198" height="16" />
              <rect x="7" y="202" rx="0" ry="0" width="198" height="16" />
              <rect x="7" y="245" rx="0" ry="0" width="150" height="48" />
              <rect x="7" y="333" rx="0" ry="0" width="198" height="16" />
              <rect x="7" y="353" rx="0" ry="0" width="198" height="16" />
              <rect x="7" y="373" rx="0" ry="0" width="198" height="16" />
              <rect x="17" y="415" rx="0" ry="0" width="103" height="42" />
              <rect x="130" y="413" rx="0" ry="0" width="41" height="42" />
            </ContentLoader>
          ))}
      </div>

      <Category phones={phones} tablets={tablets} accessories={accessories} />
      <CardCarousel
        products={hotPrices}
        title={t('titleprice')}
        fullPrice={true}
      />
      <div className={styles.box}>
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <ContentLoader
              key={index}
              speed={2}
              width={288}
              height={506}
              viewBox="0 0 288 506"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="47" y="47" rx="0" ry="0" width="121" height="116" />
              <rect x="7" y="179" rx="0" ry="0" width="198" height="16" />
              <rect x="7" y="202" rx="0" ry="0" width="198" height="16" />
              <rect x="7" y="245" rx="0" ry="0" width="150" height="48" />
              <rect x="7" y="333" rx="0" ry="0" width="198" height="16" />
              <rect x="7" y="353" rx="0" ry="0" width="198" height="16" />
              <rect x="7" y="373" rx="0" ry="0" width="198" height="16" />
              <rect x="17" y="415" rx="0" ry="0" width="103" height="42" />
              <rect x="130" y="413" rx="0" ry="0" width="41" height="42" />
            </ContentLoader>
          ))}
      </div>
    </>
  );
};
