import { useParams } from 'react-router-dom';
import { ProductsList } from '@modules/shared/components/ProductsList';
import { Filters } from './components/Filters';
import { useProducts } from '@/hooks/useProducts'; // Pobiera wszystkie produkty z JSON
import styles from './CatalogPage.module.scss';

export const CatalogPage = () => {
  // 1. Pobieramy kategorię z adresu (np. 'phones', 'tablets')
  const { category } = useParams<{ category: string }>();
  const { products, loading } = useProducts();

  // 2. Mapujemy nazwę z adresu na typ w danych JSON
  const typeMap: Record<string, string> = {
    phones: 'phone',
    tablets: 'tablet',
    accessories: 'accessory',
  };

  // 3. Filtrujemy produkty - ZMIENNA, którą przekażesz niżej
  const filteredProducts = products.filter(
    product => product.type === typeMap[category || ''],
  );

  // 4. Dynamiczny tytuł H1 (zgodnie z wytycznymi)
  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : '';

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {/* Nagłówek zmienia się dynamicznie: Phones page / Tablets page itd. */}
      <h1 className={styles.title}>{pageTitle} page</h1>

      {/* Komponent filtrów (sortowanie, ilość na stronę) */}
      <Filters total={filteredProducts.length} />

      {/* Produkty - wyświetlą się TYLKO te z danej kategorii */}
      {filteredProducts.length > 0 ? (
        <ProductsList products={filteredProducts} />
      ) : (
        <p>There are no {category} yet</p>
      )}
    </div>
  );
};
