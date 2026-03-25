import { useParams } from 'react-router-dom';
import Catalog from './Catalog'; // Імпортуємо наш складний компонент з фільтрами

interface CatalogWrapperProps {
  products: any[];
}

const CatalogWrapper: React.FC<CatalogWrapperProps> = ({ products }) => {
  const { category } = useParams<{ category: string }>();

  // 1. Перевірка наявності категорії
  if (!category) {
    return <h2>No category provided</h2>;
  }

  // 2. Перевірка завантаження даних
  if (!products || products.length === 0) {
    return <div className="loader">Loading products...</div>;
  }

  // 3. ПЕРЕДАЄМО ДАНІ В ОСНОВНИЙ КАТАЛОГ
  // Не малюємо сітку тут, а віддаємо це компоненту Catalog, де є сортування
  return <Catalog products={products} />;
};

export default CatalogWrapper;
