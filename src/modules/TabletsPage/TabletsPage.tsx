import { useShop } from '../../store/ShopContext';
import { getProductsByCategory } from '../../utils/products';
import { CatalogPageContent } from '../shared/components/CatalogPageContent';

export const TabletsPage = () => {
  const { products } = useShop();
  const tablets = getProductsByCategory(products, 'tablets');

  return (
    <CatalogPageContent
      title="Tablets"
      breadcrumb="Tablets"
      products={tablets}
    />
  );
};
