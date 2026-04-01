import { useShop } from '../../store/ShopContext';
import { getProductsByCategory } from '../../utils/products';
import { CatalogPageContent } from '../shared/components/CatalogPageContent';

export const AccessoriesPage = () => {
  const { products } = useShop();
  const accessories = getProductsByCategory(products, 'accessories');

  return (
    <CatalogPageContent
      title="Accessories"
      breadcrumb="Accessories"
      products={accessories}
    />
  );
};
