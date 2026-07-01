import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/fetchClient';
import { PicturesSlider, SlideItem } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import styles from './HomePage.module.scss';

type CategoryItem = {
  to: string;
  label: string;
  image: string;
  tabletImage?: string;
  desktopImage?: string;
  type: 'phones' | 'tablets' | 'accessories';
};

const BANNERS: SlideItem[] = [
  {
    image: '/img/banners/banner-phone-device.png',
    tabletObjectPosition: 'center',
    imageScale: '0.8',
    tabletImageScale: '0.82',
    desktopImageScale: '0.84',
    badge: 'Summer drop',
    title: 'Flagship phones',
    subtitle: 'Premium design, amazing cameras, and top-tier performance.',
    ctaLabel: 'Shop phones',
    gradient:
      'linear-gradient(125deg, rgb(232 240 255 / 94%) 0%, ' +
      'rgb(206 221 248 / 78%) 42%, ' +
      'rgb(160 184 225 / 62%) 100%)',
    alt: 'Phones',
    link: '/phones',
  },
  {
    image: '/img/banners/banner-tablet-device.png',
    tabletObjectPosition: 'center',
    imageScale: '1',
    tabletImageScale: '1.02',
    desktopImageScale: '1.03',
    badge: 'Work and chill',
    title: 'Tablets for flow',
    subtitle: 'Productivity and entertainment with a large, fluid display.',
    ctaLabel: 'Shop tablets',
    gradient:
      'linear-gradient(128deg, rgb(255 244 229 / 94%) 0%, ' +
      'rgb(248 221 187 / 78%) 44%, ' +
      'rgb(228 175 118 / 62%) 100%)',
    alt: 'Tablets',
    link: '/tablets',
  },
  {
    image: '/img/banners/banner-accessory-device.png',
    tabletObjectPosition: 'center',
    imageScale: '0.8',
    tabletImageScale: '0.82',
    desktopImageScale: '0.84',
    badge: 'Final touch',
    title: 'Accessories that match',
    subtitle: 'Choose the right details to complete your setup.',
    ctaLabel: 'Shop accessories',
    gradient:
      'linear-gradient(128deg, rgb(248 250 253 / 94%) 0%, ' +
      'rgb(225 232 241 / 78%) 44%, ' +
      'rgb(188 199 214 / 64%) 100%)',
    alt: 'Accessories',
    link: '/accessories',
  },
];

const CATEGORIES: CategoryItem[] = [
  {
    to: '/phones',
    label: 'Phones',
    image: '/img/categories/category-phones-mobile.png',
    tabletImage: '/img/categories/category-phones-tablet.png',
    desktopImage: '/img/categories/category-phones-desktop.png',
    type: 'phones',
  },
  {
    to: '/tablets',
    label: 'Tablets',
    image: '/img/categories/category-tablets-mobile.png',
    tabletImage: '/img/categories/category-tablets-tablet.png',
    type: 'tablets',
  },
  {
    to: '/accessories',
    label: 'Accessories',
    image: '/img/categories/category-accessories.webp',
    type: 'accessories',
  },
];

export const HomePage = () => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [brandNew, setBrandNew] = useState<Product[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    getProducts().then(products => {
      const byDiscount = [...products].sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;

        return discountB - discountA;
      });

      setHotPrices(byDiscount.slice(0, 10));

      const byYear = [...products].sort((a, b) => b.year - a.year);

      setBrandNew(byYear.slice(0, 10));

      setCounts({
        phones: products.filter(p => p.category === 'phones').length,
        tablets: products.filter(p => p.category === 'tablets').length,
        accessories: products.filter(p => p.category === 'accessories').length,
      });
    });
  }, []);

  return (
    <div className={styles.page}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider items={BANNERS} />

      <ProductsSlider title="Brand new models" products={brandNew} />

      <section className={styles.categories}>
        <h2 className={styles.categoriesTitle}>Shop by category</h2>

        <div className={styles.categoriesGrid}>
          {CATEGORIES.map(category => (
            <Link
              key={category.to}
              to={category.to}
              className={cn(
                styles.categoryCard,
                styles[`categoryCard${category.type}`],
              )}
            >
              <div
                className={cn(
                  styles.categoryImageWrapper,
                  styles[`categoryImageWrapper${category.type}`],
                )}
              >
                {category.tabletImage || category.desktopImage ? (
                  <picture className={styles.categoryPicture}>
                    {category.desktopImage && (
                      <source
                        media="(min-width: 1200px)"
                        srcSet={category.desktopImage}
                      />
                    )}

                    {category.tabletImage && (
                      <source
                        media="(min-width: 640px)"
                        srcSet={category.tabletImage}
                      />
                    )}

                    <img
                      src={category.image}
                      alt={category.label}
                      className={cn(
                        styles.categoryImage,
                        styles[`categoryImage${category.type}`],
                      )}
                    />
                  </picture>
                ) : (
                  <img
                    src={category.image}
                    alt={category.label}
                    className={cn(
                      styles.categoryImage,
                      styles[`categoryImage${category.type}`],
                    )}
                  />
                )}
              </div>
              <h3 className={styles.categoryLabel}>{category.label}</h3>
              <p className={styles.categoryCount}>
                {counts[category.to.slice(1)] ?? 0} models
              </p>
            </Link>
          ))}
        </div>
      </section>

      <ProductsSlider title="Hot prices" products={hotPrices} />
    </div>
  );
};
