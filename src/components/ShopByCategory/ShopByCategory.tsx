import { Link } from 'react-router-dom';

import { useLanguage } from '../../context/LanguageContext';

import './ShopByCategory.scss';

const categories = [
  {
    key: 'phones' as const,
    path: '/phones',
  },
  {
    key: 'tablets' as const,
    path: '/tablets',
  },
  {
    key: 'accessories' as const,
    path: '/accessories',
  },
];

export const ShopByCategory = () => {
  const { t } = useLanguage();

  return (
    <section className="shop-by-category">
      <h2 className="shop-by-category__title">{t('shopByCategory')}</h2>

      <div className="shop-by-category__list">
        {categories.map(category => (
          <Link
            key={category.path}
            to={category.path}
            className="shop-by-category__item"
          >
            {t(category.key)}
          </Link>
        ))}
      </div>
    </section>
  );
};
