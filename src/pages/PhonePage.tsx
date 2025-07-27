import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
//import { useLanguage } from '../context/language/useLanguage';
//import { phonePageDictionary } from '../i18n/phonePageDictionary';
import { useProducts } from '../context/ProductsContext';
import { useTranslation } from 'react-i18next';

export const PhonesPage = () => {
  const { t } = useTranslation('phonepage');

  const phones = useProducts().filter(product => product.category === 'phones');

  return (
    <div>
      <Breadcrumbs />

      <h2 className="mt-6 mb-2 tablet:mt-10">{t('title')}</h2>

      <ProductsList products={phones} />
    </div>
  );
};
