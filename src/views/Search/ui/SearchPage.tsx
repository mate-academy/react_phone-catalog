import { getStaticProducts } from '@/entities/Product/api';
import { SearchResults } from '@/widgets/SearchResults';

export const SearchPage = async () => {
  const products = await getStaticProducts();

  return <SearchResults products={products} />;
};
