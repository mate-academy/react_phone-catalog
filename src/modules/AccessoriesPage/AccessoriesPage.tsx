import { useSearchParams } from 'react-router-dom';
import { useShop } from '../../store/shop/ShopContext';
import { getProductsByCategory } from '../../utils/products';
import { CatalogPageContent } from '../shared/components/CatalogPageContent';

export const AccessoriesPage = () => {
  const { products } = useShop();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const accessories = getProductsByCategory(products, 'accessories');

  const filteredProducts = accessories.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <CatalogPageContent
      title="Accessories"
      breadcrumb="Accessories"
      products={filteredProducts}
      totalProductCount={accessories.length}
      emptySearchLabel="accessories"
    />
  );
};
