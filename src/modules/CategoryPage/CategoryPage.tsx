import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { ProductCard } from '../shared/components/ProductCard';
import { Dropdown } from '../shared/components/Dropdown';
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
  const { products, loading, error } = useProducts();
  const [sortBy, setSortBy] = useState<SortBy>('newest');

  const validCategory = category as Category;
  const title = categoryTitles[validCategory] ?? 'Products';

  const filtered = products.filter(
    product => product.category === validCategory,
  );

  const sorted = [...filtered].sort((a, b) => {
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{filtered.length} models</p>

      <div className={styles.controls}>
        <Dropdown
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      <div className={styles.grid}>
        {sorted.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
