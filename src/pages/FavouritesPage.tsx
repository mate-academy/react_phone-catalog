import { useCart } from '../hooks/useCart';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';
import unicornImage from '../images/unicorn/unicorn.png';
//import { useLanguage } from '../context/language/useLanguage';
//import { favouritesPageDictionary } from '../i18n/favouritesPageDictionary';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useTranslation } from 'react-i18next';

export const FavouritesPage = () => {
  const { favorites } = useCart();

  const { t } = useTranslation('favouritespage');
  //const { currentLanguage } = useLanguage();
  //const translations = favouritesPageDictionary[currentLanguage];

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs />
        <h2 className="text-2xl font-bold mb-2 mt-6 tablet:mt-10">
          {t('title')}
        </h2>
        <div className="text-center py-12">
          <img
            src={unicornImage}
            alt="unicorn"
            className="mx-auto mb-4 w-[300px] h-[300px] transform -translate-x-1/6"
          />
          <p className="text-secondary text-lg">{t('emptyMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumbs />
      <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
      <p className="text-secondary body-text mt-2 mb-8 tablet:mb-10">
        {favorites.length} {t('items')}
      </p>
      <div className="grid gap-4 mobile:grid-cols-[repeat(auto-fill,_minmax(230px,288px))] mobile:justify-center tablet:grid-cols-[repeat(auto-fill,_minmax(230px,1fr))] mt-6 mb-6 tablet:mb-10">
        {favorites.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
