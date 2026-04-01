import { getProductsByCategory } from '../../utils/products';
import { CatalogPageContent } from '../shared/components/CatalogPageContent';
import { useShop } from '../../store/ShopContext';

export const PhonesPage = () => {
  const { products } = useShop();
  const phones = getProductsByCategory(products, 'phones');

  return (
    <CatalogPageContent
      title="Mobile phones"
      breadcrumb="Phones"
      products={phones}
    />
  );
};
