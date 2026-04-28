import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../../api';
import { Product } from '../../types';
import { ProductsList } from './components/ProductsList';
import { Dropdown } from '../shared/components/Dropdown';
import { NotFoundPage } from '../NotFoundPage';
import { Loader } from '../shared/components/Loader';
import styles from './CategoryPage.module.scss';

type Category = 'phones' | 'tablets' | 'accessories';
type SortBy = 'newest' | 'alphabetically' | 'cheapest';

const categoryTitles: Record<Category, string> = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

export const CategoryPage = () => {
  const { category } = useParams<{ category: Category }>();
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setProducts([]);

    getProductsByCategory(category as Category)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  if (!Object.keys(categoryTitles).includes(category as string)) {
    return <NotFoundPage />;
  }

  const title = categoryTitles[category as Category];

  const sorted = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      case 'newest':
      default:
        return b.year - a.year;
    }
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{products.length} models</p>

      <div className={styles.controls}>
        <Dropdown
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {loading && <Loader />}

      {!loading && error && <p>Something went wrong. Please try again.</p>}

      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      {!loading && !error && products.length > 0 && (
        <ProductsList products={sorted} />
      )}
    </div>
  );
};
