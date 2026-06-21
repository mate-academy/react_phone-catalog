import { Product } from '../../types/Product';
import styles from './CategoryTitle.module.scss';

interface Props {
  category: string;
  filteredProducts: Product[];
}

const categoryTitles: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CategoryTitle = ({ category, filteredProducts }: Props) => {
  return (
    <div className={styles.title}>
      <h1>{categoryTitles[category]}</h1>
      <p>{filteredProducts.length} models</p>
    </div>
  );
};
