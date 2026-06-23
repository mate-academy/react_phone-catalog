import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { useT } from '../../context/LanguageContext';
import { TranslationKey } from '../../i18n/translations';
import categoryPhones from '../../assets/category-phones.jpg';
import categoryTablets from '../../assets/category-tablets.jpg';
import categoryAccessories from '../../assets/category-accessories.jpg';
import styles from './ShopByCategory.module.scss';

interface CategoryDef {
  to: string;
  labelKey: TranslationKey;
  cat: 'phones' | 'tablets' | 'accessories';
  bg: string;
  image: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    to: '/phones',
    labelKey: 'category.phones',
    cat: 'phones',
    bg: '#6d6474',
    image: categoryPhones,
  },
  {
    to: '/tablets',
    labelKey: 'category.tablets',
    cat: 'tablets',
    bg: '#8d8d92',
    image: categoryTablets,
  },
  {
    to: '/accessories',
    labelKey: 'category.accessories',
    cat: 'accessories',
    bg: '#973d5f',
    image: categoryAccessories,
  },
];

export const ShopByCategory = () => {
  const { products } = useProducts();
  const t = useT();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t('home.shopByCategory')}</h2>
      <div className={styles.grid}>
        {CATEGORIES.map(c => {
          const count = products.filter(p => p.category === c.cat).length;
          return (
            <Link to={c.to} key={c.cat} className={styles.card}>
              <div className={styles.thumb} style={{ background: c.bg }}>
                <img
                  src={c.image}
                  alt={t(c.labelKey)}
                  className={styles.thumbImage}
                />
              </div>
              <h3 className={styles.label}>{t(c.labelKey)}</h3>
              <p className={styles.count}>
                {count} {t('count.models')}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
