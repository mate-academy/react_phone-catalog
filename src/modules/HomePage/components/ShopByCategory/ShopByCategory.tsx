import { Link } from 'react-router-dom';
import { Product } from '@shared/types';
import { useTranslation } from '@shared/context';
import { TranslationKey } from '@shared/i18n';
import styles from './ShopByCategory.module.scss';

interface Props {
  products: Product[];
}

const CATEGORIES: {
  titleKey: TranslationKey;
  category: string;
  image: string;
}[] = [
  {
    titleKey: 'home.category.phones',
    category: 'phones',
    image: 'img/category-phones.webp',
  },
  {
    titleKey: 'home.category.tablets',
    category: 'tablets',
    image: 'img/category-tablets.webp',
  },
  {
    titleKey: 'home.category.accessories',
    category: 'accessories',
    image: 'img/category-accessories.webp',
  },
];

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const { t, tCount } = useTranslation();

  const getModelsCount = (category: string) =>
    products.filter(product => product.category === category).length;

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>{t('home.shopByCategory')}</h2>

      <div className={styles.list}>
        {CATEGORIES.map(({ titleKey, category, image }) => (
          <Link to={`/${category}`} key={category} className={styles.category}>
            <div className={styles.photoWrapper}>
              <img src={image} alt={t(titleKey)} className={styles.photo} />
            </div>

            <h4 className={styles.categoryTitle}>{t(titleKey)}</h4>

            <p className={styles.count}>
              {tCount('models', getModelsCount(category))}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
