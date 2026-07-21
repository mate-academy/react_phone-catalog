import { Product } from '../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
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
    <div>
      <Breadcrumbs category={category} />
      <h1 className={styles.title}>{categoryTitles[category]}</h1>
      <p className={styles.countModels}>{filteredProducts.length} models</p>
    </div>
  );
};
