import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './ShopByCategory.scss';

const categories = [
  {
    key: 'phones' as const,
    titleKey: 'Mobile phones',
    countKey: '124 models',
    path: '/phones',
    image: 'img/category-phones.webp',
  },
  {
    key: 'tablets' as const,
    titleKey: 'Tablets',
    countKey: '36 models',
    path: '/tablets',
    image: 'img/category-tablets.webp',
  },
  {
    key: 'accessories' as const,
    titleKey: 'Accessories',
    countKey: '34 models',
    path: '/accessories',
    image: 'img/category-accessories.webp',
  },
];

export const ShopByCategory = () => {
  const { t } = useLanguage();

  return (
    <section className="shop-by-category">
      <h2 className="shop-by-category__title">{t('shopByCategory')}</h2>

      <div className="shop-by-category__list">
        {categories.map((category, index) => (
          <Link
            key={category.path}
            to={category.path}
            className={`shop-by-category__item shop-by-category__item--${index + 1}`}
          >
            <div className="shop-by-category__image-container">
              <img
                src={category.image}
                alt={t(category.key)}
                className="shop-by-category__image"
              />
            </div>
            <h3 className="shop-by-category__category-title">
              {t(category.key)}
            </h3>
            <p className="shop-by-category__subtitle">{category.countKey}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
