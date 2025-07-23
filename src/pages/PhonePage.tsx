import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { useLanguage } from '../context/language/useLanguage';
import { phonePageDictionary } from '../i18n/phonePageDictionary';
import { useProducts } from '../context/ProductsContext';

export const PhonesPage = () => {
  const { currentLanguage } = useLanguage();
  const translations = phonePageDictionary[currentLanguage];
  const phones = useProducts().filter(product => product.category === 'phones');

  return (
    <div>
      <Breadcrumbs />

      <h2 className="mt-6 mb-2 tablet:mt-10">{translations.title}</h2>

      <ProductsList products={phones} />
    </div>
  );
};
