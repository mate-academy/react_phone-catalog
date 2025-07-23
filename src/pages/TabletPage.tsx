import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { useLanguage } from '../context/language/useLanguage';
import { tabletPageDictionary } from '../i18n/tabletPageDictionary';
import { useProducts } from '../context/ProductsContext';

export const TabletsPage = () => {
  const { currentLanguage } = useLanguage();
  const translations = tabletPageDictionary[currentLanguage];
  const tablets = useProducts().filter(
    product => product.category === 'tablets',
  );

  return (
    <div>
      <Breadcrumbs />

      <h2 className="mt-6 mb-2 tablet:mt-10">{translations.title}</h2>

      <ProductsList products={tablets} />
    </div>
  );
};
