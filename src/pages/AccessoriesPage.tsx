import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { useLanguage } from '../context/language/useLanguage';
import { accessoriesPageDictionary } from '../i18n/accessoriesPageDictionary';
import { useProducts } from '../context/ProductsContext';

export const AccessoriesPage = () => {
  const { currentLanguage } = useLanguage();
  const translations = accessoriesPageDictionary[currentLanguage];
  const accessories = useProducts().filter(
    product => product.category === 'accessories',
  );

  return (
    <div>
      <Breadcrumbs />

      <h2 className="mt-6 mb-2 tablet:mt-10">{translations.title}</h2>

      <ProductsList products={accessories} />
    </div>
  );
};
