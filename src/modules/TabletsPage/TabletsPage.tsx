import { useSearchParams } from 'react-router-dom';
import { useShop } from '../../store/shop/ShopContext';
import { getProductsByCategory } from '../../utils/products';
import { CatalogPageContent } from '../shared/components/CatalogPageContent';

export const TabletsPage = () => {
  const { products } = useShop();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const tablets = getProductsByCategory(products, 'tablets');

  const filteredProducts = tablets.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <CatalogPageContent
      title="Tablets"
      breadcrumb="Tablets"
      products={filteredProducts}
      totalProductCount={tablets.length}
      emptySearchLabel="tablets"
    />
  );
};
