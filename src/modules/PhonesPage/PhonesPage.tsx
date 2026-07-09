import { getProductsByCategory } from '../../utils/products';
import { CatalogPageContent } from '../shared/components/CatalogPageContent';
import { useShop } from '../../store/shop/ShopContext';
import { useSearchParams } from 'react-router-dom';

export const PhonesPage = () => {
  const { products } = useShop();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const phones = getProductsByCategory(products, 'phones');

  const filteredProducts = phones.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <CatalogPageContent
      title="Mobile phones"
      breadcrumb="Phones"
      products={filteredProducts}
      totalProductCount={phones.length}
      emptySearchLabel="phones"
    />
  );
};
